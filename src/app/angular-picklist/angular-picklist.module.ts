import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AngularPicklistComponent } from './angular-picklist.component';
import { SortablejsModule } from 'angular-sortablejs';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SortablejsModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [
    AngularPicklistComponent
  ],
  exports: [
    AngularPicklistComponent,
  ]
})
export class AngularPicklistModule { }