import React, { useContext, useRef, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactFilter = () => {
  const contactContext = useContext(ContactContext);
  const text = useRef('');

  const { filterContacts, clearFilter, filtered } = contactContext;

  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  });

  const onChange = (e) => {
    // console.log('text', text);
    // console.log('text.current.value in onChange', text.current.value);
    // console.log('e.current.value in onChange', e.current.value);
    if (text.current.value !== '') {
      filterContacts(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <form>
      <input
        ref={text}
        type='text'
        placeholder='Filter Contacts...'
        onChange={onChange}
      />
    </form>
  );

  // const onChange = (e) => {
  //   e.target.value ? filterContacts(e.target.value) : clearFilter();
  // };
  // return (
  //   <form onSubmit={(e) => e.preventDefault()}>
  //     <input
  //       type='text'
  //       placeholder='Filter Contacts...'
  //       // onChange={(e) => {
  //       //   e.target.value ? filterContacts(e.target.value) : clearFilter();
  //       // }}
  //       onChange={onChange}
  //     />
  //   </form>
  // );
};

export default ContactFilter;
