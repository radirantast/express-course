const { googleAuthRegisterController } = require('../../controllers/google');
const GoogleUser = require('../../database/schemas/googleSchema');

jest.mock('../../database/schemas/googleSchema');

const accessToken = '123';
const refreshToken = '1234';
const profile = {
    id: '43214234124131',
    displayName: 'google_name'
};

const done = jest.fn((x) => (x));

it('should return user if found', async () => {
    GoogleUser.findOne.mockResolvedValueOnce(() => ({
        id: 'id_123',
        googleId: profile.id,
        displayName: profile.displayName
    }));

    await googleAuthRegisterController(accessToken, refreshToken, profile, done);
    expect(GoogleUser.findOne).toHaveBeenCalledWith({ googleId: '43214234124131' });
});

it('should create user if not found', async () => {
    GoogleUser.findOne.mockResolvedValueOnce(undefined);
    GoogleUser.create.mockResolvedValueOnce(() => ({
        googleId: profile.id,
        displayName: profile.displayName
    }));

    await googleAuthRegisterController(accessToken, refreshToken, profile, done);
    expect(GoogleUser.create).toHaveBeenCalledWith({ googleId: '43214234124131', displayName: 'google_name' });
});