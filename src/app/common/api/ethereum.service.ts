import { Injectable } from '@angular/core';
import { ParcelDTO } from '../../create/parcel.DTO';
import { ParcelRecord } from './record.model';
import { Account } from './account.model';

const Web3 = require('web3');
const contract = require('truffle-contract');
const parcelArtifacts = require('../../../../build/contracts/ParcelRegister.json');

@Injectable()
export class EthereumService {
  ParcelArtifacts = contract(parcelArtifacts);
  web3: any;
  public accounts: Account[];
  coinbase: string;

  constructor() {
    this.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
    this.ParcelArtifacts.setProvider(this.web3.currentProvider);
    this.web3.eth.getAccounts((err, accounts) => {
      if (err != null) {
        alert('There was an error fetching your accounts.');
        return;
      }

      if (accounts.length === 0) {
        alert(`Couldn't get any accounts! Make sure your Ethereum client is configured correctly.`);
        return;
      }
      this.coinbase = accounts[0];

      this.accounts = [];
      for (const account of accounts) {
        const balance = this.web3.eth.getBalance(account);
        this.accounts.push({
          address: account,
          balance: balance
        });
      }

    });
  }

  createParcel(parcelDTO: ParcelDTO) {
    this.ParcelArtifacts.deployed()
      .then((instance) => {
        instance.startParcel(
          parcelDTO.timestamp,
          parcelDTO.lat,
          parcelDTO.long,
          parcelDTO.note,
          parcelDTO.parcelName,
          {
            from: this.coinbase,
            gas: 150000
          }
        );
      }).catch(e => {
      console.error(`Create parcel failed: ${e}`);
    });
  }

  getParcelHash(parcelDTO: ParcelDTO): Promise<string> {
    return this.ParcelArtifacts.deployed()
      .then(instance => {
        return instance.getParcelHash(
          parcelDTO.parcelName,
          parcelDTO.timestamp
        );
      }).catch(e => {
        console.error(`Get parcel hash failed: ${e}`);
      });
  }

  getParcelRecords(parcelHash: string): Promise<string[]> {
      return this.ParcelArtifacts.deployed()
        .then((instance) => {
          return instance.recordHashByParcelHash(parcelHash);
        }).then((hashes) => {
          return Promise.resolve(hashes);
        }).catch(e => {
          console.error(`Get parcel records failed: ${e}`);
        });
  }

  getRecord(recordHash: string): Promise<ParcelRecord> {
    return this.ParcelArtifacts.deployed()
      .then((instance) => {
        return instance.recordByRecordHash(
          recordHash,
          { from: this.coinbase }
        );
      }).then((record) => {
        return {
          timestamp: record[0],
          lat: record[1],
          long: record[2],
          note: record[3]
        };
      }).catch(e => {
        console.error(`Get record failed: ${e}`);
      });
  }

  getBalance(account): string {
    return this.web3.eth.getBalance(account);
  }
}

// 0x3415949e1398d538cbdcb795ac451c2774f695cbc7dfde022ad61c1c231476cf
