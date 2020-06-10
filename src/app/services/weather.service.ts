import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {IOpenWeatherParams, IOpenWeatherResponse} from "../interfaces/weather.interface";

@Injectable()
export class WeatherService {

  private APPID: string = '051c92065d46fbfa8918baffe5bc8676';

  constructor(
    private _http: HttpClient
  ) {

  }

  public getWeather(_params: IOpenWeatherParams) {
    return this._http.get<IOpenWeatherResponse>('https://history.openweathermap.org/data/2.5/aggregated/day', {
      params: <any>{
        APPID: this.APPID,
        ..._params
      }
    })
  }

}
