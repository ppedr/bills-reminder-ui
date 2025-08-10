import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Home() {
  const e = React.createElement;
  const navigate = useNavigate();
  return e(
    'div',
    null,
    e(
      'span',
      {
        className: 'icon',
        onClick: () => navigate(-1),
        style: { marginBottom: '1rem', cursor: 'pointer' }
      },
      '↩'
    ),
    e('h1', null, 'Bills Reminder'),
    e(
      'nav',
      null,
      e(Link, { to: '/create' }, 'Create Bill'),
      e(Link, { to: '/paid' }, 'Paid Bills'),
      e(Link, { to: '/unpaid' }, 'Unpaid Bills')
    )
  );
}
