import mongoose from 'mongoose';

const ContactSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    default: 'personnel',
  },
  type: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Contact = mongoose.model('contact', ContactSchema);

export default Contact;
