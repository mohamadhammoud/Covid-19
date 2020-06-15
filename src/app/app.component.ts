import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  countries: [];
  selectedCountry: string = '';
  selectedCountryArray = [];

  allCountriesStatistic = [];

  constructor(private http: HttpClient) { }


  getCountriesName() {
    this.http.get("https://covid19.mathdro.id/api/countries")
      .subscribe((data: any) => {
        this.countries = data.countries;
        console.log(data.countries);
      });
  }
  getStatisticOfAllCountries() {

    this.http.get("https://covid19.mathdro.id/api")
      .subscribe((data: any) => {
        this.allCountriesStatistic[0] = " Confirmed : " + data.confirmed.value;
        this.allCountriesStatistic[1] = "Recovered : " + data.recovered.value;
        this.allCountriesStatistic[2] = "Deaths : " + data.deaths.value;
        this.selectedCountryArray = this.allCountriesStatistic;
        console.log(this.allCountriesStatistic);
      })
  }
  getStatisticOfSpecificCountry() {
    this.http.get("https://covid19.mathdro.id/api/countries/" + this.selectedCountry)
      .subscribe((data: any) => {
        this.selectedCountryArray[0] = " Confirmed : " + data.confirmed.value;
        this.selectedCountryArray[1] = "Recovered : " + data.recovered.value;
        this.selectedCountryArray[2] = "Deaths : " + data.deaths.value;
        console.log(data);
      })
  }


  ngOnInit() {
    //get Countries

    this.getCountriesName();
    this.getStatisticOfAllCountries();

  }
  setSelectedCountry(event: any) {
    //update the ui
    if (this.selectedCountry != "All Countries") {
      this.getStatisticOfSpecificCountry();
    } else {
      this.getStatisticOfAllCountries();
    }


  }
}
