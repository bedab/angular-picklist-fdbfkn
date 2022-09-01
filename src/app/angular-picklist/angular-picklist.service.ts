import {Injectable} from '@angular/core';
import { IList, IListItem } from './interfaces';


@Injectable({
  providedIn: 'root',
})
export class AngularPicklistService {

  /**
   * Method to get the source list for the given item
   */
  findSourceList(item: IListItem, lists: Array<IList>): IList {
    let source: IList;
    
    for ( let i = 0, listLength = lists.length; i < listLength; i++ ) {
      let items: Array<IListItem> = lists[i].items;

      for( let j = 0, itemsLength = items.length; j < itemsLength; j++ ) {
        if (item === items[j]) {
          source = lists[i];
          break;
        }
      }
    }

    return source;
  }

  /**
   * Methdo to find the target list.
   * It will work for the multi list feature as well.
   */
  findTargetList(list: IList, lists: Array<IList>): IList {
    let target: IList;
    
    /**
     * If lists is empty then throw error
     * If list is found in lists then find the index of it.
     * Target list will be always next list from the source list. 
     * If it is end one then target lsit will be first one.
     */
    if ( lists.length ) {
      let index = lists.indexOf(list);
      let targetIndex = index === -1 || (index + 1) === lists.length ? 0 : (index + 1);
      target = lists[targetIndex];
    } else {
      throw Error('There is no list');
    }

    return target;
  }

  /**
   * Method to transfer the item from one list to another
   */
  transfer(item: IListItem, source: IList, target: IList){
    item.selected = false;
    this.removeItem(item, source);
    this.addItem(item, target);
  }

  /**
   * Method to add the new item in list
   */
  addItem(item: IListItem, list: IList){
    list.items.push(item);
  }

  /**
   * Method to remove the item from the list
   */
  removeItem(item: IListItem, list: IList){
    let index = list.items.indexOf(item);
    if(index != -1) {
      list.items.splice(index, 1);
    }
  }

  /**
   * Method to get the next element to focus after removing the element
   */
  getNextElementToFocus(elem: HTMLElement): Node{
    let nextSibling = elem.nextSibling;
    while (nextSibling && nextSibling.nodeType != 1) {
        nextSibling = nextSibling.nextSibling;
    }

    if (!nextSibling) {
      let previousSibling = elem.previousSibling;
      while (previousSibling && previousSibling.nodeType != 1) {
          previousSibling = previousSibling.previousSibling;
      }

      nextSibling = previousSibling;
    }

    return nextSibling;
  }
}