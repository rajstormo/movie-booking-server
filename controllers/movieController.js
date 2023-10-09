const Movie = require('../models/Movie');

exports.getMovieList = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).send(movies);
  }
  catch(err) {
    console.log(err);
    res.status(500).json({error: err});
  }
}

exports.getMovie = async (req, res) => {
  //find by id
  try {
    const {id} = req.params;
    const movie = await Movie.findById({_id: id});
    console.log(movie);
    if (!movie)
      return res.status(400).json({error: true, message: "No Movie exist!"});
    return res.status(200).json({error: false, message: movie});
  }
  catch(error) {
    console.log(error);
  }
}