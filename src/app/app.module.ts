import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TableModule } from 'primeng/table';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ChartModule } from 'primeng/chart';
import { MultiSelectModule } from 'primeng/multiselect';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { TableComponent } from './table/table.component';
import { SetTableComponent } from './set-table/set-table.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ChartComponent } from './chart/chart.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
// import { StripeDoc } from './stripeDoc';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    TableComponent,
    SetTableComponent,
    CalendarComponent,
    ChartComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ButtonModule,
    RadioButtonModule,
    TableModule,
    OverlayPanelModule,
    ChartModule,
    MultiSelectModule,
    TooltipModule,
    DialogModule,
    InputTextModule,
    ReactiveFormsModule,
    ToastModule
  ],
  providers: [
    MessageService
    // StripeDoc
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
