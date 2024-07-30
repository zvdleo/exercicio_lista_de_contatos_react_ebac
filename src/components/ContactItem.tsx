import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeContact, updateContact } from '../store/slices/contactsSlice';
import { Contact } from '../types/types';
import styled from 'styled-components';

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border: 1px solid #ddd;
  margin-bottom: 10px;
`;

interface ContactItemProps {
  contact: Contact;
}

const ContactItem: React.FC<ContactItemProps> = ({ contact }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(contact.name);
  const [email, setEmail] = useState(contact.email);
  const [phone, setPhone] = useState(contact.phone);

  const handleUpdate = () => {
    dispatch(updateContact({ ...contact, name, email, phone }));
    setIsEditing(false);
  };

  return (
    <Item>
      {isEditing ? (
        <>
          <input value={name} onChange={(e) => setName(e.target.value)} />
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
          <input value={phone} onChange={(e) => setPhone(e.target.value)} />
          <button onClick={handleUpdate}>Salvar</button>
        </>
      ) : (
        <>
          <span>{contact.name}</span>
          <span>{contact.email}</span>
          <span>{contact.phone}</span>
          <button onClick={() => setIsEditing(true)}>Editar</button>
          <button onClick={() => dispatch(removeContact(contact.id))}>Remover</button>
        </>
      )}
    </Item>
  );
};

export default ContactItem;
