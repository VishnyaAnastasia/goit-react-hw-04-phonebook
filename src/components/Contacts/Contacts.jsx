import styles from './Contacts.module.css';
import PropTypes from 'prop-types';

export const Contacts = ({ deleteContact, filteredContacts }) => {
  return (
    <ul>
      {filteredContacts.map(({ id, number, name }) => (
        <li className={styles.contactInfo} key={id}>
          <div className={styles.contactLine}>
            {name}: {number}
          </div>
          <button
            className={styles.btnDelete}
            onClick={deleteContact}
            name={id}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

Contacts.propTypes = {
  filteredContacts: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteContact: PropTypes.func.isRequired,
};
