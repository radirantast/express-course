const { authRegisterController } = require('../../controllers/auth');
const User = require('../../database/schemas/User');
const { hashPassword } = require('../../utils/helpers');


jest.mock('../../utils/helpers', () => ({
    hashPassword: jest.fn(() => 'hash Password')
}));
jest.mock('../../database/schemas/User');

const req = {
    body: {
        email: 'fake_email',
        password: 'fake_password'
    }
};

const res = {
    status: jest.fn((x) => (x)),
    send: jest.fn((x) => (x)),
    sendStatus: jest.fn((x) => (x)),
};

it('should return status code of 400 when user is exist', async () => {
    User.findOne.mockImplementationOnce(() => ({
        id: 1,
        email: 'email',
        password: 'password'
    }));

    await authRegisterController(req, res);
    expect(res.sendStatus).toHaveBeenCalledWith(400);
});

it('should return status code of 200 if user is created', async () => {
    User.findOne.mockResolvedValueOnce(undefined);
    User.create.mockResolvedValueOnce(() => ({
        id: 1,
        email: 'email',
        password: 'password'
    }));

    await authRegisterController(req, res);

    expect(hashPassword).toHaveBeenCalledWith('fake_password');
    expect(User.create).toHaveBeenCalledWith({ email: 'fake_email', password: 'hash Password' });
});