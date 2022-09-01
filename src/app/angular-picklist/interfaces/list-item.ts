// It will represent the each indivisual item in list
export interface IListItem {
  visible?: boolean; // default true
  disable?: boolean; // default false
  content?: string;
  order?: number;
  selected?: boolean; // default false. make it true on selection by user
}