const router = require("express").Router();
const { Comment, Post, User } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [User],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render("homepage", {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/profile", withAuth, (req,res) => {
  Post.findAll ({}).then(data => {
    const posts = data.map(post => {
      return post.get({ plain: true})
    })
    console.log(posts)
    res.render("profile",{posts})
  })
 
})

router.get("/post/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk({
      where: {
        id: req.params.id,
      },
      include: [
        User,
        {
            model: Comment,
            include: [User]
        }
      ],
    });
    if (postData) {
      const post = postData.get({ plain: true });

      res.render("single-post", { post, logged_in: req.session.logged_in });
    } else {
      res.status(400).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});




module.exports = router;
