import React from 'react'
import Calendar from '../components/Calendar'
import Events from '../components/Events'
import GotoDate from '../components/GotoDate'

const CalendarPage = () => {
  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {/* <Calendar/> */}
        <div className='items-center justify-center'>
          <Calendar/>
          <GotoDate/>
        </div>
        <Events/>
      </div>
    </div>
  )
  
}

export default CalendarPage
