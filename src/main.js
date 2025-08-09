import React from 'https://esm.sh/react@18';
import { createRoot } from 'https://esm.sh/react-dom@18/client';
import { BrowserRouter, Routes, Route } from 'https://esm.sh/react-router-dom@6';

import Home from './Home.js';
import CreateBill from './CreateBill.js';
import BillsList from './BillsList.js';

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateBill />} />
          <Route path="/paid" element={<BillsList status="paid" />} />
          <Route path="/unpaid" element={<BillsList status="unpaid" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

createRoot(document.getElementById('root')).render(<App />);
