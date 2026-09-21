import { useEffect, useState } from "react";
import socket from "./socket";
import SeatLockTimer from "./components/SeatLockTimer";

const App = () => {
  useEffect(() => {
    socket.on("check:updated", (paylaod) => {
      console.log("Received check:updated event:", paylaod);

      setSeats((prevSeats) =>
        prevSeats.map((seat) =>
          seat.id === paylaod.seatId
            ? {
                ...seat,
                checked: paylaod.checked,
                locked: paylaod.locked,
                lockedExpiry: paylaod.lockedExpiry,
              }
            : seat,
        ),
      );
    });
  }, []);

  useEffect(() => {
    socket.on("seat:unlocked", (payload) => {
      console.log("Received seat:unlocked event:", payload);

      setSeats((prevSeats) =>
        prevSeats.map((seat) =>
          seat.id === payload.seatId
            ? {
                ...seat,
                checked: false,
                locked: false,
                lockedExpiry: null,
              }
            : seat,
        ),
      );
    });
  }, []);

  const [seats, setSeats] = useState([
    {
      id: 1,
      name: "Seat 1",
      checked: false,
      locked: false,
      lockedExpiry: null,
    },
    {
      id: 2,
      name: "Seat 2",
      checked: false,
      locked: false,
      lockedExpiry: null,
    },
    {
      id: 3,
      name: "Seat 3",
      checked: false,
      locked: false,
      lockedExpiry: null,
    },
    {
      id: 4,
      name: "Seat 4",
      checked: false,
      locked: false,
      lockedExpiry: null,
    },
    {
      id: 5,
      name: "Seat 5",
      checked: false,
      locked: false,
      lockedExpiry: null,
    },
  ]);

  const selectedSeats = seats.filter((seat) => seat.checked);

  const handleReleaseSeat = (seatId: number) => {
    socket.emit("seat:unlock", { seatId });
  };

  const handlePayment = () => {
    window.alert("Payment processing is not connected yet.");
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Checkbox changed:", event.target.checked);

    const payload = {
      checked: event.target.checked,
      seatId: Number(event.target.id.split("-")[1]),
      locked: event.target.checked, // Lock the seat when checked
      lockedExpiry: event.target.checked ? Date.now() + 30000 : null, // Set expiry time to 30 seconds from now
    };

    socket.emit("check:update", payload);
  };

  return (
    <div>
      <h1>Seat Selection</h1>
      <div className="seats">
        {seats.map((seat) => (
          <div key={seat.id}>
            <SeatLockTimer lockedExpiry={seat.lockedExpiry} id={seat.id} />
            <label htmlFor={`seat-${seat.id}`}>{seat.name}</label>
            <input
              type="checkbox"
              id={`seat-${seat.id}`}
              checked={seat.checked}
              onChange={handleCheckboxChange}
              disabled={seat.locked}
            />
          </div>
        ))}
      </div>
      {selectedSeats.length > 0 && (
        <div className="selected-seat-slip">
          <div className="slip-header">
            <span className="slip-kicker">Reservation receipt</span>
            <h2>Selected Seats</h2>
            <span className="slip-number">
              Order #SEAT-{Date.now().toString().slice(-4)}
            </span>
          </div>
          <ul>
            {selectedSeats.map((seat) => (
              <li key={seat.id}>
                <span>{seat.name}</span>

                <button
                  type="button"
                  className="release-button"
                  onClick={() => handleReleaseSeat(seat.id)}
                >
                  Release seat
                </button>
              </li>
            ))}
          </ul>
          <div className="slip-total">
            <span>Total seats</span>
            <strong>{selectedSeats.length}</strong>
          </div>
          <button type="button" className="pay-button" onClick={handlePayment}>
            Pay for seats
          </button>
          <p className="slip-note">
            Payment is secured until your seat lock expires.
          </p>
        </div>
      )}
    </div>
  );
};

export default App;
