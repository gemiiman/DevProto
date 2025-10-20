export interface Document {
  id: string;
  title: string;
  type: string;
}

export interface Folder {
  id: string;
  name: string;
  isOpen?: boolean;
  documents: Document[];
}
