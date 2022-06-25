import React, { useReducer } from 'react';
// import {v4 as uuidv4} from 'uuid'
import uuid from 'uuid';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  SET_CURRENT,
  CLEAR_CURRENT,
  CLEAR_FILTER,
} from '../types';

const ContactState = (props) => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: 'Jeff Costello',
        email: 'jeff@gmail.com',
        phone: '111',
        type: 'personal',
      },
      {
        id: 2,
        name: 'Antonin Artaud',
        email: 'antonin@gmail.com',
        phone: '222',
        type: 'personal',
      },
      {
        id: 3,
        name: 'JL Godard',
        email: 'jl@gmail.com',
        phone: '333',
        type: 'professional',
      },
    ],
  };

  const [state, dispatch] = useReducer(
    contactReducer,
    initialState
  );

  // Add Contact

  // Delete Contact

  // Set Current Contact

  // Clear Current Contact

  // Update Contact

  // Filter Contacts

  // Clear Filter

  return (
    <ContactContext.Provider
      value={{ contacts: state.contacts }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
