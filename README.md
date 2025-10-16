# 🏥 **MediConnect – Unified Healthcare Platform**

![MediConnect](https://img.shields.io/badge/Status-Development-orange)
![Node.js](https://img.shields.io/badge/Backend-Node.js-brightgreen)
![React](https://img.shields.io/badge/Frontend-React-blue)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-green)
![Socket.IO](https://img.shields.io/badge/Realtime-Socket.IO-red)

---

## **🌟 Project Overview**
MediConnect is a **unified healthcare platform** connecting **patients**, **doctors**, **counselors**, and **ambulance services**.  
It removes long waits, breaks language barriers using **visual aids** and **medical-only terms**, and ensures **quick, easy access** to healthcare for everyone.  

**Repository Structure:**
MediConnect/
│
├── access-care-forall/ → Patient Frontend
├── doctor-desk-assist/ → Doctor Frontend
└── bbackend/ → Node.js Backend


---

## **🚀 Features**
- 🩺 Instant connection between patients, doctors, and counselors  
- 💬 Real-time chat and notifications  
- 🚑 Ambulance request and coordination system  
- 🌐 Visuals and multilingual support to break language barriers  
- 🔒 Secure and user-friendly interface  

---

## **🛠 Prerequisites**
- **Node.js** (v16 or above) – [Download Node.js](https://nodejs.org/)  
- **npm** (comes with Node.js)  
- **MongoDB** (local or cloud, e.g., [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))  

---

## **📦 Installing Dependencies**

### **Backend**

cd bbackend
npm install

Patient Frontend
cd ../access-care-forall
npm install

Doctor Frontend
cd ../doctor-desk-assist
npm install

⚡ Running the Project Locally
Backend
cd bbackend
npm start
Runs backend server (default: http://localhost:5003)
Handles APIs, notifications, chat, and ambulance coordination

Patient Frontend
cd ../access-care-forall
npm run dev
Patient interface (default: http://localhost:8080)
Request consultations, chat, and call ambulances

Doctor Frontend
cd ../doctor-desk-assist
npm run dev
Doctor interface (default: http://localhost:5174)
Respond to patients, chat, and coordinate emergencies
⚠️ Note: Always start the backend before running any frontend.

🔄 How the System Works
🧑‍⚕️ Patient requests consultation or emergency via patient frontend
🖥 Backend stores request and sends notifications in real-time to doctors/counselors
👨‍⚕️ Doctors respond via doctor frontend
🚑 Ambulance is dispatched if needed and tracked through the backend
💾 All data, messages, and notifications are stored in MongoDB and updated in real-time via Socket.IO

🧩 Technologies Used
Frontend: React, Vite, TypeScript, Tailwind CSS, shadcn-ui
Backend: Node.js, Express, MongoDB, Socket.IO, JWT authentication
Realtime Communication: Socket.IO for chat and notifications

🌐 Deployment
Frontends: Vercel / Netlify
Backend: Render / Railway / Vercel (backend only)
Ensure backend API URL is correctly configured in frontend .env files

💡 Notes
Update .env files for MongoDB, JWT secrets, and API URLs as needed
Backend must be running before starting frontends
Each frontend and backend can be deployed independently

👥 Team
M Pratisha - Backend and APIs
S Yasmin -  Authentication Interface
V Yoga priya - Translation Integration 
G Keerthana - Doctor Interface
T.G Sowmya - Patient Interface


