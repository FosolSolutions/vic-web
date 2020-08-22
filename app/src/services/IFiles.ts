import IFile from "./IFile";

export default interface IFiles {
  page: number;
  total: number;
  items: IFile[];
}
