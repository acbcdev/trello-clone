export type Column = {
  id: string;
  title: string;
  items: Row[];
  isAdding: boolean;
  isEditing: boolean;
};

export type Row = {
  name: string;
  id: number;
  description: string;
  tags: string[];
  isEditing: boolean;
  isOpen: boolean;
}

export type TDialog = Row & { list: string, ColumnId: string }
