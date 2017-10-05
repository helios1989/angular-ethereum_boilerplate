import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { ParcelDTO } from './parcel.DTO';
import { EthereumService } from '../common/api/ethereum.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.styl']
})
export class CreateComponent implements OnInit, OnChanges {
  customLocation: boolean;
  @Input() parcelDTO: ParcelDTO;
  browserLocation: number[];
  color: string;
  strength: number;
  bufferValue: number;
  locationLoaded: boolean;
  zoom: number;
  newParcelHash: string;
  state: string;
  statement: string;

  constructor(private ethereumService: EthereumService) {
    this.state = 'create';
    this.locationLoaded = false;
    this.color = 'primary';
    this.strength = 0;
    this.bufferValue = 0;
    this.customLocation = true;
    this.parcelDTO = new ParcelDTO;
    this.zoom = 16;
    this.newParcelHash = '';
  }

  ngOnInit() {
    this.getLocation();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes.parcelDTO);
  }

  createParcel(parcelDTO: ParcelDTO) {
    this.state = 'wait';
    this.statement = 'Wrapping up parcel';
    parcelDTO.timestamp = Math.round(new Date().getTime() / 1000);
    // console.log(parcelDTO);
    this.statement = 'Sending parcel';
    this.ethereumService.createParcel(parcelDTO);
    this.statement = 'Confirming delivery';
    this.ethereumService.getParcelHash(parcelDTO).then((hash) => {
      this.newParcelHash = hash;
      console.log(this.newParcelHash);
      // this.ethereumService.getParcelRecords(this.newParcelHash).then(records => {
      //   console.log(records);
      // });
    });
  }

  goHome() {
    console.error('Go home not implemented');
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
        this.locationLoaded = true;
        this.customLocation = false;
        this.affectStrength(10);
        this.browserLocation = [0, 0];
        this.browserLocation[0] = this.parcelDTO.lat = this.roundNumber(position.coords.latitude, 6);
        this.browserLocation[1] = this.parcelDTO.long = this.roundNumber(position.coords.longitude, 6);
      },
        error => {
          alert('Denying location services reduces the validity of your record');
          this.locationLoaded = true;
        });
    } else {
      console.error(`Location not retrieved`);
    }
  }

  toggleLocation() {
    if (this.customLocation) {
      this.affectStrength(10);
      this.parcelDTO.lat = this.browserLocation[0];
      this.parcelDTO.long = this.browserLocation[1];
    } else {
      this.affectStrength(-10);
    }
  }

  affectStrength(diffIn) {
    this.strength += diffIn;
  }

  roundNumber(numberIn, decimalPlaces): number {
    return(Math.round(numberIn * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces));
  }

}
