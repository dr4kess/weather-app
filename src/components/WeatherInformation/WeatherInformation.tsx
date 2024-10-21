import DailyInformation from "./DailyInformation/DailyInformation"
import DaySelect from "./DaySelect/DaySelect"
import HourlyInformation from "./HourlyInformation/HourlyInformation"

import './WeatherInformation.scss'

const WeatherInformation = () => {

    return(
       <>
       
       <div className="weather-information-wrapper">
           <DailyInformation/>
           <HourlyInformation/>
       </div>
       <div className="weather-day-select-wrapper">
           <DaySelect/>
       </div>
       </>
   )   
}

export default WeatherInformation