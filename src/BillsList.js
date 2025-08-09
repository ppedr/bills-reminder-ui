import React, { useState, useEffect } from 'https://esm.sh/react@18';
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

  return (
    <div>
      <h2>{status === 'paid' ? 'Paid Bills' : 'Unpaid Bills'}</h2>
      <div style={{marginBottom:'1rem'}}>
        <label>
          Year: <input type="number" value={year} onChange={e => setYear(e.target.value)} />
        </label>
        <label style={{marginLeft:'1rem'}}>
          Month: <input type="number" value={month} min="1" max="12" onChange={e => setMonth(e.target.value)} />
        </label>
      </div>
      {error && <p style={{color:'red'}}>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Due Date</th>
            <th>Email</th>
            <th>Type</th>
            {status === 'unpaid' && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {bills.map(b => (
            <tr key={b.id}>
              <td>{b.name}</td>
              <td>{b.dueDate}</td>
              <td>{b.email}</td>
              <td>{b.type}</td>
              {status === 'unpaid' && (
                <td className="actions">
                  <button onClick={() => handlePaid(b.id)}>Mark Paid</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
