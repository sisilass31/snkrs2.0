const express = require("express");
const router = express.Router();
const cors = require("cors");
const { Comment, User } = require("../models");
router.use(cors());

// create X
router.post("/create/:postId", async (req, res) => {
  try {
    const { content } = req.body;
    const postId = req.params.postId;

    if (content == "") {
      return res
        .status(500)
        .json({ message: "Veuillez remplir tous les champs." });
    }

    const newComment = await Comment.create({
      content: content,
      postsId: postId,
      usersId: userId,
    });

    if (newComment) {
      return res
        .status(200)
        .json({ message: "Commentaire a été crée.", comment: newComment });
    } else {
      return res.status(400).json({ message: "Erreur" });
    }
  } catch (error) {
    return res.status(400).json({ message: "une erreur est survenue." });
  }
});

// get all
router.get("/getAll/:postId", async (req, res) => {
  try {
    const postId = req.params.postId;

    await Comment.findAll({
      where: { postId: postId },
      include: [
        {
          model: User,
          required: true,
        },
      ],
    }).then((comments) => {
      return res.status(200).json({ comments: comments });
    });
  } catch (error) {
    return res.status(400).json({ message: "une erreur est survenue." });
  }
});

// update
router.put("/:id", async (req, res) => {
  try {
    const commentId = req.params.id;
    const { content } = req.body;

    if (content === "") {
      return res
        .status(500)
        .json({ message: "Veuillez remplir tous les champs." });
    }

    const comment = await Comment.findOne({
      where: { id: commentId },
    });

    await comment
      .update({
        content: content ? content : comment.content,
      })
      .then((comment) => {
        return res
          .status(200)
          .json({ message: "modification effectué", comment: comment });
      });
  } catch (error) {
    return res.status(400).json({ message: "erreur lors de la modification" });
  }
});

// delete
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const comment = await Comment.findOne({
      where: { id: id },
    });

    if (comment) {
      await Comment.destroy({
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
