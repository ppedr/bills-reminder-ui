import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createBill } from './api.js';

const billTypes = [
  { value: 'INTERNET', label: 'Internet' },
  { value: 'WATER', label: 'Water' },
  { value: 'CELLPHONE_PLAN', label: 'Cellphone Plan' },
  { value: 'MEI', label: 'MEI' },
  { value: 'ELECTRICITY', label: 'Electricity' },
  { value: 'GAS', label: 'Gas' },
  { value: 'CREDIT_CARD', label: 'Credit Card' }
];

const cardNames = ['INTER', 'ITAU', 'XP', 'PICPAY'];

export default function CreateBill() {
  const [form, setForm] = useState({
    name: '',
    dueDate: '',
    email: '',
    type: 'INTERNET',
    cardName: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const payload = {
        name: form.name,
        dueDate: form.dueDate,
        email: form.email,
        type: form.type,
      };
      if (form.type === 'CREDIT_CARD') {
        payload.cardName = form.cardName;
      }
      await createBill(payload);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  const e = React.createElement;
  return e(
    'div',
    null,
    e(
      Link,
      { to: '/', className: 'icon', style: { marginBottom: '1rem' } },
      '↩'
    ),
    e('h2', null, 'Create Bill'),
    error && e('p', { style: { color: 'red' } }, error),
    e(
      'form',
      { onSubmit: handleSubmit },
      e('input', {
        name: 'name',
        placeholder: 'Bill Name',
        value: form.name,
        onChange: handleChange,
        required: true
      }),
      e('input', {
        type: 'date',
        name: 'dueDate',
        value: form.dueDate,
        onChange: handleChange,
        required: true
      }),
      e('input', {
        type: 'email',
        name: 'email',
        placeholder: 'Email',
        value: form.email,
        onChange: handleChange,
        required: true
      }),
      e(
        'select',
        { name: 'type', value: form.type, onChange: handleChange },
        billTypes.map((t) =>
          e('option', { key: t.value, value: t.value }, t.label)
        )
      ),
      form.type === 'CREDIT_CARD' &&
        e(
          'select',
          {
            name: 'cardName',
            value: form.cardName,
            onChange: handleChange,
            required: true
          },
          e('option', { value: '', disabled: true }, 'Select Card'),
          cardNames.map((c) => e('option', { key: c, value: c }, c))
        ),
      e('button', { type: 'submit' }, 'Save')
    )
  );
}
