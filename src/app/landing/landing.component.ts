import { Component, OnInit } from '@angular/core';
import { EthereumService } from '../common/api/ethereum.service';
import { Account } from '../common/api/account.model';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.styl']
})
export class LandingComponent implements OnInit {
  accounts: Account[];
  constructor(private ethereumService: EthereumService) {
  }

  ngOnInit() {
    this.accounts = this.ethereumService.accounts;
  }

}

/*

ParcelRegister.deployed().then((instance) => {return instance.startParcel.call(0,51,-0.5,'Needs to go to fenchurch','Nicks parcel');});


'0x61dd403d0dc62f457015ce54e8c5b14e7b8f3f4735d0b6f2fd29be151f50fe99'
'0x0000000000000000000000000000000000000000000000000000000000000000'

ParcelRegister.deployed().then((instance) => {return instance.getParcelRecords.call('0x61dd403d0dc62f457015ce54e8c5b14e7b8f3f4735d0b6f2fd29be151f50fe99');});

 */