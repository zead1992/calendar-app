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
import {NewReminderFormComponent} from './component/new-reminder-form/new-reminder-form.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatToolbarModule} from "@angular/material/toolbar";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {
  MAT_COLOR_FORMATS,
  NGX_MAT_COLOR_FORMATS,
  NgxMatColorPickerModule
} from "@angular-material-components/color-picker";
import {MatSelectModule} from "@angular/material/select";
import {NgxMatSelectSearchModule} from "ngx-mat-select-search";
import {WeatherService} from "./services/weather.service";
import {HttpClientModule} from "@angular/common/http";
import {MatListModule} from "@angular/material/list";
import {BaseUiService} from "./services/base-ui.service";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {NgxsStoragePluginModule} from "@ngxs/storage-plugin";
import {MatTooltipModule} from "@angular/material/tooltip";
import { RemindersDialogComponent } from './component/reminders-dialog/reminders-dialog.component';
import {MatExpansionModule} from "@angular/material/expansion";
import { EditReminderFormComponent } from './component/edit-reminder-form/edit-reminder-form.component';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    NewReminderFormComponent,
    RemindersDialogComponent,
    EditReminderFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxsModule.forRoot([CalendarState], {
      developmentMode: false
    }),
    //ngxs storage plugin enable to keep the state sync with localstorage
    // NgxsStoragePluginModule.forRoot({
    //   key: CalendarState
    // }),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    // NgxsLoggerPluginModule.forRoot(),
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMatColorPickerModule,
    MatSelectModule,
    NgxMatSelectSearchModule,
    MatListModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatExpansionModule
  ],
  providers: [
    CalendarService,
    WeatherService,
    BaseUiService,
    {provide: MAT_COLOR_FORMATS, useValue: NGX_MAT_COLOR_FORMATS}
  ],
  entryComponents: [NewReminderFormComponent,RemindersDialogComponent,EditReminderFormComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
