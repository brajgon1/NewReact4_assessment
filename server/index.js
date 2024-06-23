const express = require("express");
const cors = require("cors");
const app = express();
const { sequelize } = require("./util/database");
const { User } = require("./models/user");
const { Post } = require("./models/post");
User.hasMany(Post);
Post.belongsTo(User);
const PORT = process.env.PORT || 4005;
const {
  getAllPosts,
  getCurrentUserPosts,
  addPost,
  editPost,
  deletePost,
} = require("./controllers/posts");
const { register, login } = require("./controllers/auth");
const { isAuthenticated } = require("./middleware/isAuthenticated");

app.use(cors());
app.use(express.json());

app.post("/register", register);
app.post("/login", login);

app.get("/posts", getAllPosts);
app.get("/userposts/:userId", getCurrentUserPosts);
app.post("/posts", isAuthenticated, addPost);
app.put("/posts/:id", isAuthenticated, editPost);
app.delete("/posts/:id", isAuthenticated, deletePost);

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () =>
      console.log(`database sync successful & server running on ${PORT}`)
    );
  })
  .catch((err) => console.log(err));
