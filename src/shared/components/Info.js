import React from "react";


const Info = ({ place, date }) => {
  const {precipitation_probability: pp} = place;
let weather;

  if (pp < 25) weather = '☀️'
  else if (pp < 50) weather = '⛅'
  else if (pp < 75) weather = '☁️'
  else if (pp < 100) weather = '🌧️'

return (<div>
    place: {place.place_name} --- date: {date}
    
  </div>)
};

export default Info;
