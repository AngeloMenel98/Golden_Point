export const USER_LOGGED_IN = 'app/User/USER_LOGGED_IN';
export const USER_LOGGED_OUT = 'app/User/USER_LOGGED_OUT';
export const USER_PROFILE_LOADED = 'app/User/USER_PROFILE_LOADED';
export const USER_PROFILE_UNLOADED = 'app/User/USER_PROFILE_UNLOADED';

export interface UserLoggedInAction {
    type: typeof USER_LOGGED_IN;
    payload: {
        jwt: string;
    };
}

export interface UserLoggedOutAction {
    type: typeof USER_LOGGED_OUT;
    payload: {};
}
