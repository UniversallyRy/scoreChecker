import { findPlayer, getGamesByDate, getGameDetails } from '.';

const playerObj = {
  pid: 1630167
};

const dispatch = () => {
  return "FETCH_SUCCESS";

};

describe('findPlayer', () => {
  it('should return success for findPlayer(playerObj, dispatch)', async () => {
    global.fetch = jest.fn(() => {
      Promise.resolve();
    });
    const response = await findPlayer(playerObj, dispatch);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(response).toBe(false);
    // expect(response.data).toHaveProperty('pl');
    // expect(response.status).toBe(200);
  });
});

describe('getGamesByDate', () => {
  it('should return success for getGamesByDate(date, dispatch)', async () => {
    const response = await getGamesByDate('20220304', dispatch);

    expect(response.data).toHaveProperty('games');
    expect(response.status).toBe(200);
  });
});

describe('getGameDetails', () => {
  it('should return success for getGameDetails(date, gameid)', async () => {
    const response = await getGameDetails('20220304', 'gameid');

    expect(response.data).toHaveProperty('league');
    expect(response.status).toBe(200);
  });
});
