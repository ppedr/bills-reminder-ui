import React from 'https://esm.sh/react@18';
import { Link } from 'https://esm.sh/react-router-dom@6';

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
