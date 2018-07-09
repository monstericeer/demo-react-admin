//Actions are the only source of information for the store
//Send them to the store using store.dispatch()
import {addLocaleData} from 'react-intl';
import en_US from '../../locale/en_US';
import zh_CN from '../../locale/zh_CN';
import en from 'react-intl/locale-data/en';
import zh from 'react-intl/locale-data/zh';
import {signIn} from '../../api/api';

// locale provider
addLocaleData([...en, ...zh]);

const localeEN = () => {
    localStorage.language = 'en-US';
    return {
        type: 'LOCALE_EN',
        locale: 'en-US',
        msgs: en_US,
    }
};

const localeZH = () => {
    localStorage.language = 'zh-CN';
    return {
        type: 'LOCALE_ZH',
        locale: 'zh-CN',
        msgs: zh_CN,
    }
};

// sign in
const handleSignIn = (params) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            signIn(params).then(res => {
                const data = res.data;
                if (data) {
                    dispatch(token(data.token));
                    localStorage.token = data.token;
                    localStorage.timeStamp = new Date().getTime();
                    resolve(data);
                } else {
                    resolve(-1)
                }
            }).catch(err => {
                reject(err)
            })
        });
    }
};

const token = (token) => ({
    type: 'TOKEN',
    token
});

export {
    localeEN,
    localeZH,
    handleSignIn
}