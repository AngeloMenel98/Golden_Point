"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home } from "lucide-react";
import { useTournament } from "@/context/TournamentContext";

interface BreadcrumbItem {
  label: string;
  href: string | null;
  isCurrent: boolean;
}

export default function BreadcrumbNav() {
  const pathname = usePathname();
  const { currentTournament } = useTournament();

  // Parse the pathname into segments
  const segments = pathname.split("/").filter(Boolean);

  // Don't render on home page
  if (segments.length === 0 || (segments.length === 1 && segments[0] === "")) {
    return null;
  }

  // Build breadcrumb items based on path
  const breadcrumbs: BreadcrumbItem[] = [];

  // Always start with Home
  let currentPath = "";

  // Determine the breadcrumb structure based on the path
  const firstSegment = segments[0];

  if (firstSegment === "tours") {
    // /tours or /tours/[id]
    breadcrumbs.push({
      label: "Tours",
      href: "/tours",
      isCurrent: segments.length === 1,
    });

    if (segments[1]) {
      // /tours/[id] - show tournament name (or ID as fallback)
      const tourId = segments[1];
      const isTournamentDetail = segments[2] === "tournaments" && segments[3];

      if (isTournamentDetail) {
        // /tours/[id]/tournaments/[tournamentId] -> show tournament detail
        breadcrumbs.push({
          label: "Torneos",
          href: `/tours/${tourId}/tournaments`,
          isCurrent: segments.length === 3,
        });

        const tournamentId = segments[3];
        const tournamentName =
          currentTournament?.id === tournamentId
            ? currentTournament.name
            : `Tournament ${tournamentId}`;

        // Add the specific tournament
        breadcrumbs.push({
          label: tournamentName,
          href: null,
          isCurrent: true,
        });
      } else if (segments[2]) {
        // /tours/[id]/something
        breadcrumbs.push({
          label: segments[2].charAt(0).toUpperCase() + segments[2].slice(1),
          href: null,
          isCurrent: true,
        });
      } else {
        // Just /tours/[id]
        breadcrumbs[0] = { ...breadcrumbs[0], isCurrent: true, href: null };
      }
    }
  } else if (firstSegment === "tournaments") {
    // /tournaments or /tournaments/[id]
    breadcrumbs.push({ label: "Tours", href: "/tours", isCurrent: false });
    breadcrumbs.push({
      label: "Torneos",
      href: "/tournaments",
      isCurrent: segments.length === 1,
    });

    if (segments[1]) {
      // /tournaments/[id] - could be tournament detail or matches
      const tournamentId = segments[1];
      const tournamentName =
        currentTournament?.id === tournamentId
          ? currentTournament.name
          : `Tournament ${tournamentId}`;

      if (segments[2] === "matches") {
        // /tournaments/[id]/matches
        breadcrumbs.push({
          label: tournamentName,
          href: `/tournaments/${tournamentId}`,
          isCurrent: false,
        });
        breadcrumbs.push({
          label: "Partidos",
          href: null,
          isCurrent: true,
        });
      } else if (segments[2] === "users") {
        // /tournaments/[id]/users
        breadcrumbs.push({
          label: tournamentName,
          href: `/tournaments/${tournamentId}`,
          isCurrent: false,
        });
        breadcrumbs.push({
          label: "Participantes",
          href: null,
          isCurrent: true,
        });
      } else {
        // /tournaments/[id] - tournament detail
        breadcrumbs.push({
          label: tournamentName,
          href: null,
          isCurrent: true,
        });
      }
    }
  } else {
    // For any other routes, build from segments
    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i];
      currentPath += `/${segment}`;

      const isLast = i === segments.length - 1;

      // Format label - capitalize and replace dashes
      const label = segment
        .replace(/-/g, " ")
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      // Try to detect IDs (UUIDs or numeric IDs)
      const isId =
        /^[0-9]+$/.test(segment) || /^[a-f0-9-]{36,}$/i.test(segment);
      const displayLabel = isId ? `ID: ${segment.substring(0, 8)}` : label;

      breadcrumbs.push({
        label: displayLabel,
        href: isLast ? null : currentPath,
        isCurrent: isLast,
      });
    }
  }

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm">
      {/* Home link */}
      <Link
        href="/"
        className="text-gp-pastel hover:text-gp-dark transition-colors flex items-center gap-1"
        title="Home"
      >
        <Home className="w-4 h-4" />
      </Link>

      {breadcrumbs.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <span className="text-gp-gray" aria-hidden="true">
            &gt;
          </span>
          {item.href ? (
            <Link
              href={item.href}
              className="text-gp-pastel hover:text-gp-dark transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-gp-dark font-medium" aria-current="page">
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
}
