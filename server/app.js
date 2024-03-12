const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const path = require("path");
const morgan = require("morgan");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const profRoute = require("./routes/prof");
const schedule = require("node-schedule");
const http = require("http");
const sendMail = require("./mail");
const mongodb = require("mongodb")
const Professor = require("./models/Professor");
dotenv.config({path: "./vars/.env"});
const User = require("./models/User");
const { Server } = require("socket.io");
const { createClient } = require("redis");
const { createAdapter } = require("@socket.io/redis-adapter");
mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to MongoDB");
    
  }
);


const server = http.createServer(app);

// Create Redis client
const pubClient = createClient({ url: "redis://localhost:6379" });
const subClient = pubClient.duplicate();

Promise.all([pubClient.connect(), subClient.connect()]).then(() => {
  const io = new Server(server);

  // Use the Redis adapter
  io.adapter(createAdapter(pubClient, subClient));

  // Socket.io events
  io.on("connection", (socket) => {
    socket.on("user-message", (message) => {
      io.emit("message", message);
    });
  });

//   app.use(express.static(__dirname+"../public/index.html"));

app.get("/", (req, res) => {
    return res.sendFile(__dirname+"/public/index.html");
  });
});

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
//routes
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/prof", profRoute);

// everytime its 1 minute for eg: 8:01,9:01 function gets excecuted to keep up for any updates in dosage time
const job = schedule.scheduleJob('1 * * * *', function(){
  hey()
});
//sends mail
async function hey(){
 
  const prof = await Professor.find()
    prof.forEach((professor) => {
    professor.times.forEach((time) => {
    var times = time.split(":")
    var a=times[0]
    var b=times[1]
    schedule.scheduleJob(`${b} ${a} * * *`, async () => {
     // Send a notification to the user reminding them to take their medication
        professor.followers.forEach(async (follower) => {
            const user = await User.findById(follower.userId)
            sendMail(`${follower.email}`, 'Class Reminder', `It's time for yoy class`);
        })
    });
  });  
});
}
app.listen(port = 8800, () => {
  console.log("Backend server is running! at http://localhost:"+ port);
});