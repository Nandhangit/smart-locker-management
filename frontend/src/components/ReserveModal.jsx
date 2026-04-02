import { useState } from 'react';
import api from '../api/axios';

export default function ReserveModal({ locker, onClose }) {
  const [reservedUntil, setReservedUntil] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api.post('/reservations/', {
        locker_id: locker.id,
        reserved_until: reservedUntil,
      });
      onClose();
    } catch (err) {
      setError(err.response?.data?.non_field_errors?.[0] || 'Failed to reserve');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Reserve Locker #{locker.locker_number}</h2>
        <p className="text-sm text-gray-500 mb-4">📍 {locker.location}</p>
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Reserve Until</label>
            <input
              type="datetime-local" required
              className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={reservedUntil}
              onChange={e => setReservedUntil(e.target.value)}
            />
          </div>
          <div className="flex gap-3">
            <button type="submit" className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold">
              Confirm Reservation
            </button>
            <button type="button" onClick={onClose}
              className="flex-1 border border-gray-300 py-3 rounded-lg hover:bg-gray-50">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}