export type Column = {
  id: number
  title: string;
  items: Row[];

};

export type Row = {
  name: string;
  id: number;
  description: string;
  tags: string[];
}
