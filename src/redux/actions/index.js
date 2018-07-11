//Actions are the only source of information for the store
//Send them to the store using store.dispatch()
import {addLocaleData} from 'react-intl';
import en_US from '../../locale/en_US';
import zh_CN from '../../locale/zh_CN';
import en from 'react-intl/locale-data/en';
import zh from 'react-intl/locale-data/zh';
import {signIn} from '../../api/api';
import utils from '../../libs/utils';

// locale provider
addLocaleData([...en, ...zh]);

const localeEN = () => {
    window.localStorage.setItem('language', 'en-US');
    return {
        type: 'LOCALE_EN',
        locale: 'en-US',
        msgs: en_US,
    }
};

const localeZH = () => {
    window.localStorage.setItem('language', 'zh-CN');
    return {
        type: 'LOCALE_ZH',
        locale: 'zh-CN',
        msgs: zh_CN,
    }
};

const handleLoading = (isLoading) => ({
    type: 'LOADING',
    isLoading
});

const token = (token) => {
    window.localStorage.setItem('token', token);
    return {
        type: 'TOKEN',
        token
    }
};

const handleSignIn = (params) => {
    return (dispatch, getState) => {
        utils.nProgress().start();
        dispatch(handleLoading(true));
        return new Promise((resolve, reject) => {
            signIn(params).then(res => {
                const data = res.data;
                if (data) {
                    dispatch(token(data.token));
                    resolve(data);
                } else {
                    resolve(-1);
                }
            }).catch(err => {
                reject(err)
            }).finally(res => {
                dispatch(handleLoading(false));
                utils.nProgress().done();
            })
        });
    }
};

export {
    localeEN,
    localeZH,
    handleSignIn,
}