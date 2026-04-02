import { useEffect, useState } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import ReserveModal from '../components/ReserveModal';

export default function Lockers() {
  const [lockers, setLockers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [newLocker, setNewLocker] = useState({ locker_number: '', location: '' });
  const { user } = useAuth();

  const fetchLockers = async () => {
    const res = await api.get('/lockers/');
    setLockers(res.data);
  };

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { fetchLockers(); }, []);

  const statusColor = {
    available: 'bg-green-100 text-green-700',
    reserved: 'bg-yellow-100 text-yellow-700',
    inactive: 'bg-gray-100 text-gray-500',
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    await api.post('/lockers/', newLocker);
    setShowForm(false);
    setNewLocker({ locker_number: '', location: '' });
    fetchLockers();
  };

  const handleDelete = async (id) => {
    await api.delete(`/lockers/${id}/`);
    fetchLockers();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">All Lockers</h1>
        {user?.role === 'admin' && (
          <button onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            + Add Locker
          </button>
        )}
      </div>

      {showForm && (
        <form onSubmit={handleCreate} className="bg-white p-4 rounded-xl shadow mb-6 flex gap-4">
          <input placeholder="Locker Number" required value={newLocker.locker_number}
            onChange={e => setNewLocker({ ...newLocker, locker_number: e.target.value })}
            className="border p-2 rounded flex-1" />
          <input placeholder="Location" required value={newLocker.location}
            onChange={e => setNewLocker({ ...newLocker, location: e.target.value })}
            className="border p-2 rounded flex-1" />
          <button type="submit" className="bg-green-600 text-white px-4 rounded hover:bg-green-700">Create</button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {lockers.map(locker => (
          <div key={locker.id} className="bg-white p-5 rounded-xl shadow hover:shadow-md transition">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold text-gray-800">#{locker.locker_number}</h3>
                <p className="text-gray-500 text-sm mt-1">📍 {locker.location}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColor[locker.status]}`}>
                {locker.status}
              </span>
            </div>
            <div className="mt-4 flex gap-2">
              {locker.status === 'available' && user?.role === 'user' && (
                <button onClick={() => setSelected(locker)}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm hover:bg-blue-700">
                  Reserve
                </button>
              )}
              {user?.role === 'admin' && locker.status !== 'inactive' && (
                <button onClick={() => handleDelete(locker.id)}
                  className="flex-1 bg-red-500 text-white py-2 rounded-lg text-sm hover:bg-red-600">
                  Deactivate
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <ReserveModal locker={selected} onClose={() => { setSelected(null); fetchLockers(); }} />
      )}
    </div>
  );
}