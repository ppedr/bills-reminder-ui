export const API_BASE = 'http://localhost:8015';

export async function createBill(bill) {
  const res = await fetch(`${API_BASE}/bills`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bill)
  });
  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || 'Failed to create bill');
  }
}

export async function fetchBills(status, year, month) {
  const res = await fetch(`${API_BASE}/bills/${status}?year=${year}&month=${month}`);
  if (!res.ok) throw new Error('Failed to load bills');
  return res.json();
}

export async function markBillPaid(id) {
  const res = await fetch(`${API_BASE}/bills/${id}/paid`, { method: 'POST' });
  if (!res.ok) throw new Error('Failed to mark bill as paid');
}

export async function deleteBill(id) {
  const res = await fetch(`${API_BASE}/bills/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete bill');
}
