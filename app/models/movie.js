var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

// var MovieSchema   = new Schema({
//   id: Number,
//   title: String,
//   description: String,
//   rating: Number,
//   released: String
// });

var MovieSchema   = new Schema({
  title: String,
  description: String,
  rating: Number,
  released: Number
});



module.exports = mongoose.model('Movie', MovieSchema);