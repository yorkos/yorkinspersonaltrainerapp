import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import React, { useEffect, useState } from 'react';

function CalendarView() {

    const localizer = momentLocalizer(moment)

    const [trainings, setTrainings] = useState([]);

    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
            .then(response => response.json())
            .then(data => setTrainings(data))
            .catch(err => console.error(err))
    }

    useEffect(() => {
        fetchTrainings();
    }, []);

    let reformattedArray = trainings.map(obj => {
        let rObj = {}
        rObj["startTime"] = moment.utc(obj.date).toDate();
        rObj["endTime"] = moment(obj.date).add(obj.duration, 'm').toDate();
        if (obj.customer.firstname && obj.customer.lastname) {
            rObj["title"] = obj.activity + ' ' + obj.customer.firstname + ' ' + obj.customer.lastname;
        }
        return rObj
    })

    return (
        <div style={{ height: 700 }}>
            <Calendar
                localizer={localizer}
                events={reformattedArray}
                startAccessor="startTime"
                endAccessor="endTime"
            />
        </div>
    )
}

export default CalendarView;