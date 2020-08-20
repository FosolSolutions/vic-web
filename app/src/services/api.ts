const api = process?.env?.API_URL ?? "https://localhost:10443"; // TODO: For some reason react is not using the .env file...

const fileStation = `${api}/filestation`;
const FileStation = {
  Shares: () => `${fileStation}/shares`,
  Files: (path: string) => `${fileStation}/files?path=${path}`,
  Download: (path: string) => `${fileStation}/files/download?path=${path}`,
  Thumbnail: (path: string) => `${fileStation}/files/thumb?patth=${path}`,
};

const metadata = `${api}/metadata`;
const Metadata = {
  Get: (id: number) => `${metadata}/items/${id}`,
  GetByPath: (path: string) => `${metadata}/items?path=${path}`,
  Add: () => `${metadata}/items`,
  Update: (id: number) => `${metadata}/items/${id}`,
  Remove: (id: number) => `${metadata}/items/${id}`,
};

export default {
  FileStation: FileStation,
  Metadata: Metadata,
};
