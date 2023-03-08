const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const authRoute = require("./routes/auth");
const usersRoute = require("./routes/users");
const hotelRoute = require("./routes/hotels");
const roomRoute = require("./routes/rooms");
const cookieParser = require("cookie-parser");

//連結雲端資料庫-mongodb-altas
mongoose
  .connect(process.env.DO_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connect to Mongo Altas.");
  })
  .catch((e) => {
    console.log(e);
  });

//跨域設定
// const corsOptions = {
//   origin: [
//     "http://localhost:8080",
//     "http://localhost:3000",
//     "http://localhost:3001",
//     "https://api.cloudinary.com",
//   ],
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
//   allowedHeaders: ["Content-Type", "Authorization"],
//   credentials: true,
// };

//跨域請求
app.use(cors());

//中間件
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//路由位置
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelRoute);
app.use("/api/rooms", roomRoute);

//中間件-錯誤回傳

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

//伺服器
app.listen(8080, () => {
  console.log("Connectd to backend");
});
