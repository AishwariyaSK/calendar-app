import React from 'react'
import { createContext, useState, useEffect } from 'react'
import { compareAsc, format, eachWeekOfInterval, endOfMonth, startOfMonth, eachDayOfInterval, set } from "date-fns";
import { events } from '../assets/data';

export const CalendarContext = createContext()

const CalendarContextProvider = (props) => {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const weekDaysShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const [today, setToday] = useState(new Date())
    const [curDate, setCurDate] = useState(new Date())
    const [curDay, setCurDay] = useState(curDate.getDate())
    const [curMonth, setCurMonth] = useState(curDate.getMonth())
    const [curYear, setCurYear] = useState(curDate.getFullYear())
    const [monthCalendar, setMonthCalendar] = useState(null)
    const [eventData, setEventData] = useState([])



    useEffect(()=>{
        setToday(new Date())
        const startOfCurrentMonth = startOfMonth(today);
        const endOfCurrentMonth = endOfMonth(today);
        const result = eachDayOfInterval({
          start: startOfCurrentMonth,
          end: endOfCurrentMonth
        })
        setMonthCalendar(result)
        setEventData(events)

    },[])

    useEffect(()=>{
        setCurDay(curDate.getDate())
        setCurMonth(curDate.getMonth())
        setCurYear(curDate.getFullYear())

    },[curDate])

    useEffect(()=>{
        const temp= new Date(curYear, curMonth, 1);
        const startOfCurrentMonth = startOfMonth(temp);
        const endOfCurrentMonth = endOfMonth(temp);
        const result = eachDayOfInterval({
          start: startOfCurrentMonth,
          end: endOfCurrentMonth
        })
        setMonthCalendar(result)

    },[curMonth, curYear])


    const value={
        today, setToday,
        curDate, setCurDate,
        curDay, setCurDay,
        curMonth, setCurMonth,
        curYear, setCurYear,
        monthNames, 
        weekDays,
        weekDaysShort,
        monthCalendar, setMonthCalendar,
        eventData, setEventData,
    }

    return (
        <CalendarContext.Provider value={value}>
            {props.children}
        </CalendarContext.Provider>
    )
}

export default CalendarContextProvider;
