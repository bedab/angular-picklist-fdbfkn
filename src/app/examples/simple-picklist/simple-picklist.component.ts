import { Component, OnInit } from '@angular/core';
import { SortablejsOptions } from 'angular-sortablejs';

@Component({
  selector: 'simple-picklist',
  templateUrl: './simple-picklist.component.html',
  styleUrls: ['./simple-picklist.component.css']
})
export class SimplePicklistComponent implements OnInit {
  // normal groups
  normalList1 = [
    '1',
    '2',
    '3',
    '4',
    '5',
  ];

  normalList2 = [
    '6',
    '7',
    '8',
    '9',
    '10',
  ];

  normalOptions: SortablejsOptions = {
    group: 'normal-group'
  };

  constructor() { }

  ngOnInit() {
  }

}