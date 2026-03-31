'use client';

import { useState } from 'react';
import { UserCard } from '@/components/users/UserCard';
import { UserStatsDrawer } from '@/components/users/UserStatsDrawer';

interface UserData {
  id: string;
  username: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
}

interface UsersListProps {
  users: UserData[];
  tournamentId: string;
  tournamentName: string;
}

interface SelectedUser {
  userId: string;
  username: string;
  fullName?: string;
}

export function UsersList({
  users,
  tournamentId,
  tournamentName,
}: UsersListProps) {
  const [selectedUser, setSelectedUser] = useState<SelectedUser | null>(null);

  const handleUserClick = (user: UserData) => {
    setSelectedUser({
      userId: user.id,
      username: user.username,
      fullName: user.fullName || user.firstName || user.username,
    });
  };

  const handleCloseDrawer = () => {
    setSelectedUser(null);
  };

  if (users.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-gp-light/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-gp-gray"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </div>
        <p className="text-gp-gray">No hay participantes en este torneo</p>
      </div>
    );
  }

  return (
    <>
      {/* Grid layout: 3 columns desktop, 2 tablet, 1 mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user) => (
          <UserCard
            key={user.id}
            username={user.username}
            fullName={user.fullName || user.firstName || user.username}
            onClick={() => handleUserClick(user)}
          />
        ))}
      </div>

      {/* User Stats Drawer */}
      {selectedUser && (
        <UserStatsDrawer
          isOpen={!!selectedUser}
          onClose={handleCloseDrawer}
          userId={selectedUser.userId}
          username={selectedUser.username}
          fullName={selectedUser.fullName}
          tournamentId={tournamentId}
          tournamentName={tournamentName}
        />
      )}
    </>
  );
}