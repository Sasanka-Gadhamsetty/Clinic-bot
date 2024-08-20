import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePickerComponent = ({ handleDateSelected }) => {
  return (
    <DatePicker
      selected={new Date()}
      onChange={(date) => handleDateSelected(date)}
      dateFormat="yyyy-MM-dd"
      placeholderText="Select a date"
    />
  );
};
export default DatePickerComponent;
