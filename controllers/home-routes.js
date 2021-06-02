const router = require("express").Router();
const { Post, User } = require("../models");

router.get("/", async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    const posts = dbPostData.map((post) => post.get({ plain: true }));
    res.render("all", {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/dashboard", async (req, res) => {
  try {
    let userPostData = {};
    if (req.session.loggedIn) {
      userPostData = await Post.findAll({
        where: {
          user_id: req.body.user_id,
        },
      });
    } else {
      userPostData = await Post.findAll({
        include: [
          {
            model: User,
            attributes: ["username"],
          },
        ],
      });
    }
    const posts = userPostData.map((post) => post.get({ plain: true }));

    res.render("dashboard", {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

module.exports = router;
