const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String },
  author : { type: mongoose.Types.ObjectId, ref: 'user'}
})

postSchema.pre(/findOne|find/, function (next) {
  console.log("Post model calling");
  next();
}, { timestamps: true })

module.exports = mongoose.model('post', postSchema);  