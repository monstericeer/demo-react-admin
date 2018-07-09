import axios from '../libs/api.request';

export const signIn = (params) => {
    return axios.request({
        url: 'users/signin',
        data: params,
        method: 'post'
    })
};