import React, { useReducer, useContext } from 'react';
import { v4 as uuid } from 'uuid';
// import uuid from 'uuid'; Brad version
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

// Create a custom hook to use the contact context

export const useContacts = () => {
  const { state, dispatch } = useContext(ContactContext);
  return [state, dispatch];
};

// Add Contact
export const addContact = (contact, dispatch) => {
  contact.id = uuid();
  dispatch({ type: ADD_CONTACT, payload: contact });
};

// Delete Contact
export const deleteContact = (id, dispatch) => {
  dispatch({ type: DELETE_CONTACT, payload: id });
};

// Set Current Contact
export const setCurrent = (contact, dispatch) => {
  dispatch({ type: SET_CURRENT, payload: contact });
};

// Clear Current Contact
export const clearCurrent = (dispatch) => {
  dispatch({ type: CLEAR_CURRENT });
};

// Update Contact
export const updateContact = (contact, dispatch) => {
  dispatch({ type: UPDATE_CONTACT, payload: contact });
};

// Filter Contacts
export const filterContacts = (text, dispatch) => {
  dispatch({ type: FILTER_CONTACTS, payload: text });
};

// Clear Filter
export const clearFilter = (dispatch) => {
  dispatch({ type: CLEAR_FILTER });
};

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
    current: null,
    filtered: null,
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  // return (
  //   <ContactContext.Provider
  //     value={{
  //       contacts: state.contacts,
  //       current: state.current,
  //       filtered: state.filtered,
  //       addContact,
  //       deleteContact,
  //       setCurrent,
  //       clearCurrent,
  //       updateContact,
  //       filterContacts,
  //       clearFilter,
  //     }}
  //   >
  //     {props.children}
  //   </ContactContext.Provider>
  // );
  return (
    <ContactContext.Provider
      value={{
        state: state,
        dispatch,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
