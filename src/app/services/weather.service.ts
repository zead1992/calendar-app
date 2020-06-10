import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {IOpenWeatherParams, IOpenWeatherResponse} from "../interfaces/weather.interface";

@Injectable()
export class WeatherService {

  private APPID: string = '7914bd2705a08c2fac9711c1f709852b';

  constructor(
    private _http: HttpClient
  ) {

  }

  public getWeather(_params: IOpenWeatherParams) {
    return this._http.get<IOpenWeatherResponse>('https://cors-anywhere.herokuapp.com/https://history.openweathermap.org/data/2.5/aggregated/day', {
      params: <any>{
        APPID: this.APPID,
        ..._params
      }
    })
  }

}
