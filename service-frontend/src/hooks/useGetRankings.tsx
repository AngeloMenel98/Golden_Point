import { useEffect, useState, useCallback } from "react";
import UserAPI from "../services/UserApi";
import { Errors } from "../errors/Errors";

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
      const res = await userAPI.getRanking(tourId, category);

      if (res.fieldErrors) {
        setFieldErrors((prevErrors) => ({
          ...prevErrors,
          ...res.fieldErrors,
        }));

        setHasFetched(false);
        return;
      } else {
        setUsers(res);
      }

      setHasFetched(true);
      setIsLoading(false);
    } catch (error) {
      setFieldErrors({
        general: "An unexpected error occurred while fetching rankings.",
      });
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
