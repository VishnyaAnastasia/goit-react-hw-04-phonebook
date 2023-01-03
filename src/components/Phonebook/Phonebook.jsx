import { nanoid } from 'nanoid';
import React, { Component } from 'react';
import styles from './Phonebook.module.css';

export class Phonebook extends Component {
  state = {
    name: '',
    number: '',
  };

  inputHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  submitHandler = event => {
    event.preventDefault();

    const name = this.state.name;
    const number = this.state.number;
    const id = nanoid();
    const newContact = { id: id, name: name, number: number };

    this.props.addContact(newContact);
    event.target.reset();
  };

  render() {
    const { submitHandler, inputHandler } = this;

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
        <div className={styles.btnConteiner}>
          <button className={styles.btnAdd} type="submit">
            Add
          </button>
        </div>
      </form>
    );
  }
}
