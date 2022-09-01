import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'base-picklist',
  templateUrl: './base-picklist.component.html',
  styleUrls: ['./base-picklist.component.css']
})
export class BasePicklistComponent implements OnInit {
  listOne: any = {
    items: [
      { content: 'haha'},
      // { content: 'hehe', disabled: true},
      { content: 'haha1'},
      { content: 'hehe2'},
      { content: 'haha3'},
      // { content: 'hehe4'},
      // { content: 'haha5', disabled: true},
      // { content: 'hehe6'},
      // { content: 'haha7'},
      // { content: 'hehe8'},
    ]
  };

  listTwo: any = {
    items: [
      { content: 'hoho'}
    ]
  };

  lists: Array<any> = [];
  
  options: any = {
    group: 'normal-group',
    searchable: true,
  };

  constructor() { }

  ngOnInit() {
    this.lists = [this.listOne, this.listTwo];
  }

  add(){
    this.listOne.items.push({ content: 'new ' + this.listOne.items.length});

    this.lists = [this.listOne, this.listTwo];
    
  }
}