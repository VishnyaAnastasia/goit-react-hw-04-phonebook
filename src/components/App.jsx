import { useState, useEffect } from 'react';

import { nanoid } from 'nanoid';

import { Section } from './Section/Section';
import { Phonebook } from './Phonebook/Phonebook';
import { Contacts } from './Contacts/Contacts';
import { Filter } from './Filter/Filter';

export const App = () => {
  const initialContacts = [
    { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
    { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
    { id: nanoid(), name: 'Eden Clements', number: '645-17-79' },
    { id: nanoid(), name: 'Annie Copeland', number: '227-91-26' },
  ];

  const [filter, setFilter] = useState('');
  const [contacts, setContacts] = useState(
    localStorage.getItem('contacts')
      ? JSON.parse(localStorage.getItem('contacts'))
      : initialContacts
  );
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const filterHandler = event => {
    setFilter(event.target.value);
  };

  const addContact = newContact => {
    if (contacts.find(contact => contact.name === newContact.name)) {
      alert(`${newContact.name} is already in contacts`);
      return;
    }

    setContacts(prevState => [newContact, ...prevState]);
  };

  const deleteContact = event => {
    setContacts(prevState => {
      const newContacts = prevState.filter(contact => {
        return contact.id !== event.target.name;
      });
      return newContacts;
    });
  };

  const filteredContacts = () => {
    const filteredContactsArr = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase().trim())
    );
    return filteredContactsArr;
  };

  return (
    <>
      <Section title="Phonebook">
        <Phonebook addContact={addContact} />
      </Section>
      <Section title="Contacts">
        <Filter filterHandler={filterHandler} />
        <Contacts
          deleteContact={deleteContact}
          filteredContacts={filteredContacts()}
        />
      </Section>
    </>
  );
};
