import React, { useState } from 'react';
import { Clock, UtensilsCrossed, MapPin } from 'lucide-react';
import { useFlightContext } from '../context/FlightContext';
import SeatSelection from './SeatSelection';

const FlightList = () => {
  const { flights } = useFlightContext();
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [showSeatSelection, setShowSeatSelection] = useState(false);

  const handleSelectFlight = (flight) => {
    setSelectedFlight(flight);
    setShowSeatSelection(true);
  };

  if (!flights.length) return null;

  return (
    <div className="space-y-6">
      {flights.map((flight) => (
        <div key={flight.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <img src={flight.airline.logo} alt={flight.airline.name} className="h-12 w-12 object-contain" />
                <div>
                  <h3 className="text-lg font-semibold">{flight.airline.name}</h3>
                  <p className="text-gray-500">Flight {flight.flightNumber}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-indigo-600">₹{flight.price}</p>
                <p className="text-sm text-gray-500">per person</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium">Duration</p>
                  <p className="text-gray-500">{flight.duration}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium">Stops</p>
                  <p className="text-gray-500">
                    {flight.stops === 0 ? 'Non-stop' : `${flight.stops} ${flight.stops === 1 ? 'stop' : 'stops'}`}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <UtensilsCrossed className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium">Meal Service</p>
                  <p className="text-gray-500">{flight.mealService ? 'Available' : 'Not available'}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-between items-center">
              <div className="flex space-x-6 text-sm text-gray-500">
                <div>
                  <p className="font-medium text-gray-900">{flight.departureTime}</p>
                  <p>{flight.origin}</p>
                </div>
                <div className="border-l pl-6">
                  <p className="font-medium text-gray-900">{flight.arrivalTime}</p>
                  <p>{flight.destination}</p>
                </div>
              </div>

              <button
                onClick={() => handleSelectFlight(flight)}
                className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Select Seats
              </button>
            </div>
          </div>
        </div>
      ))}

      {showSeatSelection && selectedFlight && (
        <SeatSelection
          flight={selectedFlight}
          onClose={() => setShowSeatSelection(false)}
        />
      )}
    </div>
  );
};

export default FlightList;