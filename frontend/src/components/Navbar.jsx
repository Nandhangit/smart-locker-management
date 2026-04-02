import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow">
      <h1 className="text-xl font-bold">🔐 Smart Locker</h1>
      {user && (
        <div className="flex items-center gap-6">
          <Link to="/lockers" className="hover:underline">Lockers</Link>
          <Link to="/reservations" className="hover:underline">Reservations</Link>
          <span className="text-blue-200 text-sm">{user.name} ({user.role})</span>
          <button onClick={handleLogout}
            className="bg-white text-blue-600 px-3 py-1 rounded-lg text-sm font-medium hover:bg-blue-50">
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}