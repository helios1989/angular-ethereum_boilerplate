import { Component, OnInit } from '@angular/core';
import { EthereumService } from '../common/api/ethereum.service';
import { ParcelRecord } from '../common/api/record.model';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.styl']
})
export class TrackComponent implements OnInit {
  parcelHash: string;
  records: ParcelRecord[];
  constructor(private ethereumService: EthereumService) {
    this.parcelHash = '';
  }

  ngOnInit() {
  }

  findParcel() {
    console.log('find parcel');
    this.records = [];
    this.ethereumService.getParcelRecords(this.parcelHash).then((recordHashes) => {
      for (const hash of recordHashes) {
        this.ethereumService.getRecord(hash).then((record) => {
          this.records.push(record);
        });
      }
    });
  }

}
