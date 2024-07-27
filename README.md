

# PitchIt Project

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, clone the repository and navigate into the project directory:

```bash
git clone https://github.com/yourusername/pitchit.git
cd pitchit
Environment Variables
Update the .env file in the root of the project and add the environment variables:

Install Dependencies
Install the project dependencies by running:

npm install
# or
yarn install
# or
pnpm install
Run the Development Server
Start the development server:

npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
Open http://localhost:3000 with your browser to see the result.

Editing the Project
You can start editing the project by modifying app/components/HeroSection.jsx(report generator) or any other file. The page auto-updates as you edit the file.

Learn More
To learn more about Next.js, take a look at the following resources:

Next.js Documentation - learn about Next.js features and API.
Learn Next.js - an interactive Next.js tutorial.
You can check out the Next.js GitHub repository - your feedback and contributions are welcome!

Deploy on Vercel
The easiest way to deploy your Next.js app is to use the Vercel Platform from the creators of Next.js.

Check out our Next.js deployment documentation for more details.

Project Structure
components/: Contains the React components used in the project.
api/ Contains the api routes used throughout the project
public/: Contains static assets such as images.
styles/: Contains the CSS modules and global styles.
utils/: Contains utility functions and scripts.
API Routes
The project includes API routes to handle data fetching and processing. You can find these in the pages/api directory.

Google Maps Integration
The project uses Google Maps for address autocomplete and Microsoft US Buildings dataset for fetching building footprint data. Ensure your API keys are set correctly in the .env.local file to enable these features.

Contributing
If you have suggestions or find issues, feel free to open an issue or submit a pull request. Contributions are welcome!

License
This project is licensed under the MIT License. See the LICENSE file for details.
