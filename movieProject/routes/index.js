const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const cors = require('cors')

mongoose.connect('mongodb://localhost:27017/webProj')
const db = mongoose.connection;

const movieSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  rating: { type: Number, required: true},
  notes: {type: String, required: true}
});

const MovieModel = mongoose.model('Movie', movieSchema);

const contactInfo = new mongoose.Schema({
  full_name: { type: String, required: true},
  number: { type: Number, required: true, unique: true},
  email: { type: String, required: true},
  date_created: { type: Date, default: Date.now }
});

const ContactModel = mongoose.model('Contact', contactInfo);

app.use(express.urlencoded({ extended: true })) 

app.use(express.json());

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home Page' });
});

/* GET about page. */
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About Page' });
});


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

// GET: localhost:3001/contacts
router.get("/contacts", async (req, res) => {
  try {
  const contacts = await ContactModel.find({});
  res.json(contacts);
  } catch (error) {
  res.status(500).send(error);
  }
});

// POST: localhost:3001/contacts
router.post("/contacts", async (req, res) => {
  const { full_name, number, email } = req.body;
  const contact = new ContactModel({
    full_name,
    number,
    email
  });
  try {
  const newContact = await contact.save();
  res.status(201).json(newContact);
  } catch (error) {
  res.status(500).send(error);
  }
});

// PUT: localhost:3001/contacts/id
router.put("/contacts/:id", async (req, res) => {
  const { id } = req.params;
  const { full_name, number, email } = req.body;
  try {
  const updatedContact = await ContactModel.findByIdAndUpdate(
  id,
  { full_name, number, email },
  { new: true }
  );
  if (updatedContact) {
  res.json(updatedContact);
  } else {
  res.status(404).send('Contact not found');
  }
  } catch (error) {
  res.status(500).send(error);
  }
});

// DELETE: localhost:3001/contacts/id
router.delete("/contacts/:id", async (req, res) => {
  const { id } = req.params;
  try {
  const deletedContact = await ContactModel.findByIdAndDelete(id);
  if (deletedContact) {
  res.status(204).send(); // No content to send back
  } else {
  res.status(404).send('Contact not found');
  }
  } catch (error) {
  res.status(500).send(error);
  }
});

var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// Use the router for all routes
app.use("/", router);

app.listen(3001, () => {
  console.log("API is running on port: 3000");
});
   
app.listen(5000,  
   () => console.log(`⚡️[bootup]: Server is running at port: 5000`));

module.exports = router;
