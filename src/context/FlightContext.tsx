import React, { createContext, useContext, useState } from 'react';

const FlightContext = createContext(null);

export const useFlightContext = () => {
  const context = useContext(FlightContext);
  if (!context) {
    throw new Error('useFlightContext must be used within a FlightProvider');
  }
  return context;
};

export const FlightProvider = ({ children }) => {
  const [flights, setFlights] = useState([
    {
      id: 1,
      airline: {
        name: 'Air India',
        logo: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=50&h=50&fit=crop',
      },
      flightNumber: 'AI123',
      origin: 'Mumbai (BOM)',
      destination: 'Delhi (DEL)',
      departureTime: '10:00 AM',
      arrivalTime: '12:30 PM',
      duration: '2h 30m',
      price: 5499,
      stops: 0,
      mealService: true,
      meals: [
        {
          id: 'meal1',
          name: 'Vegetarian Thali',
          description: 'Traditional Indian thali with roti, dal, and sabzi',
          price: 450,
        },
        {
          id: 'meal2',
          name: 'Non-Veg Combo',
          description: 'Butter chicken with jeera rice and naan',
          price: 550,
        },
        {
          id: 'meal3',
          name: 'South Indian Special',
          description: 'Masala dosa with sambar and chutney',
          price: 400,
        },
      ],
    },
    {
      id: 2,
      airline: {
        name: 'IndiGo',
        logo: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=50&h=50&fit=crop',
      },
      flightNumber: '6E456',
      origin: 'Bangalore (BLR)',
      destination: 'Chennai (MAA)',
      departureTime: '14:15 PM',
      arrivalTime: '15:45 PM',
      duration: '1h 30m',
      price: 3299,
      stops: 0,
      mealService: true,
      meals: [
        {
          id: 'meal1',
          name: 'Veg Sandwich Combo',
          description: 'Grilled sandwich with chips and beverage',
          price: 350,
        },
        {
          id: 'meal2',
          name: 'Chicken Biryani',
          description: 'Hyderabadi style biryani with raita',
          price: 450,
        },
        {
          id: 'meal3',
          name: 'Snack Box',
          description: 'Assorted snacks with cookies and juice',
          price: 250,
        },
      ],
    },
    {
      id: 3,
      airline: {
        name: 'Vistara',
        logo: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=50&h=50&fit=crop',
      },
      flightNumber: 'UK789',
      origin: 'Kolkata (CCU)',
      destination: 'Hyderabad (HYD)',
      departureTime: '16:30 PM',
      arrivalTime: '19:15 PM',
      duration: '2h 45m',
      price: 6799,
      stops: 1,
      mealService: true,
      meals: [
        {
          id: 'meal1',
          name: 'Bengali Thali',
          description: 'Traditional Bengali meal with fish curry',
          price: 500,
        },
        {
          id: 'meal2',
          name: 'Vegetarian Special',
          description: 'Paneer butter masala with pulao',
          price: 450,
        },
        {
          id: 'meal3',
          name: 'Continental Box',
          description: 'Pasta with garlic bread and dessert',
          price: 400,
        },
      ],
    }
  ]);

  const searchFlights = (searchParams) => {
    // In a real application, this would make an API call
    console.log('Searching flights with params:', searchParams);
    // For now, we'll just use our mock data
  };

  return (
    <FlightContext.Provider value={{ flights, searchFlights }}>
      {children}
    </FlightContext.Provider>
  );
};