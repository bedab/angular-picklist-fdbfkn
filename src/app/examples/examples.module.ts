import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SortablejsModule } from 'angular-sortablejs';
import { ReactiveFormsModule } from '@angular/forms';

import { AngularPicklistModule } from '../angular-picklist/angular-picklist.module';

import { SimplePicklistComponent } from './simple-picklist/simple-picklist.component';
import { BasePicklistComponent } from './base-picklist/base-picklist.component';

@NgModule({
  imports: [
    CommonModule,
    SortablejsModule,
    ReactiveFormsModule,
    AngularPicklistModule,
  ],
  declarations: [
    SimplePicklistComponent,
    BasePicklistComponent
  ],
  exports: [
    SimplePicklistComponent,
    BasePicklistComponent
  ]
})
export class ExamplesModule { }