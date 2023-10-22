//get all comment
// router.get("/", async (req, res) => {
//   try {
//     const postId = req.params.postId;

//     await Comment.findAll({
//       where: { posts_id: postId },
//       include: [
//         {
//           model: User,
//           required: true,
//         },
//       ],
//     }).then((comments) => {
//       return res.status(200).json({ comments: comments });
//     });
//   } catch (error) {
//     return res.status(400).json({ message: "une erreur est survenue." });
//   }
// });
