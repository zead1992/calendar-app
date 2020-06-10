export type IOpenWeatherResponse = {
  cod: number;
  city_id: number;
  calctime: number;
  result: {
    month: number;
    day: number;
    temp: {
      record_min: number;
      record_max: number;
      average_min: number;
      average_max: number;
      median: number;
      mean: number;
      p25: number;
      p75: number;
      st_dev: number;
      num: number;
    };
    pressure: {
      min: number;
      max: number;
      median: number;
      mean: number;
      p25: number;
      p75: number;
      st_dev: number;
      num: number;
    };
    humidity: {
      min: number;
      max: number;
      median: number;
      mean: number;
      p25: number;
      p75: number;
      st_dev: number;
      num: number;
    };
    wind: {
      min: number;
      max: number;
      median: number;
      mean: number;
      p25: number;
      p75: number;
      st_dev: number;
      num: number;
    };
    precipitation: {
      min: number;
      max: number;
      median: number;
      mean: number;
      p25: number;
      p75: number;
      st_dev: number;
      num: number;
    };
    clouds: {
      min: number;
      max: number;
      median: number;
      mean: number;
      p25: number;
      p75: number;
      st_dev: number;
      num: number;
    };
  };
}

//params required to get weather by city id for specific date
export type IOpenWeatherParams = {
  id:number;
  month:number,
  day:number;
  units:'metric' | 'imperial',
}
