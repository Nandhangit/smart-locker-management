import { useEffect, useState } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

export default function Reservations() {
  const [reservations, setReservations] = useState([]);
  const { user } = useAuth();

  const fetchReservations = async () => {
    const res = await api.get('/reservations/');
    setReservations(res.data);
  };

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { fetchReservations(); }, []);

  const handleRelease = async (id) => {
    await api.put(`/reservations/${id}/release/`);
    fetchReservations();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        {user?.role === 'admin' ? 'All Reservations' : 'My Reservations'}
      </h1>
      <div className="space-y-4">
        {reservations.length === 0 && (
          <p className="text-gray-500">No reservations found.</p>
        )}
        {reservations.map(r => (
          <div key={r.id} className="bg-white p-5 rounded-xl shadow flex justify-between items-center">
            <div>
              <p className="font-semibold text-gray-800">Locker #{r.locker?.locker_number}</p>
              <p className="text-sm text-gray-500">📍 {r.locker?.location}</p>
              {user?.role === 'admin' && (
                <p className="text-sm text-gray-500">👤 {r.user?.email}</p>
              )}
              <p className="text-sm text-gray-500 mt-1">
                Until: {new Date(r.reserved_until).toLocaleString()}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                r.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
              }`}>
                {r.status}
              </span>
              {r.status === 'active' && (
                <button onClick={() => handleRelease(r.id)}
                  className="bg-orange-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-orange-600">
                  Release
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}