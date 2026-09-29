interface UserCardProps {
  username: string;
  fullName?: string;
  avatar?: string;
  onClick: () => void;
  isParticipating?: boolean;
}

export function UserCard({
  username,
  fullName,
  avatar,
  onClick,
  isParticipating,
}: UserCardProps) {
  return (
    <button
      onClick={onClick}
      className="
        w-full text-left p-4 bg-white rounded-lg border border-gp-gray-light/50
        hover:shadow-lg hover:border-gp-pastel/50 hover:-translate-y-0.5
        transition-all duration-200 ease-out
        focus:outline-none focus:ring-2 focus:ring-gp-pastel focus:ring-offset-2
      "
      aria-label={`Ver estadísticas de ${username}`}
    >
      <div className="flex items-center gap-3">
        {/* Avatar placeholder */}
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gp-pastel/30 flex items-center justify-center">
          {avatar ? (
            <img
              src={avatar}
              alt={`Avatar de ${username}`}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <span className="text-gp-dark font-semibold text-sm">
              {username.charAt(0).toUpperCase()}
            </span>
          )}
        </div>

        {/* User info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="font-medium text-gp-dark truncate">
              {fullName || username}
            </p>
            {/* Status dot - green for participating, red for not */}
            {isParticipating !== undefined && (
              <span
                className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                  isParticipating ? "bg-[#22c55e]" : "bg-[#ef4444]"
                }`}
                title={
                  isParticipating
                    ? "Inscrito en el torneo"
                    : "No inscrito en el torneo"
                }
              />
            )}
          </div>
          <p className="text-sm text-gp-gray truncate">@{username}</p>
        </div>

        {/* Arrow indicator */}
        <div className="flex-shrink-0 text-gp-gray/50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </button>
  );
}
