import React, { useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  photo?: string;
  course?: string;
  department?: string;
  batch?: string;
  enroll?: string;
  phone?: string;
  linkdn?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
}

interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleCard = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div
      onClick={toggleCard}
      className={`bg-white shadow-lg rounded-lg p-4 border border-gray-200 transition-all duration-300 cursor-pointer ${
        isExpanded ? "max-w-lg" : "max-w-xs"
      }`}
    >
      {/* Photo and Name */}
      <div className="flex items-center">
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

        <div className="ml-4">
          <h2 className="text-lg font-semibold text-gray-800">{user.name}</h2>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="mt-4 space-y-2">
          {user.email && (
            <p>
              <span className="font-medium text-gray-700">Email:</span> {user.email}
            </p>
          )}
          {user.enroll && (
            <p>
              <span className="font-medium text-gray-700">Enrollment:</span> {user.enroll}
            </p>
          )}
          {user.phone && (
            <p>
              <span className="font-medium text-gray-700">Phone:</span> {user.phone}
            </p>
          )}
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
          <div className="space-y-1">
            {user.linkdn && (
              <a
                href={user.linkdn}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-blue-600 hover:underline"
              >
                LinkedIn
              </a>
            )}
            {user.twitter && (
              <a
                href={user.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-blue-400 hover:underline"
              >
                Twitter
              </a>
            )}
            {user.facebook && (
              <a
                href={user.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-blue-700 hover:underline"
              >
                Facebook
              </a>
            )}
            {user.instagram && (
              <a
                href={user.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-pink-500 hover:underline"
              >
                Instagram
              </a>
            )}
          </div>

          {/* Show Less Button */}
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent card click from toggling back
              setIsExpanded(false);
            }}
            className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none transition-colors"
          >
            Show Less
          </button>
        </div>
      )}
    </div>
  );
};

export default UserCard;
