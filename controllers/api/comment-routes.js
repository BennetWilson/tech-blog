const router = require('express').Router();
const { Comment, User } = require('../../models/');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
    // try {
        const commentData = await Comment.findAll({
            include: [User],
        });
        
        const comments = commentData.map((comment) => comment.get({ plain: true}));

        console.log(comments);
        res.json(comments);
    // } catch (err) {
    //     res.status(500).json(err);
    // }
});

router.post('/',withAuth, async (req, res) => {
    const body = req.body
    console.log(req.body, req.session.user_id)
    // try {
        const newComment = await Comment.create({
            ...body,
            user_id: req.session.user_id,
        });
        res.json(newComment);
    // } catch (err) {
    //     res.status(500).json(err);
    // }
});

router.delete('/:id', withAuth, async (req, res) =>{
    // try {
        const affectedRows  = await Comment.destroy({
            where: {
                id: req.params.id,
            },
        });
        res.json(affectedRows)
        // if(affectedRows > 0) {
        //     res.status(200).json(affectedRows);
        // } else {
        //     res.status(
        // }
    // } catch (err) {
    //     res.status(500).json(err)
    // }
});

module.exports = router
