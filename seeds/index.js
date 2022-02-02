const sequelize = require('../config/connection');
const seedUsers = require('./user-seeds.json');
const seedPosts = require('./post-seeds.json');
const seedComments = require('./comment-seeds.json');
const { User, Post, Comment } = require('../models');



const seedAll = async() => {
    await sequelize.sync({ force: true });
      const users = await User.bulkCreate(seedUsers, {
    individualHooks: true,
    returning: true,
  });
  const posts = await Post.bulkCreate(seedPosts, {
    returning: true,
  });
  const comments = await Comment.bulkCreate(seedComments, {
    returning: true,
  });
    process.exit(0);
};

seedAll();