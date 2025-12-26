
import React from 'react';
import RoomRental from '../components/RoomRental';
import RoomDetail from '../components/RoomDetail';
import { UserRole } from '../types';

const RentalPage: React.FC<any> = ({ user, onViewRoomDetail, selectedRoom, selectedClinic, onTabChange }) => {
  if (selectedRoom && selectedClinic) {
    return <RoomDetail room={selectedRoom} clinic={selectedClinic} onBack={() => onTabChange('rental')} onBook={() => {}} />;
  }
  return <RoomRental onViewRoomDetail={onViewRoomDetail} userRole={user?.role || UserRole.CUSTOMER} isVerified={true} />;
};

export default RentalPage;
