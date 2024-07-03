import { db } from '../../firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const companyId = searchParams.get('companyId');

    if (!companyId) {
      return new Response(JSON.stringify({ error: 'Company ID is required' }), { status: 400 });
    }

    const docRef = doc(db, 'pricing', companyId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      // Return a default response if the document does not exist
      return new Response(JSON.stringify({ asphaltPrice: 0, metalPrice: 0 }), { status: 200 });
    }

    return new Response(JSON.stringify(docSnap.data()), { status: 200 });
  } catch (error) {
    console.error('Error fetching pricing data:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { companyId, asphaltPrice, metalPrice } = await req.json();

    if (!companyId || asphaltPrice == null || metalPrice == null) {
      return new Response(JSON.stringify({ error: 'Missing fields' }), { status: 400 });
    }

    const docRef = doc(db, 'pricing', companyId);
    await setDoc(docRef, { asphaltPrice, metalPrice }, { merge: true });

    return new Response(JSON.stringify({ message: 'Pricing updated' }), { status: 200 });
  } catch (error) {
    console.error('Error saving pricing data:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
