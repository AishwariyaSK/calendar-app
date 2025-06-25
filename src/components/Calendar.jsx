import React from 'react'
import { useContext, useState, useEffect } from 'react'
import { CalendarContext } from '../context/CalendarContext.jsx'
import {format, isEqual, startOfDay} from 'date-fns'



const Calendar = () => {
  const { today, curDate, curDay, curMonth, curYear, monthCalendar, weekDays, weekDaysShort, monthNames } = useContext(CalendarContext);
  const {  setCurDate, setCurDay, setCurMonth, setCurYear } = useContext(CalendarContext);
  const { eventData, setEventData } = useContext(CalendarContext);

  const [selectedDate, setSelectedDate] = useState(curDate);
  const [selectedMonth, setSelectedMonth] = useState(curMonth);
  const [selectedYear, setSelectedYear] = useState(curYear);
  
  const colStartClasses = [
    "",
    "col-start-2",
    "col-start-3",
    "col-start-4",
    "col-start-5",
    "col-start-6",
    "col-start-7",
  ];

  const countEvents=(date)=>{
    return eventData.filter(event => new Date(event.date).toDateString() === date.toDateString()).length;
  }

  const changePrevMonth=()=>{
    if(selectedMonth === 0){
      setSelectedDate(new Date(selectedYear-1, 11, 1))
    } else {
      setSelectedMonth(selectedMonth - 1);
      setSelectedDate(new Date(selectedYear, selectedMonth-1, 1))
    } 
  }

  const changeNextMonth=()=>{
    if(selectedMonth === 11){
      setSelectedDate(new Date(selectedYear+1, 0, 1))
    } else {
      setSelectedDate(new Date(selectedYear, selectedMonth+1, 1))
    }
  }

  const handleClick = (date) => {
    setSelectedDate(date);  
  }

  useEffect(() => {
    setCurDate(selectedDate);
    setSelectedMonth(selectedDate.getMonth());
    setSelectedYear(selectedDate.getFullYear());
  },[selectedDate])

  useEffect(()=>{
    setSelectedDate(curDate);
  },[curDate])


  return (
    <div className='m-5'>
        <h1 className="text-3xl font-bold text-center">Calendar</h1>
        <p className='text-center'>Today: {format(today, 'dd MMM yyyy')}</p>      
        <div className='max-w-120 m-2 mx-auto shadow-lg'>

            <div className='h-10 items-center grid grid-cols-[2fr_3fr_2fr] bg-blue-700 text-white'>
                <p className='text-center cursor-pointer' onClick={changePrevMonth}>◀️</p>
                <div className='flex justify-center gap-5'>
                    <p className='text-center font-bold'>{monthNames[selectedMonth]}</p>
                    <p className='text-center font-bold'>{selectedYear}</p>
                </div>
                <p className='text-center cursor-pointer' onClick={changeNextMonth}>▶️</p>
            </div>
            
            <div className="grid grid-cols-7 gap-2 items-center">
                {
                  monthCalendar && weekDaysShort.map((day,index)=>{
                    return (
                      <div key={index} className='h-10 pt-3 text-center font-bold'>
                        {day}
                      </div>
                    )
                  })
                }
                {
                  monthCalendar && monthCalendar.map((date, index)=>{
                    const count= countEvents(date);
                    return (
                      <div key={index} 
                      className={`relative h-10 w-10 mx-auto items-center text-center p-2 hover:bg-gray-200 
                        ${colStartClasses[date.getDay()]} 
                        ${isEqual(startOfDay(date),startOfDay(today)) ? 'bg-blue-700 text-white rounded' : ''}
                        ${isEqual(startOfDay(date),startOfDay(selectedDate)) ? 'bg-blue-300 rounded' : ''}`}
                      
                      onClick={()=>{handleClick(date)}}
                      >

                        {date && date.getDate()}
                        {count == 0 ? '' : <span className='absolute top-0 right-0 bg-orange-500 text-white text-xs rounded-full px-1 '>
                          {count}
                          </span>}
                      </div>
                    )
                  })
                }
            </div>
        </div>
    </div>
  )
}

export default Calendar
