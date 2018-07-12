import axios from '../libs/api.request';

export const signIn = (params) => {
    return axios.request({
        url: 'users/signin',
        data: params,
        method: 'post'
    })
};

export const smsCaptcha = (params) => {
    return axios.request({
        url: 'users/getSmsCaptcha',
        data: params,
        method: 'post'
    })
};

export  const signUp = (params) => {
    return axios.request({
        url: 'users/signup',
        data: params,
        method: 'post'
    })
};