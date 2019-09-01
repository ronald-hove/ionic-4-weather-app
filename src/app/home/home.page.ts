import { Platform } from "@ionic/angular";
import { Component } from "@angular/core";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { WeatherApiService } from "../weather-api.service";
import { WeaetherAPIResponse, List } from "./weather-response-interface";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  lat;
  lng;

  weatherResponse: WeaetherAPIResponse;
  currentWeather: List;
  nextWeather: List;
  currentIcon;

  firstIndex = 0;
  secondIndex = 1;

  constructor(
    private geolocation: Geolocation,
    private weather: WeatherApiService,
    private platform: Platform
  ) {
    this.getCurrentLocation();
  }

  getCurrentLocation() {
    this.geolocation
      .getCurrentPosition()
      .then(data => {
        console.log(data.coords.latitude, data.coords.longitude);
        this.getWeather(data);
      })
      .catch(error => {});

    // let watch = this.geolocation.watchPosition();
    // watch.subscribe(data => {
    //   console.log(data);
    // });
  }

  private getWeather(data) {
    this.weather
      .getWeather(data.coords.latitude, data.coords.longitude)
      .subscribe(response => {
        this.weatherResponse = response;
        this.adjustWeather();
      });
  }

  goToNextTime() {
    if (this.secondIndex !== this.weatherResponse.list.length) {
      this.firstIndex++;
      this.secondIndex++;
      this.adjustWeather();
    }
  }

  goToPrevTime() {
    if (this.firstIndex !== 0) {
      this.firstIndex--;
      this.secondIndex--;
      this.adjustWeather();
    }
  }
  private adjustWeather() {
    this.currentWeather = this.weatherResponse.list[this.firstIndex];
    this.nextWeather = this.weatherResponse.list[this.secondIndex];
    this.currentIcon = `http://openweathermap.org/img/w/${this.currentWeather.weather[0].icon}.png`;
  }
}
