import { Injectable } from '@angular/core';
import { Item } from './item';

@Injectable()
export class SidebarService {
  items: Item[];

  constructor() {
    this.items = [
      {name: 'Home', link: 'landing', selected: false},
      {name: 'Create a Parcel', link: 'create', selected: false},
      {name: 'Track a Parcel', link: 'track', selected: false},
    ];
  }

  setSelectedBasedOnState(stateUrl): void {
    for (const item of this.items) {
      item.selected = stateUrl.indexOf(item.link) >= 0;
    }
  }

  getItems(): Promise<Item[]> {
    return Promise.resolve(this.items);
  }
}
