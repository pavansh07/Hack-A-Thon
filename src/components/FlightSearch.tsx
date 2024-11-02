import React, { useState } from 'react';
import { Calendar, MapPin } from 'lucide-react';
import DatePicker from './DatePicker';
import { useFlightContext } from '../context/FlightContext';

const INDIAN_CITIES = [
  { code: 'DEL', name: 'Delhi (DEL)' },
  { code: 'BOM', name: 'Mumbai (BOM)' },
  { code: 'BLR', name: 'Bangalore (BLR)' },
  { code: 'MAA', name: 'Chennai (MAA)' },
  { code: 'CCU', name: 'Kolkata (CCU)' },
  { code: 'HYD', name: 'Hyderabad (HYD)' },
  { code: 'PNQ', name: 'Pune (PNQ)' },
  { code: 'GOI', name: 'Goa (GOI)' },
  { code: 'JAI', name: 'Jaipur (JAI)' },
  { code: 'AMD', name: 'Ahmedabad (AMD)' }
];

const FlightSearch = () => {
  const { searchFlights } = useFlightContext();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showFromCities, setShowFromCities] = useState(false);
  const [showToCities, setShowToCities] = useState(false);
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    departDate: '',
    returnDate: '',
    passengers: 1,
    tripType: 'roundtrip'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    searchFlights(formData);
  };

  const handleCitySelect = (city: string, type: 'from' | 'to') => {
    setFormData({ ...formData, [type]: city });
    if (type === 'from') setShowFromCities(false);
    else setShowToCities(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">From</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                className="pl-10 w-full rounded-md border border-gray-300 py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Departure City"
                value={formData.from}
                onClick={() => setShowFromCities(true)}
                readOnly
              />
              {showFromCities && (
                <div className="absolute z-50 w-full mt-1 bg-white rounded-md shadow-lg max-h-60 overflow-auto">
                  {INDIAN_CITIES.map((city) => (
                    <button
                      key={city.code}
                      type="button"
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                      onClick={() => handleCitySelect(city.name, 'from')}
                    >
                      {city.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">To</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                className="pl-10 w-full rounded-md border border-gray-300 py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Arrival City"
                value={formData.to}
                onClick={() => setShowToCities(true)}
                readOnly
              />
              {showToCities && (
                <div className="absolute z-50 w-full mt-1 bg-white rounded-md shadow-lg max-h-60 overflow-auto">
                  {INDIAN_CITIES.map((city) => (
                    <button
                      key={city.code}
                      type="button"
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                      onClick={() => handleCitySelect(city.name, 'to')}
                    >
                      {city.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Trip Type</label>
            <select
              className="w-full rounded-md border border-gray-300 py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={formData.tripType}
              onChange={(e) => {
                setFormData({ 
                  ...formData, 
                  tripType: e.target.value,
                  returnDate: e.target.value === 'oneway' ? '' : formData.returnDate 
                });
              }}
            >
              <option value="roundtrip">Round Trip</option>
              <option value="oneway">One Way</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Dates</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                className="pl-10 w-full rounded-md border border-gray-300 py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                placeholder="Select dates"
                onClick={() => setShowDatePicker(!showDatePicker)}
                value={formData.departDate ? `${formData.departDate}${formData.returnDate ? ` - ${formData.returnDate}` : ''}` : ''}
                readOnly
              />
              {showDatePicker && (
                <DatePicker
                  onSelect={(start, end) => {
                    setFormData({ 
                      ...formData, 
                      departDate: start,
                      returnDate: formData.tripType === 'oneway' ? '' : end 
                    });
                    setShowDatePicker(false);
                  }}
                  onClose={() => setShowDatePicker(false)}
                  isRoundTrip={formData.tripType === 'roundtrip'}
                />
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Passengers</label>
            <input
              type="number"
              min="1"
              max="9"
              className="w-full rounded-md border border-gray-300 py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={formData.passengers}
              onChange={(e) => setFormData({ ...formData, passengers: parseInt(e.target.value) })}
            />
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white rounded-md py-2.5 px-4 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Search Flights
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FlightSearch;