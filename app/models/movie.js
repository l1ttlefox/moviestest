var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var MovieSchema   = new Schema({
  title: String,
  description: String,
  rating: Number,
  released: { type: Date, default: Date.now }
});



module.exports = mongoose.model('Movie', MovieSchema);