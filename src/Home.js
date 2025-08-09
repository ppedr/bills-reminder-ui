import { Link } from 'https://esm.sh/react-router-dom@6';

export default function Home() {
  return (
    <div>
      <h1>Bills Reminder</h1>
      <nav>
        <Link to="/create">Create Bill</Link>
        <Link to="/paid">Paid Bills</Link>
        <Link to="/unpaid">Unpaid Bills</Link>
      </nav>
    </div>
  );
}
