import React, { useEffect, useState } from "react";
import socket from "../socket";

const SeatLockTimer = ({
  lockedExpiry,
  id,
}: {
  lockedExpiry: number | null;
  id: number;
}) => {
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  useEffect(() => {
    if (lockedExpiry) {
      const interval = setInterval(() => {
        const newTimeLeft = lockedExpiry - Date.now();
        if (newTimeLeft <= 0) {
          clearInterval(interval);
          setTimeLeft(null);
          socket.emit("seat:unlock", { seatId: id });
        } else {
          setTimeLeft(newTimeLeft);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [lockedExpiry]);

  return (
    <div>
      {timeLeft !== null ? `${Math.ceil(timeLeft / 1000)}s` : "Not locked"}
    </div>
  );
};

export default SeatLockTimer;
