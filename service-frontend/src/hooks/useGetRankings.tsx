import { useEffect, useState, useCallback } from "react";
import UserAPI from "../services/UserApi";
import { Errors } from "../errors/Errors";
import { ApiError } from "../services/GeneralApi";

interface UserRanking {
  id: string;
  lastname: string;
  firstname: string;
  totalpoints: string;
}

const userAPI = new UserAPI();

export default function useGetRankings(
  tourId: string | undefined,
  category: string
) {
  const [users, setUsers] = useState<UserRanking[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasFetched, setHasFetched] = useState<boolean>(false);
  const [fieldErrors, setFieldErrors] = useState<Errors>({});

  const getRanking = useCallback(async () => {
    if (!tourId || !category) return;

    setFieldErrors({});

    try {
      const data = await userAPI.getRanking(tourId, category);
      setUsers(data as UserRanking[]);
      setHasFetched(true);
    } catch (err: unknown) {
      const apiErr = err as ApiError;
      if (apiErr instanceof ApiError && apiErr.payload.fieldErrors) {
        setFieldErrors((prevErrors) => ({
          ...prevErrors,
          ...apiErr.payload.fieldErrors,
        }));
        setHasFetched(false);
      } else {
        setFieldErrors({
          general: "An unexpected error occurred while fetching rankings.",
        });
      }
    } finally {
      setIsLoading(false);
    }
  }, [tourId, category]);

  useEffect(() => {
    getRanking();
  }, [getRanking]);

  return {
    users,
    isLoading,
    hasFetched,
    fieldErrors,
    refetch: getRanking,
  };
}
