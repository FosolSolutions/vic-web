interface IFile {
  id?: number;
  name: string;
  path: string;
  isDir: boolean;
  description?: string;
  author?: string;
  publishedOn?: Date;
  createdOn?: Date;
  updatedOn?: Date;
}

export default IFile;
