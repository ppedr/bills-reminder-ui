import React, { useState, useEffect } from 'react';
import { fetchBills, markBillPaid } from './api.js';

export default function BillsList({ status }) {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [bills, setBills] = useState([]);
  const [error, setError] = useState('');

  const load = async () => {
    setError('');
    try {
      const data = await fetchBills(status, year, month);
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
        e('input', {
          type: 'number',
          value: month,
          min: '1',
          max: '12',
          onChange: (e2) => setMonth(e2.target.value)
        })
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
          status === 'unpaid' && e('th', null, 'Actions')
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
            status === 'unpaid' &&
              e(
                'td',
                { className: 'actions' },
                e(
                  'button',
                  { onClick: () => handlePaid(b.id) },
                  'Mark Paid'
                )
              )
          )
        )
      )
    )
  );
}
