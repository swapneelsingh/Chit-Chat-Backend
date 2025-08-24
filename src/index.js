const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.route');
const messageRoutes = require('./routes/message.route');
const connectDB = require('./lib/db');
const {app, server} = require('./lib/socket');
require('dotenv').config();

// SOP
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
// app.use(express.json());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

const PORT = process.env.PORT || 5001;
//  __dirname = path.resolve();
// const currentDir = path.resolve();

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../frontend/dist")));
//   // app.use(express.static(path.join(currentDir, "../frontend/dist")));

//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
//   });
// }

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});

