const router = require("express").Router();
const req = require("express/lib/request");
const sequelize = require("../config/connection");
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
      attributes: ["id", "post_body", "title"],
      include: [
        {
          model: Comment,
          attributes: ["id", "comment_text", "user_id", "post_id"],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render("dashboard", { post, logged_in: true });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/edit/:id', withAuth, async (req, res) => {
    try{

        const postData = await Post.findByPk (req.params.id, {
            attributes: [
                'id',
                'post_url',
                'title',
                'created_at'
            ],
            include: [
                {
                    model: Comment,
                    attributes: ["id", "comment_text", "user_id", "post_id"],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        });

        const post = postData.get({ plain: true});

        res.render('edit-post', {
            ...post,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;