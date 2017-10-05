import { Component } from '@angular/core';
const Web3 = require('web3');
const contract = require('truffle-contract');
const parcelArtifacts = require('../../build/contracts/ParcelRegister.json');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent {
  title = 'app';

  constructor() {
  }
}
