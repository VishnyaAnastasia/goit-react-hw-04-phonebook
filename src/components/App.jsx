import React, { Component } from 'react';

import { nanoid } from 'nanoid';

import { Section } from './Section/Section';
import { Phonebook } from './Phonebook/Phonebook';
import { Contacts } from './Contacts/Contacts';
import { Filter } from './Filter/Filter';

export class App extends Component {
  state = {
    contacts: [
      { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
      { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
      { id: nanoid(), name: 'Eden Clements', number: '645-17-79' },
      { id: nanoid(), name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const saveContacts = localStorage.getItem('contacts');
    if (saveContacts) {
      this.setState({ contacts: JSON.parse(saveContacts) });
    }
  }

  componentDidUpdate(_, prevState) {
    const { contacts } = this.state;
    if (prevState.contacts !== contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  filterHandler = event => {
    this.setState({ filter: event.target.value });
  };

  addContact = newContact => {
    if (this.state.contacts.find(contact => contact.name === newContact.name)) {
      alert(`${newContact.name} is already in contacts`);
      return;
    }
    this.setState(prevState => {
      const newState = {
        contacts: [newContact, ...prevState.contacts],
      };
      return newState;
    });
  };

  deleteContact = event => {
    this.setState(prevState => {
      const newContacts = prevState.contacts.filter(contact => {
        return contact.id !== event.target.name;
      });
      return { contacts: [...newContacts] };
    });
  };

  filteredContacts = () => {
    const { contacts, filter } = this.state;
    const filteredContactsArr = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase().trim())
    );
    return filteredContactsArr;
  };

  render() {
    const { contacts } = this.state;
    const { deleteContact, filterHandler, addContact, filteredContacts } = this;
    return (
      <>
        <Section title="Phonebook">
          <Phonebook addContact={addContact} />
        </Section>
        <Section title="Contacts">
          <Filter filterHandler={filterHandler} />
          <Contacts
            contacts={contacts}
            deleteContact={deleteContact}
            filteredContacts={filteredContacts}
          />
        </Section>
      </>
    );
  }
}
