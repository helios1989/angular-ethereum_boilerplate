import { Component } from '@angular/core';
const Web3 = require('web3');
const contract = require('truffle-contract');
const parcelArtifacts = require('../../build/contracts/ParcelRegister.json');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  ParcelArtifacts = contract(parcelArtifacts);
  web3: any;
  title = 'app';

  accounts: string[];
  account: string;
  balance: number;

  constructor() {
    this.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
    // this.MetaCoin.setProvider(this.web3.currentProvider);
    this.ParcelArtifacts.setProvider(this.web3.currentProvider);

    this.web3.eth.getAccounts((err, accs) => {
      if (err != null) {
        alert('There was an error fetching your accounts.');
        return;
      }

      if (accs.length === 0) {
        alert(`Couldn't get any accounts! Make sure your Ethereum client is configured correctly.`);
        return;
      }
      this.accounts = accs;
      this.account = this.accounts[0];
    });

    this.ParcelArtifacts.deployed()
      .then((instance) => {
      return instance.getFucks.call();
      }).then((value) => {
      console.log(`${value} fucks given`);
    }).catch((e) => {
      console.log(e);
    });
  }
}
