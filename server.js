import express from 'express';
import authUser from './routes/auth.js';
import contacts from './routes/contacts.js';
import users from './routes/users.js';

const app = express();

app.get('/', (req, res) => {
  res.json({ msg: 'Hello from get /' });
});

// use of routers
app.use('/api/users', users);
app.use('/api/auth', authUser);
app.use('/api/contacts', contacts);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
