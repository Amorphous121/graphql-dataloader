const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String },
  posts: { type: mongoose.Types.ObjectId, ref: 'post' }
})

userSchema.pre(/findOne|find/, function (next) {
  console.log("User model calling");
  next();
}, { timestamps: true })

module.exports = mongoose.model('user', userSchema);  