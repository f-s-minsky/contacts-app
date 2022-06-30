// import React, { useContext, useRef, useEffect } from 'react';
import React from 'react';
// import ContactContext from '../../context/contact/contactContext';
import {
  useContacts,
  filterContacts,
  clearFilter,
} from '../../context/contact/ContactState';

const ContactFilter = () => {
  // const contactContext = useContext(ContactContext);
  // const text = useRef('');

  // NEW we just need the contact dispatch without state.
  const contactDispatch = useContacts()[1];

  // const { filterContacts, clearFilter, filtered } = contactContext;

  // useEffect(() => {
  //   if (filtered === null) {
  //     text.current.value = '';
  //   }
  // });

  // const onChange = (e) => {
  //   if (text.current.value !== '') {
  //     filterContacts(e.target.value);
  //   } else {
  //     clearFilter();
  //   }
  // };

  // NEW
  const onChange = (e) => {
    if (e.target.value !== '') {
      filterContacts(contactDispatch, e.target.value);
    } else {
      clearFilter(contactDispatch);
    }
  };

  return (
    // <form >
    <form onSubmit={(e) => e.preventDefault()}>
      <input
        // ref={text}
        type='text'
        placeholder='Filter Contacts...'
        onChange={onChange}
      />
    </form>
  );
};

export default ContactFilter;
