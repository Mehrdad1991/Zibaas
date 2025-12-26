
import React, { useState } from 'react';
import SelectService from '../Booking/steps/SelectService';
import SelectTime from '../Booking/steps/SelectTime';
import UserInfo from '../Booking/steps/UserInfo';
import Payment from '../Booking/steps/Payment';
import Confirmation from '../Booking/steps/Confirmation';
import { Service } from '../types';

const BookingPage: React.FC<any> = ({ bookingStep, setBookingStep, onTabChange }) => {
  const [bookingData, setBookingData] = useState({
    service: null as Service | null,
    date: '',
    time: '',
    patientName: '',
    phone: '',
    notes: ''
  });

  const updateBookingData = (field: string, val: any) => {
    setBookingData(prev => ({ ...prev, [field]: val }));
  };

  switch (bookingStep) {
    case 1:
      return (
        <SelectService 
          selectedService={bookingData.service} 
          onSelect={(s) => updateBookingData('service', s)} 
          onNext={() => setBookingStep(2)} 
        />
      );
    case 2:
      return (
        <SelectTime 
          service={bookingData.service}
          selectedDate={bookingData.date}
          selectedTime={bookingData.time}
          onSelect={(d, t) => {
            updateBookingData('date', d);
            updateBookingData('time', t);
          }} 
          onNext={() => setBookingStep(3)} 
          onBack={() => setBookingStep(1)} 
        />
      );
    case 3:
      return (
        <UserInfo 
          data={bookingData} 
          onChange={(field, val) => updateBookingData(field, val)} 
          onNext={() => setBookingStep(4)} 
          onBack={() => setBookingStep(2)} 
        />
      );
    case 4:
      return (
        <Payment 
          booking={bookingData} 
          onConfirm={() => setBookingStep(5)} 
          onBack={() => setBookingStep(3)} 
        />
      );
    case 5:
      return <Confirmation onFinish={() => { onTabChange('dashboard'); setBookingStep(1); }} />;
    default:
      return null;
  }
};

export default BookingPage;
