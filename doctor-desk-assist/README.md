# **MediConnect – Doctor Frontend**

## **Project Info**
MediConnect is a unified healthcare platform connecting patients with doctors, counselors, and ambulances.  
This frontend allows doctors to receive patient requests, communicate via chat, view patient details, and coordinate care, including emergency ambulance services.

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
# Navigate to the doctor frontend folder
cd MediConnect/doctor-desk-assist

# Install required packages
npm install

Running the Project Locally
# Start the development server
npm run dev
> Runs the frontend (default: http://localhost:8081)
> Provides the doctor interface to receive patient requests, chat, and coordinate with counselors or ambulances.
```
---
**Working of the Project**
> Doctor logs into the frontend and sees incoming patient requests.
> The backend notifies doctors in real-time about new consultation requests or emergency alerts.
> Doctors respond via chat, provide guidance, and coordinate with counselors if needed.
> For emergencies, ambulance requests are handled through the backend and tracked in real-time.
> All messages, notifications, and patient data are stored in MongoDB and updated via Socket.IO.

**Technologies Used**
React, Vite, TypeScript
Tailwind CSS, shadcn-ui
Socket.IO (for realtime communication)

**Deployment**
Frontend can be deployed on Vercel or Netlify.
Ensure the backend API is running and accessible for full functionality.

**Notes**
Always start the backend before running the frontend.
Update .env if required for API endpoints or configuration.
