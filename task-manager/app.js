const express = require("express");
const app = express();
const cors = require("cors"); // وارد کردن پکیج CORS
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");
require("dotenv").config();
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// middleware

app.use(express.static("./public"));
app.use(express.json());

// routes


// تنظیمات CORS
const corsOptions = {
  origin: 'http://127.0.0.1:5500',  // یا آدرس دیگری که فایل‌های استاتیک شما در آن قرار دارند
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],  // متدهای مجاز
  allowedHeaders: ['Content-Type', 'Authorization'],  // هدرهای مجاز
};

// استفاده از CORS در Express
app.use(cors(corsOptions));

// مدیریت درخواست‌های OPTIONS
app.options('*', cors(corsOptions));  // این باعث می‌شود که سرور به درخواست‌های OPTIONS پاسخ دهد


app.use("/api/v1/tasks", tasks);

app.use(notFound);
app.use(errorHandlerMiddleware);
const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
