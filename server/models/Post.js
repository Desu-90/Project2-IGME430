const mongoose = require('mongoose');
// const _ = require('underscore');

let PostModel = {};

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  text: {
    type: String,
    required: true,
    trim: true,
  },

  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

PostSchema.statics.toAPI = (doc) => ({
  title: doc.title,
  text: doc.text,
});

PostSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: mongoose.Types.ObjectId(ownerId),
  };

  return PostModel.find(search).select('title text').lean().exec(callback);
};

PostModel = mongoose.model('Post', PostSchema);

module.exports = PostModel;
