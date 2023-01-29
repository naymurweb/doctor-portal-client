import React, { useState } from 'react';
import AppointmentBanner from '../AppointmentBanner/AppointmentBanner';
import ServicesAvailable from '../ServicesAvailable/ServicesAvailable';

const Appointment = () => {
    const [selected, setSelected]=useState(new Date()) 
    return (
        <div>
            <AppointmentBanner selected={selected} setSelected={setSelected}></AppointmentBanner>
            <ServicesAvailable selected={selected}></ServicesAvailable>
        </div>
    );
};

export default Appointment;