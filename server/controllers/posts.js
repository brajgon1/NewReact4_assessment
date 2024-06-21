const { User } = require("../models/user");
const { Post } = require("../models/post");

module.exports = {
  addPost: async (req, res) => {
    try {
      let { title, content, status, userId } = req.body;
      await Post.create({
        title: title,
        content: content,
        privateStatus: status,
        userId: userId,
      });
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
      res.sendStatus(400);
    }
    console.log("addPost");
    res.sendStatus(200);
  },
  getAllPosts: async (req, res) => {
    try {
       const posts = await Post.findAll({
          where: {privateStatus: false},
          include: [{
             model: User,
             required: true,
             attributes: [`username`]
          }]
       })
       res.status(200).send(posts)
    } catch (error) {
       console.log('ERROR IN getAllPosts')
       console.log(error)
       res.sendStatus(400)
    }
  },
  getCurrentUserPosts: async (req, res) => {
    console.log("getCurrentUserPosts");
    res.sendStatus(200);
  },
  editPost: async (req, res) => {
    console.log("editPost");
    res.sendStatus(200);
  },
  deletePost: async (req, res) => {
    console.log("deletePost");
    res.sendStatus(200);
  },
};
