import { db } from '../../firebaseConfig';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const companyId = searchParams.get('companyId');

  try {
    const submissionsQuery = query(collection(db, `companies/${companyId}/submissions`), where('companyId', '==', companyId));
    const querySnapshot = await getDocs(submissionsQuery);
    const submissions = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    return new Response(JSON.stringify(submissions), { status: 200 });
  } catch (error) {
    console.error('Error fetching submissions:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch submissions', details: error.message }), { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { companyId, ...submission } = await req.json();
    await addDoc(collection(db, `companies/${companyId}/submissions`), { companyId, ...submission });

    return new Response(JSON.stringify({ message: 'Submission received' }), { status: 200 });
  } catch (error) {
    console.error('Error submitting data:', error);
    return new Response(JSON.stringify({ error: 'Failed to submit data', details: error.message }), { status: 500 });
  }
}
