import { environment } from './../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country } from './country';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private baseUrl: string = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.baseUrl}/country/allCountries`);
  }

  public addCountry(country: Country): Observable<Country> {
    return this.http.post<Country>(`${this.baseUrl}/country/addCountry`, country);
  }

  public deleteCountry(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/country/deleteCountry/${id}`);

  }
  public updateCountry(country: Country): Observable<Country> {
    return this.http.put<Country>(`${this.baseUrl}/country/updateCountry`, country);
  }
}