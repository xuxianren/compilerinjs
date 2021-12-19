interface Inode {
  id: number;
  label: string;
  shape?: string;
  color?: string;
  toolText?: string;
}

interface IEdge {
  id: number;
  source: number;
  target: number;
  label?: string;
  color?: string;
  [propName: string]: any;
}

interface IData {
  nodes: Inode[];
  edges: IEdge[];
}