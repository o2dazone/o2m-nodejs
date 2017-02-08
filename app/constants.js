// action/reducers
export const RECEIVE_INDEX = 'RECEIVE_INDEX';
export const TOGGLE_RESULTS = 'TOGGLE_RESULTS';
export const RECEIVE_SEARCH_RESULTS = 'RECEIVE_SEARCH_RESULTS';
export const PLAY_SONG = 'PLAY_SONG';
export const UPDATE_PERCENT_PLAYED = 'UPDATE_PERCENT_PLAYED';
export const TOGGLE_PLAY_PAUSE = 'TOGGLE_PLAY_PAUSE';
export const TOGGLE_SHUFFLE = 'TOGGLE_SHUFFLE';
export const RECEIVE_STREAM_URL = 'RECEIVE_STREAM_URL';


// local search regex stuff
export const STOP_WORDS = ['a', 'the', 'of', 'is'];
export const REPLACE_WEIRD_CHARACTERS = /-|&|\//g;
export const REPLACE_MORE_WEIRD_CHARACTERS = /'|\(|\)|\.|!/g;
