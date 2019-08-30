import { Injectable } from "@angular/core";
import { HTTP } from "@ionic-native/http/ngx";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class WeatherApiService {
  apiKey = "5e3a65ac45f9e9f434d4433b52ae1fd2";

  constructor(private http: HTTP, private ngHttp: HttpClient) {}

  getWeather(lat, lng): Observable<any> {
    return this.ngHttp.get<any>(
      `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&units=metric&APPID=${this.apiKey}`
    );
  }
}
