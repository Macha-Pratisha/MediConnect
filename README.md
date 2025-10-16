# **MediConnect – Unified Healthcare Platform**

## **Project Overview**
MediConnect is a unified healthcare platform connecting patients with doctors, counselors, and ambulances.  
The system removes long waits, breaks language barriers using visuals and medical-only terms, and ensures quick, easy access to healthcare for everyone.  

**Repository Structure:**
MediConnect/
│
├── access-care-forall/ → Patient Frontend
├── doctor-desk-assist/ → Doctor Frontend
└── bbackend/ → Node.js Backend

## **Features**
- Instant connection between patients, doctors, and counselors  
- Real-time chat and notifications  
- Ambulance request and coordination system  
- Simple visuals and multilingual support  
- Secure, easy-to-use interface for all users

## **Prerequisites**
Before running the project locally, ensure you have:
- **Node.js** (v16 or above)  
- **npm** (comes with Node.js)  
- **MongoDB** (local or cloud, e.g., [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))  

## **Installing Dependencies**

### **Backend**
```bash
cd bbackend
npm install

Patient Frontend
cd ../access-care-forall
npm install

Doctor Frontend
cd ../doctor-desk-assist
npm install

Running the Project Locally
Backend
cd bbackend
npm start
Runs backend server (default: http://localhost:5003)
Handles API endpoints, notifications, chat, and ambulance coordination

Patient Frontend
cd ../access-care-forall
npm run dev
Runs patient interface (default: http://localhost:8080)
Patients can request consultations, chat, and call ambulances

Doctor Frontend
cd ../doctor-desk-assist
npm run dev
Runs doctor interface (default: http://localhost:8081)
Doctors can respond to patients, chat, and coordinate emergencies
Note: Always start the backend before running any frontend.

How the System Works
Patient requests consultation or emergency via the patient frontend.
Backend stores the request and sends notifications to doctors/counselors in real-time.
Doctors respond via the doctor frontend.
Ambulances are dispatched if needed and tracked through the backend.
All data, messages, and notifications are stored in MongoDB and updated in real-time via Socket.IO.

Technologies Used
Frontend: React, Vite, TypeScript, Tailwind CSS, shadcn-ui
Backend: Node.js, Express, MongoDB, Socket.IO, JWT authentication
Realtime Communication: Socket.IO for chat and notifications

Deployment
Frontends: Vercel / Netlify
Backend: Render / Railway / Vercel (backend only)
Ensure backend API URL is correctly configured in frontend .env files

Notes
Update .env files for MongoDB, JWT secrets, and API URLs as needed.
Make sure backend is running before starting any frontend.
This repository is fully modular — each frontend and backend can be deployed independently.
![Socket.IO](https://img.shields.io/badge/Realtime-Socket.IO-red)


