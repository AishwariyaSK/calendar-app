import React from 'react'
import { useContext } from 'react'
import { CalendarContext } from '../context/CalendarContext.jsx'

const GotoDate = () => {
    const {curDate, setCurDate, curDay, curMonth, curYear} = useContext(CalendarContext);
  return (
    <div>
        <form >
            <div className='flex justify-center items-center gap-2 m-5 mt-10'>
                <div>
                    <label htmlFor="day"  className=' font-semibold text-gray-700 mr-2'>Day:</label>
                    <input
                    type="number"
                    id="day"
                    value={curDay}
                    onChange={(e) => setCurDate(new Date(curYear, curMonth, e.target.value))}
                    className='border border-gray-300 rounded-md px-3 py-1 w-28 text-center focus:outline-none focus:ring-2 focus:ring-blue-500 '

                    />
                </div>
                
                <div>
                    <label htmlFor="month" className='font-semibold text-gray-700 mr-2'>Month:</label>
                    <input
                    type="number"
                    id="month"
                    value={curMonth + 1} // +1 because months are 0-indexed
                    onChange={(e) => setCurDate(new Date(curYear, e.target.value - 1, curDay))}
                    className='border border-gray-300 rounded-md px-3 py-1 w-28 text-center focus:outline-none focus:ring-2 focus:ring-blue-500 '
                    />
                </div>
                
                <div>
                    <label htmlFor="year" className='font-semibold text-gray-700 mr-2'>Year:</label>
                    <input
                    type="number"
                    id="year"
                    value={curYear}
                    onChange={(e) => setCurDate(new Date(e.target.value, curMonth, curDay))}
                    className='border border-gray-300 rounded-md px-3 py-1 w-28 text-center focus:outline-none focus:ring-2 focus:ring-blue-500 '
                    />
                </div>    

            </div>
            <div className='flex justify-center items-center gap-5'>
                
                <button
                    type="button"
                    onClick={() => setCurDate(new Date())}
                    className='bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-500 cursor-pointer'
                >
                    Go to Today
                </button>
            </div>
        </form>
      

    </div>
  )
}

export default GotoDate
