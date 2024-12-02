import { useState } from "react";
import { CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export default function Calendar({theme,timeRange,setTimeRange,dateRange,setDateRange}) {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 8, 1)); // September 1, 2024
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const getDaysInMonth = (year:number, month:number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year:number, month:number) => new Date(year, month, 1).getDay();

  const isDateInRange = (date: Date, start: Date | null, end: Date | null) => {
    if (!start || !end) return false;
    return date >= start && date <= end;
  };

  const renderCalendar = (monthOffset = 0) => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + monthOffset;
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);
    const days = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="text-center p-2"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);

      const isSelected = isDateInRange(date, dateRange.start, dateRange.end);
      const isStart = dateRange.start && date.toDateString() === dateRange.start.toDateString();
      const isEnd = dateRange.end && date.toDateString() === dateRange.end.toDateString();
      const isFirstInWeek = (firstDayOfMonth + day - 1) % 7 === 0;
      const isLastInWeek = (firstDayOfMonth + day) % 7 === 0;
      const isFirstInMonth = day === 1;
      const isLastInMonth = day === daysInMonth;

      let className = 'text-center p-1 w-8 h-8 text-sm font-medium ';

      if (isSelected) {
        className += 'bg-gray-100 ';
        if (isStart || isFirstInWeek || isFirstInMonth) className += 'rounded-l-full ';
        if (isEnd || isLastInWeek || isLastInMonth) className += 'rounded-r-full ';
      }

      if (isStart || isEnd) {
        className += 'bg-[#0A0908] text-white rounded-l-lg rounded-r-lg relative z-10 ';
      }

      if (date.getMonth() !== month) {
        className += 'text-gray-300 ';
      }

      days.push(
        <button
          key={day}
          onClick={() => handleDateClick(date)}
          className={className}
        >
          {day}
        </button>
      );
    }

    return (
      <div>
        <div className="grid grid-cols-7 gap-1">
          {DAYS.map(day => (
            <div key={day} className="text-center font-medium text-sm text-gray-500 mb-2">{day}</div>
          ))}
          {days}
        </div>
      </div>
    );
  };

  const handleDateClick = (date: Date) => {
    if (!dateRange.start || (dateRange.start && dateRange.end)) {
      setDateRange({ start: date, end: null });
    } else {
      const start = dateRange.start;
      const end = date;
      setDateRange({
        start: start < end ? start : end,
        end: start < end ? end : start,
      });
    }
    setTimeRange('custom')
  };

  const handlePrevMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };
  return (
    <>
      <div className={`text-black relative inline-block text-left `}>
        <button
          type="button"
          className={`inline-flex justify-center w-56 rounded-md border shadow-sm px-4 py-2  text-sm font-medium   focus:outline-none ${timeRange === "custom" 
                                    ? 'bg-teal-500 text-white' 
                                    : ` ${theme === 'dark' ? " text-white " :" text-gray-700 " }  border border-gray-300 hover:bg-teal-50 `
        }`}
          onClick={() => setIsCalendarOpen(!isCalendarOpen)}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          <span>
                {dateRange.start?.toLocaleDateString()}
                {!dateRange.start ? "Select date range" :" - "}
                {dateRange.end?.toLocaleDateString()}
          </span>
        </button>

        <div className={`absolute bottom-[230px] -left-[93%] w-[500px] h-[150px] transition-opacity duration-300 transform -translate-x-16  ${
            isCalendarOpen ? 'opacity-100 ' : 'opacity-0 pointer-events-none'
          }`}>
          <div className={` w-full mx-auto bg-white shadow-2xl rounded-lg overflow-hidden`}>
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <button onClick={handlePrevMonth} className="p-2 rounded-full hover:bg-gray-100">
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <div className="text-xl font-semibold">
                  {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()} - {MONTHS[(currentDate.getMonth() + 1) % 12]} {currentDate.getMonth() === 11 ? currentDate.getFullYear() + 1 : currentDate.getFullYear()}
                </div>
                <button onClick={handleNextMonth} className="p-2 rounded-full hover:bg-gray-100">
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-8">
                {renderCalendar()}
                {renderCalendar(1)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}