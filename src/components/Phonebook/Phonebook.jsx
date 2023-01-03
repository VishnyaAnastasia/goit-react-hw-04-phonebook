import { nanoid } from 'nanoid';
import { useState } from 'react';

import PropTypes from 'prop-types';

import styles from './Phonebook.module.css';

export const Phonebook = ({ addContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const inputHandler = event => {
    if (event.target.name === 'name') {
      setName(event.target.value);
    }

    if (event.target.name === 'number') {
      setNumber(event.target.value);
    }
  };

  const submitHandler = event => {
    event.preventDefault();

    const id = nanoid();
    const newContact = { id: id, name: name, number: number };

    addContact(newContact);
    event.target.reset();
  };

  return (
    <form onSubmit={submitHandler}>
      <label>
        <h3 className={styles.titleName}>Name</h3>
        <input
          className={styles.inputView}
          onInput={inputHandler}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          placeholder="Anastasia Vishnyakova"
          required
        />
      </label>
      <label>
        <h3 className={styles.titleName}>Number</h3>
        <input
          className={styles.inputView}
          onInput={inputHandler}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          placeholder="555-05-55"
          required
        />
      </label>
      <div className={styles.btnContainer}>
        <button className={styles.btnAdd} type="submit">
          Add
        </button>
      </div>
    </form>
  );
};

Phonebook.propTypes = {
  addContact: PropTypes.func.isRequired,
};
