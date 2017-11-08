import * as action from '../actions/index';

describe('actions', () => {
  it('should create an action for storeCurrentUser', () => {
    const user = {};
    const expectedAction = {
      type: 'STORE_CURRENT_USER',
      user
    };

    expect(action.storeCurrentUser(user)).toEqual(expectedAction);
  })

  it('should create an action for storeClickedArtist', () => {
    const artist = {};
    const expectedAction = {
      type: 'STORE_CLICKED_ARTIST',
      artist
    };

    expect(action.storeClickedArtist(artist)).toEqual(expectedAction);
  })

  it('should create an action for storeClickedImage', () => {
    const url = '';
    const id = 1
    const expectedAction = {
      type: 'STORE_CLICKED_IMAGE',
      url,
      id,
    };

    expect(action.storeClickedImage(url, id)).toEqual(expectedAction);
  })

  it('should create an action for storeAllArtists', () => {
    const artists = [];
    const expectedAction = {
      type: 'STORE_ALL_ARTISTS',
      artists
    };

    expect(action.storeAllArtists(artists)).toEqual(expectedAction);
  })
})