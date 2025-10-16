# **MediConnect – Patient Frontend**

## **Project Info**
MediConnect is a unified healthcare platform connecting patients with doctors, counselors, and ambulances.  
This frontend allows patients to request consultations and emergency services using a simple, intuitive interface with visuals and medical-only terms to overcome language barriers.

---

## **Prerequisites**
Before running this project locally, ensure you have:
- **Node.js** (v16 or above) – [Download Node.js](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Backend running** (see `bbackend` setup)
- **MongoDB** (local or cloud, e.g., [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

---

## **Installing Dependencies**
```bash
# Navigate to the frontend folder
cd MediConnect/access-care-forall

# Install required packages
npm install

--> Running the Project Locally
# Start the development server
npm run dev
> Runs the frontend (default: http://localhost:8080)
> Provides the patient interface to request consultations, chat with doctors, and call ambulances.

```

** Working of the Project **<br>
> Patient logs into the frontend and requests a consultation or emergency service.<br>
> The backend receives the request, stores data, and notifies doctors/counselors in real-time.<br>
> Doctors respond via the doctor frontend, enabling live chat.<br>
> Ambulance services can be dispatched if required, with backend handling location and tracking.<br>
> All messages, notifications, and patient requests are stored in MongoDB and updated in real-time via Socket.IO.

Technologies Used<br>
React, Vite, TypeScript<br>
Tailwind CSS, shadcn-ui<br>
Socket.IO (for realtime communication)

Deployment<br>
Frontend can be deployed on Vercel or Netlify.<br>
Ensure the backend API is running and accessible for full functionality.

Notes<br>
Always start the backend before running the frontend.<br>
Update .env if required for API endpoints or configuration.

