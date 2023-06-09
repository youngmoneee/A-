export enum eContent {
  TEXT,
  IMAGE,
}
export interface IChat {
  userName?: string;
  userImg?: string;
  data: string;
  chatType: eContent;
}