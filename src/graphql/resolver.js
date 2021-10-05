const PostModel = require('../models/posts');
const UserModel = require('../models/users.model');
const DataLoader = require('dataloader');

let count = 0;

const authorLoader = new DataLoader(async (ids) => {
  const authors = await UserModel.find({ _id: { $in : ids }});
  const authorMap = {};
  authors.forEach(author => {
    authorMap[author._id] = author;
  })

  return ids.map(id => authorMap[id])
})

// const postLoader = new DataLoader(async (ids) => {
//   const posts = await PostModel.find({ _id: { $in: ids }});
//   const postMap = {};
//   posts.forEach(post => {
//     postMap[post._id] = post;
//   });

//   return ids.map(id => postMap[id]);
// })

module.exports = {
  Query: {
    getUsers: async () => {
      return await UserModel.find().lean()
    },
    getPosts: async () => {
      return await PostModel.find().lean()
    }
  },

  User: {
    posts: (parent, args, ctx) => {
      return PostModel.find({ author: parent._id });
      // let postIds = parent.posts.map(id => id.toString());
      // return postLoader.load(postIds);
    }
  },

  Post: {
    author: async (parent, args, ctx) => {
      return UserModel.findOne({ _id: parent.author });
      // return authorLoader.load(parent.author);

    }

  },

  Mutation: {
    createUser: async (parent, { payload }) => {
      let user = await UserModel.create(payload)
      return user;
    },

    createPost: async (parent, { payload }) => {
      let post = await PostModel.create({...payload });
      await UserModel.findOneAndUpdate({ _id: payload.author }, { $addToSet: { posts: post.id }});
      return post;
    }
  }
}    