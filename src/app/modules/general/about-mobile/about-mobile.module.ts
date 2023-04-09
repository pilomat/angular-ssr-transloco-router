import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutMobileRoutingModule } from './about-mobile-routing.module';
import { AboutComponent } from './components/about/about.component';


@NgModule({
  declarations: [
    AboutComponent
  ],
  imports: [
    CommonModule,
    AboutMobileRoutingModule
  ]
})
export class AboutMobileModule { }
