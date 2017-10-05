export class ParcelDTO {
  timestamp: number;
  lat: number;
  long: number;
  note: String;
  parcelName: String;

  constructor () {
    this.timestamp = 0;
    this.lat = 0;
    this.long = 0;
    this.note = '';
    this.parcelName = '';
  }
}