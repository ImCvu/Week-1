const router = require("./index.routes");
const post = require("./../models/post.model");
const m = require("./../helpers/middlewares");
module.exports = router;

router.get("/", async (req, res) => {
  await post
    .getPosts()
    .then((posts) => res.json(posts))
    .catch((err) => {
      if (err)
        res.json({
          message: "oops!something went wrong",
          status: 202,
        });
    });
});

//one perticular post
router.get("/:id/", async (req, res) => {
  const id = req.params.id;

  await post
    .getPost(id)
    .then((post) => res.json(post))
    .catch((err) => {
      if (err)
        res.json({
          message: "opps!something went wrong",
          status: 202,
        });
    });
});
/* INSERT A NEW POST */
router.post("/", m.checkFieldsPost, async (req, res) => {
  await post
    .insertPost(req.body)
    .then((post) =>
      res.status(201).json({
        message: `The post #${post.id} has been created`,
        content: post,
      })
    )
    .catch((err) => res.status(500).json({ message: err.message }));
});

/*Upadate a post*/
router.put("/:id", m.mustBeInteger, m.checkFieldsPost, async (req, res) => {
  const id = req.params.id;
  await post
    .updatePost(id, req.body)
    .then((post) =>
      res.json({
        message: `The Post #${id} has been updated`,
        content: post,
      })
    )
    .catch((err) => {
      if (err.status) {
        res.status(err.status).json({ message: err.message });
      }
      res.status(500).json({ message: err.message });
    });
});

/* DELETE POST */
router.delete("/:id", m.mustBeInteger, async (req, res) => {
  const id = req.params.id;
  await post
    .deletePost(id)
    .then((post) =>
      res.json({
        message: `The Post #${id} has beeen deleted`,
      })
    )
    .catch((err) => {
      if (err.status) {
        res.status(err.status).json({ message: err.message });
      }
      res.status(500).json({ message: err.message });
    });
});
