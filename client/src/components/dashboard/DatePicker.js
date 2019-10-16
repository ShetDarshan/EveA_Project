import React, { Component } from 'react';
import './DatePicker.css';

import Calendar from './Calendar';


const style = {
  position: "relative",
  margin: "50px auto"
}

class DatePicker extends Component {
  onDayClick = (e, day) => {
    alert(day);
  }
  
  render() {
    return (
      <div className="DatePicker" style={{marginLeft: "-70em"}}>
        <Calendar style={style} width="302px" 
          onDayClick={(e, day)=> this.onDayClick(e, day)}/>     
      </div>
    );
  }
}



export default DatePicker;