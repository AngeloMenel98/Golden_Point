import {
    USER_LOGGED_IN,
    USER_LOGGED_OUT,
    UserLoggedInAction,
    UserLoggedOutAction,
} from './types';

export const userLoggedIn = (jwt: string): UserLoggedInAction => ({
    type: USER_LOGGED_IN,
    payload: {
        jwt,
    },
});

export const userLoggedOut = (): UserLoggedOutAction => ({
    type: USER_LOGGED_OUT,
    payload: {},
});
