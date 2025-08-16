import React, { useState, useEffect } from 'react';
import { fetchBills, markBillPaid, deleteBill } from './api.js';

export default function BillsList({ status }) {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(String(now.getMonth() + 1));
  const [bills, setBills] = useState([]);
  const [error, setError] = useState('');

  const load = async () => {
    setError('');
    try {
      const data = await fetchBills(status, year, month);
      data.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
      setBills(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    load();
  }, [year, month]);

  const handlePaid = async (id) => {
    try {
      await markBillPaid(id);
      load();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteBill(id);
      load();
    } catch (err) {
      alert(err.message);
    }
  };

  const e = React.createElement;
  return e(
    'div',
    null,
    e('h2', null, status === 'paid' ? 'Paid Bills' : 'Unpaid Bills'),
    e(
      'div',
      { style: { marginBottom: '1rem' } },
      e(
        'label',
        null,
        'Year: ',
        e('input', {
          type: 'number',
          value: year,
          onChange: (e2) => setYear(e2.target.value)
        })
      ),
      e(
        'label',
        { style: { marginLeft: '1rem' } },
        'Month: ',
        e(
          'select',
          {
            value: month,
            onChange: (e2) => setMonth(e2.target.value)
          },
          [
            e('option', { value: '1' }, 'January'),
            e('option', { value: '2' }, 'February'),
            e('option', { value: '3' }, 'March'),
            e('option', { value: '4' }, 'April'),
            e('option', { value: '5' }, 'May'),
            e('option', { value: '6' }, 'June'),
            e('option', { value: '7' }, 'July'),
            e('option', { value: '8' }, 'August'),
            e('option', { value: '9' }, 'September'),
            e('option', { value: '10' }, 'October'),
            e('option', { value: '11' }, 'November'),
            e('option', { value: '12' }, 'December')
          ]
        )
      )
    ),
    error && e('p', { style: { color: 'red' } }, error),
    e(
      'table',
      null,
      e(
        'thead',
        null,
        e(
          'tr',
          null,
          e('th', null, 'Name'),
          e('th', null, 'Due Date'),
          e('th', null, 'Email'),
          e('th', null, 'Type'),
          e('th', null, 'Actions')
        )
      ),
      e(
        'tbody',
        null,
        bills.map((b) =>
          e(
            'tr',
            { key: b.id },
            e('td', null, b.name),
            e('td', null, b.dueDate),
            e('td', null, b.email),
            e('td', null, b.type),
            e(
              'td',
              { className: 'actions' },
              status === 'unpaid' &&
                e(
                  'button',
                  { onClick: () => handlePaid(b.id) },
                  'mark it as paid'
                ),
              e(
                'button',
                {
                  onClick: () => handleDelete(b.id),
                  style: { marginLeft: status === 'unpaid' ? '0.5rem' : 0 }
                },
                'delete'
              )
            )
          )
        )
      )
    )
  );
}
