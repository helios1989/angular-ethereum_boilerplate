import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';
import { Subscription } from 'rxjs/Subscription';
import { MdSidenav } from '@angular/material';
import { Router } from '@angular/router';

import { Item } from './item';
import { SidebarService } from './sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.styl']
})
export class SidebarComponent implements OnInit, OnDestroy {
  items: Item[];
  watcher: Subscription;
  isSmall = true;
  sideNavMode = 'push';

  @ViewChild('sidenav')
  private sidenav: MdSidenav;

  constructor(
    public router: Router,
    public sidebarService: SidebarService,
    private media: ObservableMedia,
  ) {
    this.watcher = media.subscribe((change: MediaChange) => {
      this.isSmall = change.mqAlias === 'xs';
      if (this.sidenav) {
        this.sidenav.opened = !this.isSmall;
        this.sideNavMode = this.isSmall ? 'over' : 'push';
      }
    });
  }

  ngOnInit() {
    this.sidebarService.getItems()
      .then(items => {
        this.items = items;
      });
  }

  ngOnDestroy() {
    this.watcher.unsubscribe();
  }

  goTo(item): void {
    this.router.navigate([item.link]);
    if (this.isSmall) {
      this.sidenav.close();
    }
  }
}
