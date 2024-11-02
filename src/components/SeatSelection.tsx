import React, { useState } from 'react';
import { X } from 'lucide-react';

const SeatSelection = ({ flight, onClose, passengers = 1 }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedMeals, setSelectedMeals] = useState(Array(passengers).fill(''));

  const rows = 10;
  const seatsPerRow = 6;
  const occupiedSeats = new Set(['1A', '3C', '5F', '7B']); // Example occupied seats

  const getSeatLabel = (row, seat) => {
    return `${row}${String.fromCharCode(65 + seat)}`;
  };

  const handleSeatClick = (seatLabel) => {
    if (occupiedSeats.has(seatLabel)) return;
    
    if (selectedSeats.includes(seatLabel)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seatLabel));
    } else if (selectedSeats.length < passengers) {
      setSelectedSeats([...selectedSeats, seatLabel]);
    }
  };

  const handleMealSelection = (mealId, passengerIndex) => {
    const newMeals = [...selectedMeals];
    newMeals[passengerIndex] = mealId;
    setSelectedMeals(newMeals);
  };

  const canProceed = selectedSeats.length === passengers && 
                     selectedMeals.every(meal => meal !== '');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Select Your Seats</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Seat Map</h3>
            <p className="text-sm text-gray-500 mb-2">
              Select {passengers} seat{passengers > 1 ? 's' : ''}
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-center mb-4">
                <div className="bg-indigo-600 w-20 h-8 rounded-t-lg flex items-center justify-center text-white">
                  Cockpit
                </div>
              </div>
              
              <div className="grid gap-2">
                {Array.from({ length: rows }, (_, row) => (
                  <div key={row} className="flex justify-center gap-2">
                    {Array.from({ length: seatsPerRow }, (_, seat) => {
                      const seatLabel = getSeatLabel(row + 1, seat);
                      const isSelected = selectedSeats.includes(seatLabel);
                      const isOccupied = occupiedSeats.has(seatLabel);
                      
                      return (
                        <button
                          key={seat}
                          onClick={() => handleSeatClick(seatLabel)}
                          disabled={isOccupied || (!isSelected && selectedSeats.length >= passengers)}
                          className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm
                            ${isOccupied ? 'bg-gray-300 cursor-not-allowed' : ''}
                            ${isSelected ? 'bg-indigo-600 text-white' : ''}
                            ${!isOccupied && !isSelected ? 'bg-white border border-gray-300 hover:border-indigo-500' : ''}
                            ${(!isSelected && selectedSeats.length >= passengers) ? 'cursor-not-allowed opacity-50' : ''}
                          `}
                        >
                          {seatLabel}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Meal Selection</h3>
            {Array.from({ length: passengers }).map((_, index) => (
              <div key={index} className="mb-6">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Passenger {index + 1} - Seat {selectedSeats[index] || 'Not selected'}
                </p>
                <div className="space-y-2">
                  {flight.meals?.map((meal) => (
                    <label key={meal.id} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                      <input
                        type="radio"
                        name={`meal-${index}`}
                        value={meal.id}
                        checked={selectedMeals[index] === meal.id}
                        onChange={() => handleMealSelection(meal.id, index)}
                        className="h-4 w-4 text-indigo-600"
                      />
                      <div className="flex-1">
                        <p className="font-medium">{meal.name}</p>
                        <p className="text-sm text-gray-500">{meal.description}</p>
                      </div>
                      <p className="text-indigo-600 font-medium">₹{meal.price}</p>
                    </label>
                  ))}
                </div>
              </div>
            ))}

            <button
              onClick={() => {
                // Handle booking confirmation
                onClose();
              }}
              disabled={!canProceed}
              className={`w-full mt-6 py-3 rounded-lg
                ${canProceed 
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
            >
              {canProceed ? 'Confirm Selection' : 'Please complete selection'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;