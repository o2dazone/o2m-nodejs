// action/reducers
export const RECEIVE_INDEX = 'RECEIVE_INDEX';
export const RECEIVE_SEARCH_RESULTS = 'RECEIVE_SEARCH_RESULTS';
export const PLAY_SONG = 'PLAY_SONG';
export const TOGGLE_PLAY_PAUSE = 'TOGGLE_PLAY_PAUSE';
export const TOGGLE_SHUFFLE = 'TOGGLE_SHUFFLE';
export const RECEIVE_STREAM_URL = 'RECEIVE_STREAM_URL';
export const RECEIVE_AUTOPLAY_TRACK = 'RECEIVE_AUTOPLAY_TRACK';

// local search stuff
export const STOP_WORDS = ['a', 'the', 'of', 'is'];
export const INDEX_URL = 'http://d2phn2ea0nqfsq.cloudfront.net/api/musicIndex.json';
export const STREAM_URL = 'https://xkjifuezph.execute-api.us-east-1.amazonaws.com/prod/o2m-getStreamUrl?id=';

// regexes
export const REPLACE_WEIRD_CHARACTERS = /-|&|\//g;
export const REPLACE_MORE_WEIRD_CHARACTERS = /'|\(|\)|\.|!/g;

// misc
export const PLAYER_ICON_SIZE = 40;
export const EMPTY_IMG = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';
