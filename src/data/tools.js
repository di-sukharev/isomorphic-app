import data from "./data.json";

// ======== converting "data.json" to needed "weather" structure ========
const WEATHER = {};

data.forEach(v => {
  const [date] = v.datetime.split(" ");
  if (WEATHER[date]) WEATHER[date].push(v);
  else WEATHER[date] = [v];
});
// ================

const DATES = Object.keys(WEATHER).sort(); // string[]
const DEFAULT_DATE = DATES[0]; // string
const DEFAULT_PLACE = WEATHER[DEFAULT_DATE][0]; // {}

export default WEATHER;
export { DATES, DEFAULT_DATE, DEFAULT_PLACE };
