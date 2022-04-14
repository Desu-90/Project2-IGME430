const mongoose = require('mongoose');
const _ = require('underscore');

let PostModel = {};

const PostSchema = new mongoose.Schema({
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
  text: doc.text,
});

PostSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: mongoose.Types.ObjectId(ownerId),
  };

  return PostModel.find(search).select('name age color').lean().exec(callback);
};

PostModel = mongoose.model('Post', PostSchema);

module.exports = PostModel;
