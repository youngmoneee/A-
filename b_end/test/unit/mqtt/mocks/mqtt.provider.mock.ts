export const mockMqttProvider = {
  createClient: jest.fn().mockReturnValue({
    on: jest.fn(),
    publish: jest.fn(),
    subscribe: jest.fn(),
    unsubscribe: jest.fn(),
    emit: jest.fn(),
  }),
};
