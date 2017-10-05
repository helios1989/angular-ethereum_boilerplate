import { NgModule } from '@angular/core';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { NgMaterialModule } from './ng-material.module';
import { BrowserModule } from '@angular/platform-browser';
import { SidebarService } from './sidebar/sidebar.service';

@NgModule({
  declarations: [
    ToolbarComponent,
    SidebarComponent
  ],
  imports: [
    NgMaterialModule,
    BrowserModule
  ],
  exports: [
    SidebarComponent,
    ToolbarComponent
  ],
  providers: [
    SidebarService,
  ]
})
export class ComponentsModule {}
