const express = require("express");
const router = express.Router();

const movieController = require("../../controllers/movieController");

router.get('/movies', movieController.getMovieList);
router.get('/movie/:id', movieController.getMovie);

// router.get('/shows', movieController.getShows);
// router.get('/show/:id', movieController.getShow);

module.exports = router;

