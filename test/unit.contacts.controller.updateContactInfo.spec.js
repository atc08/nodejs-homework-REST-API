const { updateContactInfo } = require('../controllers/contacts');
const Contacts = require('../model/index');

jest.mock('../model/index');

describe('Unit test contacts controllers', () => {
  const req = { user: { id: 1 }, body: {}, params: { id: 3 } };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn((data) => data),
  };
  const next = jest.fn();

  it('without contact in Db', async () => {
    Contacts.updateContact = jest.fn();
    const result = await updateContactInfo(req, res, next);
    expect(result.status).toEqual('error');
    expect(result.code).toEqual(404);
    expect(result.message).toEqual('Not found');
  });

  it('Db return an exception', async () => {
    // Contacts.updateContact = jest.fn(() => {
    //   throw new Error('Oops');
    // });
    // await updateContactInfo(req, res, next);
    // expect(next).toHaveBeenCalled();
  });
});
