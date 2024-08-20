import React, { useState } from "react";
import moment from "moment";

const TimePickerComponent = ({ handleTimeSelected }) => {
  const [time, setTime] = useState("");

  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    const formattedTime = moment(time, "HH:mm").format("hh:mmA");
    handleTimeSelected(formattedTime);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="time"
        value={time}
        onChange={handleTimeChange}
        required
      />
      <button type="submit">Select Time</button>
    </form>
  );
};

export default TimePickerComponent;
