'use client'
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useState } from 'react';

const localizer = momentLocalizer(moment);

const events = [
    { title: '09:00 - 10:00', start: new Date(2024, 11, 27, 9, 0), end: new Date(2024, 11, 27, 10, 0) },
    { title: '13:00 - 14:00', start: new Date(2024, 11, 27, 13, 0), end: new Date(2024, 11, 27, 14, 0) },
    { title: '09:00 - 10:00', start: new Date(2024, 11, 28, 9, 0), end: new Date(2024, 11, 28, 10, 0) },
    { title: '13:00 - 14:00', start: new Date(2024, 11, 28, 13, 0), end: new Date(2024, 11, 28, 14, 0) },
    { title: '13:00 - 14:00', start: new Date(2024, 11, 29, 13, 0), end: new Date(2024, 11, 29, 14, 0) },
    { title: '08:00 - 10:00', start: new Date(2024, 11, 1, 8, 0), end: new Date(2024, 11, 1, 10, 0) },
];

const BookingAvailability = () => {
    const [view, setView] = useState('month');

    return (
        <div style={{ padding: '20px', background: '#f8f9fb', borderRadius: '10px' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '10px' }}>Availability Calendar</h2>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 600, background: 'white', padding: '10px', borderRadius: '8px' }}
                views={['month']}
                defaultView={view}
                onView={(newView) => setView(newView)}
                eventPropGetter={() => ({ style: { backgroundColor: '#e3fcef', color: '#097969', borderRadius: '5px', padding: '2px' } })}
            />
        </div>
    );
};

export default BookingAvailability;
