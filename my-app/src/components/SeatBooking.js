import React, { useState } from 'react';
import './seatBooking.css';
import DateTime from "./DateTime";

const SeatBooking = () => {
  const totalSeats = 200;
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectTicketType, setSelectTicketType] = useState(false);
  const [sequentialMode, setSequentialMode] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [proceedClicked, setProceedClicked] = useState(false);
  const [unavailableSeats, setUnavailableSeats] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 36, 37, 38, 39, 40, 130, 131, 132, 133, 134, 135, 136, 161, 162, 181, 182, 179, 180, 199, 200]); // Example unavailable seats

  const handleSeatClick = (seatNumber) => {
    if (proceedClicked) {
      return;
    }


    if (unavailableSeats.includes(seatNumber)) {
      alert('This seat is unavailable.');
      return;
    }

    if (sequentialMode) {
      const numTickets = parseInt(inputValue, 10);
      if (!isNaN(numTickets) && numTickets > 0) {
        const selectedRange = [];
        for (let i = seatNumber; i < seatNumber + numTickets; i++) {
          if (!unavailableSeats.includes(i) && !selectedSeats.includes(i)) {
            selectedRange.push(i);
          } else {
            alert('Sequential seats are not available from this current seat. please select indivisual seats after doing unchecked the sequential mode');
            return;
          }
        }
        setSelectedSeats([...selectedSeats, ...selectedRange]);
      } else {
        alert('Please enter a valid number of tickets.');
        return;
      }
    } else {
      if (selectedSeats.includes(seatNumber)) {
        setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
      } else {
        setSelectedSeats([...selectedSeats, seatNumber]);
      }
    }
  };

  const handleTicketType = () =>{
    setSelectTicketType(true);
  }

  const handleProceed = () => {
    if(selectTicketType)
    {
    if (selectedSeats.length == inputValue) {
      setProceedClicked(true);
      setInputValue('');
    }

    else {
      alert("Please select the seats equql to no of tickets")

    }
  }
  else {
    alert("Please select the Ticket type")

  }
  

  };

  const renderSeats = () => {
    const seats = [];
    for (let i = 1; i <= totalSeats; i++) {
      const isSelected = selectedSeats.includes(i);
      const isUnavailable = unavailableSeats.includes(i);
      const isBooked = proceedClicked && isSelected;
      seats.push(
        <div
          key={i}
          className={`seat ${isUnavailable ? 'unavailable' : ''} ${isSelected ? 'selected' : ''
            } ${isBooked ? 'booked' : ''}`}
          onClick={() => handleSeatClick(i)}
        >
          {i}
        </div>
      );
    }
    return seats;
  };

  return (
    <div className="seat-booking">
      <h1>Book My Seat</h1> <DateTime />
      <div className="controls">
        <input
          className='ticket_count'
          type="number"
          placeholder="Enter number of tickets"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <label>
          <input
            className='check_box'
            type="checkbox"
            checked={sequentialMode}
            onChange={() => setSequentialMode(!sequentialMode)}
          />
          Sequential Mode
        </label>
        <button onClick={handleProceed}>Proceed</button>
        <select className="ticket_type" onChange={handleTicketType} value={selectTicketType} >
          <option>Ticket-Type</option>
          <option value="premium">Premium</option>
          <option value="nonpremium">Non-Premium</option>
        </select>

      </div>
      <div className="seats_layout">
        <div className="rows_name">
          <div className='row_label'>A</div>
          <div className='row_label'>B</div>
          <div className='row_label'>C</div>
          <div className='row_label'>D</div>
          <div className='row_label'>E</div>
          <div className='row_label'>F</div>
          <div className='row_label'>G</div>
          <div className='row_label'>I</div>
          <div className='row_label'>J</div>
          <div className='row_label'>K</div>
        </div>
        <div className="seat-container">{renderSeats()}</div>
      </div>
    </div>
  );
};

export default SeatBooking;
