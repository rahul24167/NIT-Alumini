// src/components/UserCard.tsx
import React from "react";

interface User {
  id: number;
  name: string;
  email: string;
  photo?: string;
  course?: string;
  department?: string;
  batch?: string;
}

interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 max-w-md border border-gray-200">
      <div className="flex items-center">
        {/* Photo Section */}
        <div className="w-16 h-16 overflow-hidden rounded-full bg-gray-100">
          {user.photo ? (
            <img
              src={user.photo}
              alt={`${user.name}'s profile`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              No Photo
            </div>
          )}
        </div>

        {/* Name and Email */}
        <div className="ml-4">
          <h2 className="text-lg font-semibold text-gray-800">{user.name}</h2>
          <p className="text-sm text-gray-600">{user.email}</p>
        </div>
      </div>

      {/* Additional Info */}
      <div className="mt-4 space-y-2">
        {user.course && (
          <p>
            <span className="font-medium text-gray-700">Course:</span> {user.course}
          </p>
        )}
        {user.department && (
          <p>
            <span className="font-medium text-gray-700">Department:</span> {user.department}
          </p>
        )}
        {user.batch && (
          <p>
            <span className="font-medium text-gray-700">Batch:</span> {user.batch}
          </p>
        )}
      </div>
    </div>
  );
};

export default UserCard;
