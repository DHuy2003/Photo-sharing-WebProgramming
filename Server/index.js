const express = require("express");
const app = express();
const cors = require("cors");
const dbConnect = require("./db/dbConnect");
const UserRouter = require("./routes/UserRouter");
const PhotoRouter = require("./routes/PhotoRouter");
const LoginRouter = require("./routes/LoginRouter");
const CommentRouter = require("./routes/CommentRouter");
const UploadPhoto = require("./routes/UploadPhoto");

dbConnect();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use("/api/user", UserRouter);
app.use("/api/photo", PhotoRouter);
app.use("/api", LoginRouter);
app.use("/api/comment", CommentRouter);
app.use("/api/uploadphoto", UploadPhoto);

app.get("/", (request, response) => {
  response.send({ message: "Hello from photo-sharing app API!" });
});

app.listen(8081, () => {
  console.log("server listening on port 8081");
});
