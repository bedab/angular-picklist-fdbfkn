import { IListItem as ListItem } from './list-item';

// List is collection of items
export interface IList {
  index?: number; // Keep the list index from the source
  items?: Array<ListItem>;
  checkable?: boolean; // default false; show tick instead of checkbox
  // sortable?: boolean; // default true, equivalent to sort in sortablejs
  searchable?: boolean; // default false
  searchModel?: string; // search box model
}

export class PickList implements IList {
  constructor(index:number, list: IList){
    this.index = index;
    this.items = [];
    this.checkable = false;
    this.searchable = false;
    this.searchModel = null;
  }

  public set(index:number, list: IList) {
    this.index = index;
    this.items = [];
    this.checkable = false;
    this.searchable = false;
    this.searchModel = null;
  }

  public getItems(): Array<IListItem> {
    return this.items;
  }

  public size(): number {
    return this.items.filter((item) => {
      return !(item.visible === false);
    }).length;
  }
}