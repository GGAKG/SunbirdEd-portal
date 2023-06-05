import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TelemetryModule } from '@sunbird/telemetry';
import { CoreModule } from '@sunbird/core';
import { SharedModule } from '@sunbird/shared';
import { ExploreGroupComponent, ExploreFtuPopupComponent } from './components';
import {SharedFeatureModule} from '@sunbird/shared-feature';
import { GroupRoutingModule } from './group-routing.module';
import {MatToolbarModule} from '@angular/material/toolbar';

@NgModule({
  imports: [
    CommonModule,
    TelemetryModule,
    CoreModule,
    SharedModule,
    GroupRoutingModule,
    SharedFeatureModule,
    MatToolbarModule
  ],
  declarations: [ ExploreGroupComponent, ExploreFtuPopupComponent ],
  exports: []
})
export class GroupModule { }
