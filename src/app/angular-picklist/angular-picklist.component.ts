/**
 * Implement reactive form on it
 * Implement Accessibility
 * Implement select all
 * 
 * Fixes :
 * 1. Problem on new item add
 */
import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import cloneDeep from 'lodash.clonedeep';

import { SortablejsOptions } from 'angular-sortablejs';
import { IList, IListItem, IAngularPicklistOptions } from './interfaces';
import { AngularPicklistService as PicklistService } from './angular-picklist.service';

@Component({
  selector: 'angular-picklist',
  templateUrl: './angular-picklist.component.html',
  styleUrls: [/*'./angular-picklist.component.scss'*/] // added as global in angular.json
})
export class AngularPicklistComponent implements OnInit, OnChanges {
  @Input() options: IAngularPicklistOptions;
  @Input() lists: Array<IList>;



  // __list: Array<IList>;
  // @Input() set lists(val) {
  //   this.__lists = val;
  //   console.log('setting value =>', val);
  // }
  // get lists() {
  //   console.log('getting value =>', this.__lists);
    
  //   return this.__lists;
  // }

  private _options: IAngularPicklistOptions = {
    group: '',
    animation: 150,
    ghostClass: 'sortable-ghost',
    draggable: '.draggable',

    showEmpty: true, 
    searchable: false,
  };

  /**
   * A private list for internal use and keep the original list untouched
   */
  private _lists: Array<IList> = [];  
  private leftList: IList = {};
  private rightList: IList = {};
  private leftSearchValue: string;

  constructor(private picklistService: PicklistService) {
    // Set group name for picklist drag & drop area
    // ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    let randomNumbers = new Uint32Array(1);
    window.crypto.getRandomValues(randomNumbers);
    this._options.group = 'angular-picklist-' + randomNumbers[0];
  }

  ngOnInit() {
    this.options = {...this._options, ...(this.options || {})};
    this.setLists(this.lists);
    console.log('_lists =>', this._lists, this.options);
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('in ngOnChanges', changes);
    if(changes.lists) {
      this.setLists(this.lists);
    }
  }

  ngDoCheck(changes: any) {
    console.log('ngDoCheck', changes);
  }

  setLists(lists: Array<IList>) {
    // Keep the original copy of list items for filtering
    this._lists = [];
    lists.forEach((list, index) => {
      let listItems: Array<IListItem> = list.items;
      let cloneList = cloneDeep(list);
          cloneList.items = cloneDeep(list.items);
          cloneList.index = index;

          if (!cloneList.searchModel) {
            cloneList.searchModel = "";
          }
      this._lists.push(cloneList);
    });

    // console.log(this._lists[0] === this.lists[0]);

    // Here index is fixed for left and right panel.
    // For multi panel we can increase it in same way.
    this.leftList = this._lists[0] || this.leftList;
    this.rightList = this._lists[1] || this.rightList;
  }

  /**
   * Method to check if item can be shown in list on UI or is it draggable. 
   * If it is not that means it is inactive element.
   * 
   * Todo: move to service
   */
  private isActionable(item: IListItem) {
    let actionable = true;

    if (item.visible === false) {
      actionable = false;
    } else if (item.disabled === true) {
      actionable = false
    }
    return !(item.visible === false || item.disabled === true);
  }

  getSize(list: IList) {
    return list.items.filter((item) => {
      // return this.isActionable(item) || item.disabled;
      return !(item.visible === false);
    }).length;
  }


  /**
   * Select the list item on click of it
   */
  onItemClick($event: any, item: IListItem){
    if (this.isActionable(item)) {
      item.selected = !item.selected;
    }
  }

  onEnterKey($event, item: IListItem){
    if (this.isActionable(item)) {
      if (item.selected) {
        let elem = $event.target;
        let elemToFocus = this.picklistService.getNextElementToFocus($event.target);
        this.moveItem(item);
        if (elemToFocus) {
          (<HTMLElement>elemToFocus).focus();
        }
      } else {
        item.selected = !item.selected;
      }
    }
  }

  private moveItems(items: Array<IListItem>) {
    // Add animation to list items
    let timer = setInterval(() => {
      if ( items.length > 0){
        let item = items[items.length - 1];
        this.moveItem(item);
        this.picklistService.removeItem(item, <IList>({items: items}));
      } else {
        clearInterval(timer);
      }
    }, this.options.animation);
  }

  /**
   * Steps to move an item
   * - item, it self
   * - to/target
   * - from/source
   * - Remove selection
   * - Remove item from source list
   * - Add item to target list
   * - Focus on the next element
   */
  private moveItem(item: IListItem){
    console.log('in move item =>', item, this._lists)

    if (this.isActionable(item)) {
      let source: IList = this.picklistService.findSourceList(item, this._lists);
      let target: IList = this.picklistService.findTargetList(source, this._lists);
      
      this.picklistService.transfer(item, source, target);
    }
  }

  // timer = null;
  // preventSingleClick = false;
  // /**
  //  * Select the list item on click of it
  //  */
  // onItemClickForDblClick($event, item: IListItem){
  //   this.timer = setTimeout(function() {
  //     if (!this.preventSingleClick) {
  //       console.log('clicked', $event, item);
  //       item.selected = true;
  //     }
  //     this.preventSingleClick = false;
  //   }, 500);
  // }

  // onItemDblClick($event, item: IListItem){
  //   clearTimeout(this.timer);
  //   this.preventSingleClick = true;
  //   console.log('onItemDblClick', $event, item);
  //   item.selected = true;
  //   item.visible = false;
  // }

  /**
   * Method to push left selected items to right side
   */
  onAddClick($event){
    let selectedItems: Array<IListItem>;
    selectedItems = this.leftList.items.filter(listItem => listItem.selected === true);

    this.moveItems(selectedItems);
  }

  /**
   * Method to push all left items to right side
   */
  onAddAllClick($event){
    this.moveItems(this.leftList.items);
  }

  /**
   * Method to add right selected items to left side
   */
  onRemoveClick($event){
    let selectedItems: Array<IListItem>;
    selectedItems = this.rightList.items.filter(listItem => listItem.selected === true);
    this.moveItems(selectedItems);
  }

  /**
   * Method to add right selected items to left side
   */
  onRemoveAllClick($event){
    this.moveItems(this.rightList.items);
  }

  /**
   * Clear selection after 
   * - Moving the item
   * - Click on action buttons
   * - On selection of opposite pane
   */
  private clearSelection(){

  }

  /**
   * Remove selection for list items
   */
  private removeSelection(listItems: IListItem){

  }

  onSearch($event: any, list: IList) {
    // let serachText = $event.target.value;
    console.log('search text =>', $event.target.value, list.searchModel);
    console.log('list =>', list);

    this.applyFilter(list.searchModel, list);
  }

  private applyFilter(filterText: string, list: IList) {
    if( filterText && filterText != '') {
      list.items.forEach((item) => {
        if ( item.content.indexOf(filterText) === -1) {
          item.visible = false;
        } else {
          item.visible = true;
        }
      });
    }
  }
}