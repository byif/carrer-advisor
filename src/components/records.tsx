import React, { useEffect, useState } from 'react';

const Records = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/records')
      .then(res => res.json())
      .then(data => setRecords(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Uploaded Resume Records</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
          <thead className="bg-blue-100 text-blue-900">
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Filename</th>
              <th className="py-2 px-4 border-b">Predicted Career</th>
              <th className="py-2 px-4 border-b">Score</th>
              <th className="py-2 px-4 border-b">Uploaded At</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record: any) => (
              <tr key={record.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b text-center">{record.id}</td>
                <td className="py-2 px-4 border-b">{record.filename}</td>
                <td className="py-2 px-4 border-b">{record.predicted_career}</td>
                <td className="py-2 px-4 border-b text-center">{record.score}</td>
                <td className="py-2 px-4 border-b">{record.uploaded_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Records;
