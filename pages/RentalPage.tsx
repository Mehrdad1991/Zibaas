
import React from 'react';
import RoomRental from '../components/RoomRental';
import RoomDetail from '../components/RoomDetail';
import { Role } from '../store/roles';

const RentalPage: React.FC<any> = ({ user, onViewRoomDetail, selectedRoom, selectedClinic, onTabChange }) => {
  if (selectedRoom && selectedClinic) {
    return <RoomDetail room={selectedRoom} clinic={selectedClinic} onBack={() => onTabChange('rental')} onBook={() => {}} />;
  }
  return <RoomRental onViewRoomDetail={onViewRoomDetail} userRole={user?.role} isVerified={user?.userId ? true : false} />;
};

export default RentalPage;
