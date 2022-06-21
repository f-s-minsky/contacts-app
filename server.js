import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authUser from './routes/auth.js';
import contacts from './routes/contacts.js';
import users from './routes/users.js';

// Load .env file content (env variables) in process.env
dotenv.config({ path: './config/config.env' });

// Connect Database
connectDB();

const app = express();

// Init Middleware for parsing reques body
app.use(express.json({ extended: false }));

app.get('/', (req, res) => {
  res.json({ msg: 'Hello from get /' });
});

// use of routers
app.use('/api/users', users);
app.use('/api/auth', authUser);
app.use('/api/contacts', contacts);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  );
});
