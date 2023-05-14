import express from 'express';
import ejs from 'ejs';

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }))


// Store user data in a variable (in-memory database)
const users = [];

// Render the user registration form
app.get('/', (req, res) => {
  res.render('register');
});

// Handle the user registration form submission
app.post('/', (req, res) => {
  // Get the form data from the request body
  const { firstname, lastname, username } = req.body;
  // Get the profile picture file from the request files
  const profilePicture = req.files.profilePicture;

  // Store the user data in the in-memory database
  users.push({ firstname, lastname, username, profilePicture });

  // Render the user details page with the user data
  res.render('user', { user: { firstname, lastname, username, profilePicture } });
});

// Start the server
app.listen(3000, () => console.log('Server started on port 3000'));