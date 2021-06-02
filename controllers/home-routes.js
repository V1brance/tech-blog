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

router.get("/dashboard/:user", async (req, res) => {
  try {
    let userPostData = {};
    if (req.session.loggedIn) {
      userID = await User.findAll({
        where: {
          username: req.params.user,
        },
      });
      const user = userID[0].get({ plain: true });
      console.log(user);
      userPostData = await Post.findAll({
        where: {
          user_id: user.id,
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
