import React, { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "@/config";
import { Dialog, DialogContent, DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
interface User {
  id: number;
  name: string;
  email: string;
  photo: string;
  course: string;
  department: string;
  batch: string;
  enroll?: string;
  phone?: string;
  linkdn?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
  emailVerified?: boolean;
  accountVerified?: boolean;
  isRejected?: boolean;
  phoneVarified?: boolean;
  createdAt?: Date;
}
enum AskedBy {
  User = "user",
  Admin = "admin",
}
interface UserCardProps {
  user: User;
  askedBy?: AskedBy;
}

const UserCard: React.FC<UserCardProps> = ({ user, askedBy = AskedBy.User }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [isVerified, setIsVerified] = useState(user.accountVerified);
  const [actionType, setActionType] = useState<"verify" | "unverify">(user.accountVerified ? "unverify" : "verify");

  const toggleCard = () => {
    setIsExpanded((prev) => !prev);
  };
  const handleConfirm = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/v1/admin/dashboard/verify-user?userId=${user.id}&verify=${actionType === "verify"}`,
        { withCredentials: true }
      );
  
      if (response.status === 200) {
        const newVerificationState = actionType === "verify";
        setIsVerified(newVerificationState);
        setActionType(newVerificationState ? "unverify" : "verify"); // Update button text dynamically
      }
    } catch (error) {
      console.error("Error verifying user:", error);
    }
  
    setShowDialog(false);
  };
  // const handleReject = async () => {
    
  //   console.log("Rejecting user...");
  // }
  
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

          {/* Social Links */}
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

          {/* Admin Actions */}
          {askedBy === AskedBy.Admin && (
            <>
            {user.phone &&(
              <div>
                <span className="font-medium text-gray-700">Batch:</span> {user.phone}
              </div>
            )}
              {isVerified ? (
                <div>
                  <p className="text-green-600">Verified by Admin</p>
                  <Button
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActionType("unverify");
                      setShowDialog(true);
                    }}
                  >
                    Unverify the user
                  </Button>
                </div>
              ) : (
                <div>
                <div>
                  <p className="text-red-600">User is not verified by Admin</p>
                  <Button
                    variant="default"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActionType("verify");
                      setShowDialog(true);
                    }}
                  >
                    Verify the user
                  </Button>
                </div>

                {/* <div>
                  <Button
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    Reject the aplication of the user
                  </Button>
                </div> */}
                </div>
              )}
            </>
          )}

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

      {/* Confirmation Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <h2 className="text-lg font-semibold">Confirm {actionType === "verify" ? "Verification" : "Unverification"}</h2>
          </DialogHeader>
          <p>
            {actionType === "verify"
              ? "Once a user is verified, their profile will be visible to other users and the public."
              : "If you unverify the user, their profile will no longer be publicly visible."}
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>
              Cancel
            </Button>
            <Button variant="default" onClick={handleConfirm}>
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserCard;
