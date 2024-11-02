import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const DatePicker = ({ onSelect, onClose, isRoundTrip }) => {
  const [selectedDates, setSelectedDates] = useState({ start: null, end: null });
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    return { daysInMonth, firstDayOfMonth };
  };

  const handleDateClick = (date) => {
    if (!selectedDates.start || (selectedDates.start && selectedDates.end)) {
      setSelectedDates({ start: date, end: null });
      if (!isRoundTrip) {
        onSelect(date.toLocaleDateString(), null);
        onClose();
      }
    } else {
      if (isRoundTrip) {
        if (date < selectedDates.start) {
          setSelectedDates({ start: date, end: selectedDates.start });
          onSelect(date.toLocaleDateString(), selectedDates.start.toLocaleDateString());
        } else {
          setSelectedDates({ ...selectedDates, end: date });
          onSelect(selectedDates.start.toLocaleDateString(), date.toLocaleDateString());
        }
      }
    }
  };

  const renderCalendar = () => {
    const { daysInMonth, firstDayOfMonth } = getDaysInMonth(currentMonth);
    const days = [];
    
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-10" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const isSelected = selectedDates.start && date.getTime() === selectedDates.start.getTime() ||
                        selectedDates.end && date.getTime() === selectedDates.end.getTime();
      const isInRange = selectedDates.start && selectedDates.end &&
                       date > selectedDates.start && date < selectedDates.end;

      days.push(
        <button
          key={day}
          onClick={() => handleDateClick(date)}
          className={`h-10 w-10 rounded-full flex items-center justify-center
            ${isSelected ? 'bg-indigo-600 text-white' : ''}
            ${isInRange ? 'bg-indigo-100' : ''}
            ${!isSelected && !isInRange ? 'hover:bg-gray-100' : ''}
          `}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  return (
    <div className="absolute top-full mt-2 bg-white rounded-lg shadow-lg p-4 z-50">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)))}
          className="p-1 hover:bg-gray-100 rounded-full"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <h3 className="font-medium">
          {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h3>
        <button
          onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)))}
          className="p-1 hover:bg-gray-100 rounded-full"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
          <div key={day} className="h-10 flex items-center justify-center text-sm font-medium text-gray-500">
            {day}
          </div>
        ))}
        {renderCalendar()}
      </div>
      {isRoundTrip && (
        <p className="text-sm text-gray-500 mt-2">
          {!selectedDates.start ? 'Select departure date' : 'Select return date'}
        </p>
      )}
    </div>
  );
};

export default DatePicker;