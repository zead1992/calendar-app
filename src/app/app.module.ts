import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgxsModule} from "@ngxs/store";
import {environment} from "../environments/environment";
import {NgxsLoggerPluginModule} from "@ngxs/logger-plugin";
import {NgxsReduxDevtoolsPluginModule} from "@ngxs/devtools-plugin";
import {CalendarState} from "./store/states/calendar.state";
import {CalendarComponent} from './component/calendar/calendar.component';
import {CalendarService} from "./services/calendar.service";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import { NewReminderFormComponent } from './component/new-reminder-form/new-reminder-form.component';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    NewReminderFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxsModule.forRoot([CalendarState], {
      developmentMode: !environment.production
    }),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    MatIconModule,
    MatButtonModule,
  ],
  providers: [CalendarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
