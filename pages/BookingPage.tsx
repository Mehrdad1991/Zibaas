
import React from 'react';
import UnifiedBooking from '../components/UnifiedBooking';

const BookingPage: React.FC<any> = ({ onSelectClinic, onSelectTech }) => {
  return <UnifiedBooking onSelectClinic={onSelectClinic} onSelectTech={onSelectTech} />;
};

export default BookingPage;
