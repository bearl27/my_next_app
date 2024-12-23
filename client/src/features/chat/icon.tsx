import React from 'react';
import Image from 'next/image';

interface UserInfoProps {
  userName: string;
  avatarUrl: string;
  isSelf: boolean;
}

const UserInfo: React.FC<UserInfoProps> = ({ userName, avatarUrl, isSelf }) => {
  return (
    <div className={`flex items-center ${isSelf ? 'flex-row-reverse' : 'flex-row'} mb-1`}>
      <Image
        src={avatarUrl}
        alt={`${userName}'s avatar`}
        width={24}
        height={24}
        className="rounded-full"
      />
      <span className={`text-sm text-gray-600 ${isSelf ? 'mr-2' : 'ml-2'}`}>{userName}</span>
    </div>
  );
};

export default UserInfo;