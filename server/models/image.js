const moongoose = require('mongoose');

const Schema = moongoose.Schema;

const imageSchema = new Schema({
  url: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  tags: { type: String, required: false },
});

module.exports = moongoose.model('Image', imageSchema);
