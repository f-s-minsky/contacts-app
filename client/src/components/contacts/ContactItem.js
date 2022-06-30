import React, { useContext } from 'react';
import PropTypes from 'prop-types';
// import ContactContext from '../../context/contact/contactContext';
import {
  useContacts,
  deleteContact,
  setCurrent,
  clearCurrent,
} from '../../context/contact/ContactState';

const ContactItem = ({ contact }) => {
  // const contactContext = useContext(ContactContext);
  // const { deleteContact, setCurrent, clearCurrent } =
  //   contactContext;

  // NEW
  // we just need the contact dispatch without state.
  const contactDispatch = useContacts()[1];

  // const { id, name, email, phone, type } = contact;

  // NEW
  const { _id, name, email, phone, type } = contact;

  // const onDelete = () => {
  //   deleteContact(id);
  //   clearCurrent();
  // };

  // New
  const onDelete = () => {
    deleteContact(contactDispatch, _id);
    clearCurrent(contactDispatch);
  };

  return (
    <div className='card bg-light'>
      <h3 className='text-primary text-left'>
        {name}{' '}
        <span
          style={{ float: 'right' }}
          className={
            'badge ' +
            (type === 'professional' ? 'badge-success' : 'badge-primary')
          }
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h3>
      <ul className='list'>
        {/* If email exist display it with icon */}
        {email && (
          <li>
            <i className='fas fa-envelope-open' />
            {email}
          </li>
        )}
        {/* If phone exist display it with icon */}
        {phone && (
          <li>
            <i className='fas fa-phone' />
            {phone}
          </li>
        )}
      </ul>
      <p>
        {/* <button
          className='btn btn-dark btn-sm'
          onClick={() => setCurrent(contact)}
        > */}
        {/* New */}
        <button
          className='btn btn-dark btn-sm'
          onClick={() => setCurrent(contactDispatch, contact)}
        >
          Edit
        </button>
        <button className='btn btn-danger btn-sm' onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired,
};

export default ContactItem;
