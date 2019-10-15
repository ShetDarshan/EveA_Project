import React, { Component } from "react";
import DatePicker from "./components/dashboard/DatePicker/DatePicker.js";
import "./App.css";

class category_page extends Component {
  constructor(props) {
    super(props);
    this.onDayClick = this.onDayClick.bind(this);
    this.state = {
      selectedDate: new Date()
    };
  }

  render() {
    const { selectedDate } = this.state;

    return (
      <div className="App">
        <div className="MainContent">
          <DatePicker fullDate={selectedDate} onDayClick={this.onDayClick} />
        </div>
      </div>
    );
  }

  onDayClick(newDay) {
    const { selectedDate } = this.state;

    this.setState({
      selectedDate: new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        newDay
      )
    });
  }
}

export default category_page;