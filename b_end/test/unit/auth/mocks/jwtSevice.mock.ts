export const mockJwtService = {
  sign: jest.fn().mockReturnValue('verified-jwt'),
  verify: jest.fn().mockReturnValue((jwt) => {
    if (jwt === 'verified-jwt') return true;
    return false;
  }),
};
