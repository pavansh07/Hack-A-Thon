import React from 'react';
import { Calendar, Plane, Clock, UtensilsCrossed, MapPin } from 'lucide-react';
import FlightSearch from './components/FlightSearch';
import FlightList from './components/FlightList';
import { FlightProvider } from './context/FlightContext';

function App() {
  return (
    <FlightProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Plane className="h-8 w-8 text-indigo-600" />
              <h1 className="text-2xl font-bold text-gray-900">
                SkyWard Bound
              </h1>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <FlightSearch />
          <FlightList />
        </main>
      </div>
    </FlightProvider>
  );
}

export default App;
