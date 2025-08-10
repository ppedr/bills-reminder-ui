import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const e = React.createElement;
  return e(
    'div',
    null,
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
