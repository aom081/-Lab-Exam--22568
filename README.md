# SE NPRU TaskFlow Mini

## How to run locally

### Backend (Server)
1. Go to \`server\` folder: \`cd server\`
2. Install dependencies: \`npm install\`
3. Rename \`.env.example\` to \`.env\` and update the variables (especially \`MONGO_URI\` from MongoDB Atlas).
4. Run server: \`npm run dev\` (Uses nodemon, runs on port 5000)

### Frontend (Client)
1. Go to \`client\` folder: \`cd client\`
2. Install dependencies: \`npm install\`
3. Rename \`.env.example\` to \`.env\` and set \`VITE_API_URL=http://localhost:5000\`
4. Run client: \`npm run dev\`

## Deployment Instructions
1. **Frontend (Vercel):**
   - Push your code to GitHub.
   - Import your repository to Vercel.
   - Set Framework Preset to \`Vite\`.
   - Set Environment Variable \`VITE_API_URL\` to your deployed Render URL.
   
2. **Backend (Render):**
   - Use Render Web Service.
   - Build Command: \`npm install\`
   - Start Command: \`node index.js\`
   - Add \`MONGO_URI\` and \`JWT_SECRET\` to Environment Variables securely.
