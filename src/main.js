import React from 'https://esm.sh/react@18';
import { createRoot } from 'https://esm.sh/react-dom@18/client';
import { BrowserRouter, Routes, Route } from 'https://esm.sh/react-router-dom@6';

import Home from './Home.js';
import CreateBill from './CreateBill.js';
import BillsList from './BillsList.js';

function App() {
  const e = React.createElement;
  return e(
    BrowserRouter,
    null,
    e(
      'div',
      { className: 'container' },
      e(
        Routes,
        null,
        e(Route, { path: '/', element: e(Home) }),
        e(Route, { path: '/create', element: e(CreateBill) }),
        e(Route, { path: '/paid', element: e(BillsList, { status: 'paid' }) }),
        e(Route, { path: '/unpaid', element: e(BillsList, { status: 'unpaid' }) })
      )
    )
  );
}

createRoot(document.getElementById('root')).render(React.createElement(App));
