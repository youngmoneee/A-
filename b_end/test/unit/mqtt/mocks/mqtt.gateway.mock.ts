export const mockMqttGateway = {
  publish: jest
    .fn()
    .mockImplementation((device: string, data: object) => undefined),
};
