import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { SortablejsModule } from 'angular-sortablejs';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { ExamplesModule } from './examples/examples.module';


@NgModule({
  imports: [BrowserModule, FormsModule, SortablejsModule.forRoot({ animation: 150 }), ExamplesModule],
  declarations: [AppComponent, HelloComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
