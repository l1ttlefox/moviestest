// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var morgan     = require('morgan');




// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port     = process.env.PORT || 8080; // set our port

var mongoose   = require('mongoose');
mongoose.connect('mongodb://dbmovieuser:15975382Q@ds058579.mlab.com:58579/dbmovie'); // connect to our database
var Movie     = require('./app/models/movie');

// ROUTES FOR OUR API
// =============================================================================

// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
  // do logging
  console.log('Something is happening.');
  next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
  res.sendfile('index.html');
  // res.json({ message: 'hooray! welcome to our api!' });
});

// on routes that end in /movies
// ----------------------------------------------------
router.route('/movies')

// create a movie (accessed at POST http://localhost:8080/movies)
  .post(function(req, res) {

    var movie = new Movie();		// create a new instance of the Movie model
    movie.title = req.body.title;  // set the movies name (comes from the request)
    movie.description = req.body.description;  // set the movies name (comes from the request)
    movie.rating = req.body.rating;
    movie.released = req.body.rating;

    movie.save(function(err) {
      if (err)
        res.send(err);

      res.json({ message: 'Movie created!' });
    });


  })

  // get all the movies (accessed at GET http://localhost:8080/api/movies)
  .get(function(req, res) {
    Movie.find(function(err, movies) {
      if (err)
        res.send(err);

      res.json(movies);
    });
  });

// on routes that end in /movies/:movie_id
// ----------------------------------------------------
router.route('/movies/:movie_id')

// get the movie with that id
  .get(function(req, res) {
    Movie.findById(req.params.movie_id, function(err, movie) {
      if (err)
        res.send(err);
      res.json(movie);
    });
  })

  // update the movie with this id
  .put(function(req, res) {
    Movie.findById(req.params.movie_id, function(err, movie) {

      if (err)
        res.send(err);

      movie.name = req.body.name;
      movie.save(function(err) {
        if (err)
          res.send(err);

        res.json({ message: 'Movie updated!' });
      });

    });
  })

  // delete the movie with this id
  .delete(function(req, res) {
    Movie.remove({
      _id: req.params.movie_id
    }, function(err, movie) {
      if (err)
        res.send(err);

      res.json({ message: 'Successfully deleted' });
    });
  });


// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
