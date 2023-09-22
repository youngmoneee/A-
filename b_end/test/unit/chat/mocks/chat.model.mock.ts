import { Chat } from '../../../../src/dto/createChatDto';

const chatDb: Chat[] = [];
export const mockChatModel = function (chat) {
  this.data = chat;
};
mockChatModel.find = jest.fn().mockReturnValue({
  exec: jest.fn().mockResolvedValue(chatDb),
});
mockChatModel.prototype.save = jest.fn().mockImplementation(async function () {
  chatDb.push(this.data);
  return this.data;
});
mockChatModel.save = jest.fn().mockImplementation((data) => {
  chatDb.push(data);
});
mockChatModel.clear = jest.fn().mockImplementation(() => (chatDb.length = 0));
