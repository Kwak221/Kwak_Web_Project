const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/movieInfo')
const db = mongoose.connection;

const movieSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  rating: { type: Number, required: true},
  notes: {type: String, required: true},
  date_created: { type: Date, default: Date.now }
});

const MovieModel = mongoose.model('Movie', movieSchema);

app.use(express.json());

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

let movie_list = [
  {id: 1, name: 'The Godfather', rating: 9, notes: 'One of Best Movie Ever Made!'},
  {id: 2, name: 'The Lord Of The Rings: Return of the King', rating: 10, notes: 'Great Finale to a Trilogy!!'}
]

// GET: localhost:3001/movies
router.get("/movies", async (req, res) => {
  try {
  const movies = await MovieModel.find({});
  res.json(movies);
  } catch (error) {
  res.status(500).send(error);
  }
});

// POST: localhost:3001/movies
router.post("/movies", async (req, res) => {
  const { name, rating, notes } = req.body;
  const movie = new MovieModel({
    name,
    rating,
    notes
  });
  try {
  const newMovie = await movie.save();
  res.status(201).json(newMovie);
  } catch (error) {
  res.status(500).send(error);
  }
});

// PUT: localhost:3001/movies/id
router.put("/movies/:id", async (req, res) => {
  const { id } = req.params;
  const { name, rating, notes } = req.body;
  try {
  const updatedMovie = await MovieModel.findByIdAndUpdate(
  id,
  { name, rating, notes },
  { new: true }
  );
  if (updatedMovie) {
  res.json(updatedMovie);
  } else {
  res.status(404).send('Movie not found');
  }
  } catch (error) {
  res.status(500).send(error);
  }
});

// DELETE: localhost:3001/movies/id
router.delete("/movies/:id", async (req, res) => {
  const { id } = req.params;
  try {
  const deletedMovie = await MovieModel.findByIdAndDelete(id);
  if (deletedMovie) {
  res.status(204).send(); // No content to send back
  } else {
  res.status(404).send('Movie not found');
  }
  } catch (error) {
  res.status(500).send(error);
  }
});

// Use the router for all routes
app.use("/", router);

app.listen(3001, () => {
  console.log("API is running on port: 3000");
});

module.exports = router;
