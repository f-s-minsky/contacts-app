import React, { Fragment, useContext } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ContactItem from './ContactItem';
// import ContactContext from '../../context/contact/contactContext';
import { useContacts } from '../../context/contact/ContactState';

const Contacts = () => {
  // Initialise context
  // const contactContext = useContext(ContactContext);
  const [contactState, contactDispatch] = useContacts();

  // NEW Pull out contacts list
  const { contacts, filtered } = contactState;

  // // Pull out contacts list
  // const { contacts, filtered } = contactContext;

  if (contacts.length === 0) {
    return <h4>Please add a contact</h4>;
  }

  return (
    <Fragment>
      <TransitionGroup>
        {filtered !== null
          ? filtered.map((contact) => (
              <CSSTransition key={contact.id} timeout={1000} classNames='item'>
                <ContactItem contact={contact} />
              </CSSTransition>
            ))
          : contacts.map((contact) => (
              <CSSTransition key={contact.id} timeout={1000} classNames='item'>
                <ContactItem contact={contact} />
              </CSSTransition>
            ))}
      </TransitionGroup>
    </Fragment>
  );
};

export default Contacts;
