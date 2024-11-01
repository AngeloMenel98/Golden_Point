import { useState, useEffect } from "react";

const HOUR_HALF = 1.5 * 60 * 60 * 1000; // 1.5 horas en milisegundos
const DAY = 24 * 60 * 60 * 1000; // 24 horas en milisegundos

function useIntervals(avFrom: string, avTo: string, courts: number) {
  const [intervalCount, setIntervalCount] = useState<number | null>(null);

  useEffect(() => {
    if (avFrom && avTo) {
      const from = new Date(avFrom).getTime();
      const to = new Date(avTo).getTime();

      if (from < to) {
        let count = 0;
        let currentFrom = from;

        while (currentFrom < to) {
          if (currentFrom + HOUR_HALF < to - DAY) {
            count++;
            currentFrom += HOUR_HALF;
          } else {
            currentFrom += DAY;
          }
        }

        setIntervalCount(count * 2 * courts);
      } else {
        setIntervalCount(null); // Reiniciar si las fechas no son válidas
      }
    }
  }, [avFrom, avTo, courts]);

  return intervalCount;
}

export default useIntervals;
