const express = require("express");
const router = express.Router();
const cors = require("cors");
const { Post } = require("../models");
router.use(cors());

//get all posts
router.get("/getAll", async (req, res) => {
  try {
    const posts = await Post.findAll({});
    res.status(200).json({ posts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "une erreur est survenue." });
  }
});

//get one post
router.get("/:id", async (req, res) => {
  try {
    const postId = req.params.id;
    await Post.findOne({
      where: { id: postId },
      attributes: ["id", "title", "description", "pictures", "userId"],
    }).then((post) => {
      return res.status(200).json({ post: post });
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Post introuvable" });
  }
});

//create
router.post("/create", async (req, res) => {
  try {
    const { title, description } =
    req.body; /* on récupère les données des champs */
    const image = req.file;

    if (title == "" || description == "") {
      return res
        .status(500)
        .json({ message: "Veuillez remplir tous les champs." });
    }

    const newPost = await Post.create({
      title: title,
      description: description,
      pictures: image ? image.filename : "test.png",
      userId: userId,
    });

    if (newPost) {
      return res
        .status(200)
        .json({ message: "Posts a été crée.", post: newPost });
    }
  } catch (error) {
    return res.status(400).json({ message: "Erreur" });
  }
});

//update
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { title, description } = req.body;
    const image = req.file;

    if (title === "" && description === "" && image === null) {
      return res
        .status(500)
        .json({ message: "Veuillez remplir tous les champs." });
    }

    const post = await Post.findOne({
      attributes: ["id", "title", "description", "pictures", "userId"],
      where: { id },
    });

    await post
      .update({
        title: title ? title : post.title,
        description: description ? description : post.description,
        pictures: image ? image.filename : post.pictures,
      })
      .then((post) => {
        return res
          .status(200)
          .json({ message: "modification effectué", post: post });
      });
  } catch (error) {
    return res.status(400).json({ message: "erreur lors de la modification" });
  }
});

//delete
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const post = await Post.findOne({
      attributes: ["id", "title", "description", "pictures", "userId"],
      where: { id },
    });

    if (post) {
      await Post.destroy({
        where: { id: id },
      }).then(() => {
        return res.status(200).json({ message: "post supprimé" });
      });
    }
  } catch (error) {
    return res.status(400).json({ message: "erreur lors de la suppression" });
  }
});
module.exports = router;
