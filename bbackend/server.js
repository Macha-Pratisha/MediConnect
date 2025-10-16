// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import connectDB from "./config/db.js";
// import patientRoutes from "./routes/patientRoutes.js";
// import counsellorRoutes from "./routes/counsellorRoutes.js";
// import notificationRoutes from "./routes/notificationRoutes.js";
// import symptomRoutes from "./routes/symptomRoutes.js";
// import chatRoutes from "./routes/chatRoutes.js";
// import doctorMessageRoutes from "./routes/doctorMessageRoutes.js";

// dotenv.config();
// connectDB();

// const app = express();

// app.use(cors());

// app.use(express.json());

// // Routes
// app.use("/api/patients", patientRoutes);
// app.use("/api/counsellor", counsellorRoutes);
// app.use("/api/notifications", notificationRoutes);
// app.use("/api/symptoms", symptomRoutes);
// app.use("/api/chat", chatRoutes);
// app.use("/api/doctor-messages", doctorMessageRoutes);


// app.listen(process.env.PORT, () => {
//   console.log(`✅ Server running on port ${process.env.PORT}`);
// });


// server.js
// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import connectDB from "./config/db.js";
// import patientRoutes from "./routes/patientRoutes.js";
// import counsellorRoutes from "./routes/counsellorRoutes.js";
// import notificationRoutes from "./routes/notificationRoutes.js";
// import symptomRoutes from "./routes/symptomRoutes.js";
// import http from "http";
// import { WebSocketServer } from "ws";

// dotenv.config();
// connectDB();

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.use("/api/patients", patientRoutes);
// app.use("/api/counsellor", counsellorRoutes);
// app.use("/api/notifications", notificationRoutes);
// app.use("/api/symptoms", symptomRoutes);

// const server = http.createServer(app);

// const wss = new WebSocketServer({ server });

// wss.on("connection", (ws) => {
//   console.log("New client connected");

//   ws.on("message", (message) => {
//     console.log(`Received message: ${message}`);
//     wss.clients.forEach((client) => {
//       if (client.readyState === ws.OPEN) {
//         client.send(message.toString());
//       }
//     });
//   });

//   ws.on("close", () => {
//     console.log("Client disconnected");
//   });
// });

// const PORT = process.env.PORT || 5003;
// server.listen(PORT, () => {
//   console.log(`✅ Server running on port ${PORT}`);
// });
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import patientRoutes from "./routes/patientRoutes.js";
import counsellorRoutes from "./routes/counsellorRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import symptomRoutes from "./routes/symptomRoutes.js";

import chatRoutes from "./routes/chatRoutes.js"; // patient → doctor
import doctorMessageRoutes from "./routes/doctorMessageRoutes.js"; // doctor → patient

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/patients", patientRoutes);
app.use("/api/counsellor", counsellorRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/symptoms", symptomRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/doctor-messages", doctorMessageRoutes);

app.listen(process.env.PORT, () => {
  console.log(`✅ Server running on port ${process.env.PORT}`);
});

