import { State } from './state';
import { Component, OnInit } from '@angular/core';
import { CountryService } from './country.service';
import { Country } from './country';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  countries: Country[];
  deleteCountry: Country;
  editCountry: Country;
  statesOfCountry: State[];
  stateList = []
  array: Array<any> = []

  constructor(private countryService: CountryService) {
  }

  ngOnInit(): void {
    this.getCountries();
  }

  public getCountries(): void {
    this.countryService.getCountries().subscribe(
      (response: Country[]) => {
        this.countries = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message)
      }
    )
  }

  public onDelete(country: Country, isDelete: boolean): void {
    this.deleteCountry = country;
    if (isDelete) {
      this.countryService.deleteCountry(country?.id).subscribe(
        (response: void) => {
          this.getCountries();
        },
        (error: HttpErrorResponse) => {
          console.log(error.message);
        }
      )
    }
  }

  public onEdit(country: Country): void {
    this.editCountry = country;
  }

  public saveEdit(country: Country) {
    country.states = this.editCountry.states;
    this.countryService.updateCountry(country).subscribe(
      (response: Country) => {
        this.getCountries();
      },
      (error: HttpErrorResponse) => {
        console.log("there is an error: " + error.message);
      }
    )
  }

  public seeStates(country: Country): void {
    this.statesOfCountry = country.states;
  }

  public searchCountry(input: String): void {
    const searchResults: Country[] = [];
    var ncf = document.getElementById('noCountryFound');
    for (let country of this.countries) {
      if (country.name.toLowerCase().indexOf(input.toLowerCase()) !== -1 || country.capital.toLowerCase().indexOf(input.toLowerCase()) !== -1) {
        searchResults.push(country)
      }
    }
    this.countries = searchResults;
    ncf.style.display = "none"
    if (!input) {
      ncf.style.display = "none"
      this.getCountries()
    }
    if (searchResults.length === 0) {
      ncf.style.display = "block"
    }
  }

  public addCountry(country: Country): void {
    country.states = this.array
    this.countryService.addCountry(country).subscribe(
      (response: Country) => {
        this.getCountries()
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);

      }
    )
    this.array = null
  }

  public showAddCountryField(): void {
    var base = document.createElement('div')
    base.setAttribute('id','toBeDeleted')
    var form = document.createElement('form')
    var in1 = document.createElement('input')
    var in2 = document.createElement('input')
    var button1 = document.createElement('button')
    button1.innerHTML = '&#10004;'
    button1.setAttribute('type', 'button');
    in1.setAttribute('type', 'text')
    in1.setAttribute('name', 'stateName')
    in1.setAttribute('id', 'stateName')
    in1.setAttribute('placeholder', 'Enter state name..')

    in2.setAttribute('type', 'number')
    in2.setAttribute('name', 'statePopulation')
    in2.setAttribute('id', 'statePopulation')
    in2.setAttribute('placeholder', 'Enter population..')

    base.appendChild(form)
    form.appendChild(in1)
    form.appendChild(in2)
    form.appendChild(button1)
    button1.addEventListener('click',
      this.onStateAddButtonClick
    );
    document.getElementById('new-states').appendChild(base)
  }

  public onStateAddButtonClick = () => {
    var na = (<HTMLInputElement>document.getElementById('stateName')).value;
    const pop = +(<HTMLInputElement>document.getElementById('statePopulation')).value

    var modal = <State>{ name: na, population: pop }
    this.array.push(modal)

    document.getElementById('toBeDeleted').remove();
    var li = document.createElement('li')
    li.innerHTML = na + ", " + pop 
    document.getElementById('new-states').appendChild(li)
  }

  public clearForm(): void {
    (<HTMLInputElement>document.getElementById('clearButton')).click();
  }
}