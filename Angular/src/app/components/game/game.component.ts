import { Component, OnInit } from '@angular/core';
import {CurrencyClientService, RootObject , Rates} from '../../services/currency-client.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  helloMessage: string;
  rootObject: RootObject;
  checkMessage: string;
  currencies: string[];
  currencyType: string;
  currencyPrecision: number;

  constructor(private currencyService: CurrencyClientService) {
    this.helloMessage = 'Hello stranger';
    this.currencies = [];
  }

  ngOnInit(): void {
    this.currencyService.getCurrency().subscribe(xxx => {
      this.rootObject = xxx;
      this.getCurrencies();
    });
  }

  sayHello(value: string) {
    if (value !== ''){
      this.helloMessage = 'Hello ' + Number.parseFloat(value);
    }
  }

  check(value: string, type: string, precision: number) {
    const answerValue: number = Number.parseFloat(Number.parseFloat(value).toPrecision(precision + 1));
    const targetValue: number = Number.parseFloat(Number.parseFloat(this.rootObject.rates[type]).toPrecision(precision + 1));
    console.log(answerValue);
    console.log(targetValue);

    if (targetValue > answerValue) {
      this.checkMessage = 'Value is smaller';
    }
    if (targetValue < answerValue) {
      this.checkMessage = 'Value is bigger';
    }
    if (targetValue === answerValue) {
      this.checkMessage = 'Value right You Win';
    }
  }

  private getCurrencies() {
    const rates: Rates = this.rootObject.rates;
    for (const key in rates) {
      if (rates.hasOwnProperty(key)) {
        console.log(key + ' -> ' + rates[key]);
        if (key === 'PLN') {
          this.currencies.unshift(key);
        } else {
          this.currencies.push(key);
        }
      }
    }
  }

}
