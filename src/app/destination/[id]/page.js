'use client';
import { useEffect, useState } from 'react';
import React from 'react';

export default function DestinationDetails({ params: paramsPromise }) {
  const [cdestination, setCDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Unwrap params using React.use()
  const params = React.use(paramsPromise); // Use React.use() to unwrap params
  const { id } = params; // Extract the `id` from unwrapped params

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/cdestination/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch destination data');
        }
        const data = await response.json();
       

        // Set state for the dataset if data is available
        if (data) {
          setCDestination(data);
        } else {
          setError('Destination not found');
        }

      } catch (error) {
       
        setError('Error fetching data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <p className="text-center text-xl">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-xl text-red-500">{error}</p>;
  }

  if (!cdestination) {
    return <p className="text-center text-xl text-red-500">Destination not found.</p>;
  }

  return (
    <div className="container mx-auto px-6 py-12 text-black">
      {/* Main Destination */}
      <h1 className="text-4xl bg-center bg-cover  font-bold mb-6">{cdestination.name || cdestination.title}</h1>
      <img
        src={cdestination.image}
        alt={cdestination.name}
        className="w-full h-96 object-cover rounded-lg mb-8 "
      />
      <p className="text-lg text-gray-700">{cdestination.description || 'No description available'}</p>
    </div>
  );
}
