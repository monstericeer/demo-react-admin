//Actions are the only source of information for the store
//Send them to the store using store.dispatch()
import {addLocaleData} from 'react-intl';
import en_US from '../../locale/en_US';
import zh_CN from '../../locale/zh_CN';
import en from 'react-intl/locale-data/en';
import zh from 'react-intl/locale-data/zh';
import {signIn, smsCaptcha, signUp, signOut} from '../../api/api';
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
    if (token) {
        window.localStorage.setItem('token', token);
    } else {
        window.localStorage.removeItem('token');
    }
    return {
        type: 'TOKEN',
        token
    }
};

const handleSignIn = (params) => {
    return (dispatch, getState) => {
        utils.nProgress.start();
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
                utils.nProgress.done();
                dispatch(handleLoading(false));
            })
        });
    }
};

const handleCaptcha = (params) => {
    return (dispatch, getState) => {
        utils.nProgress.start();
        return new Promise((resolve, reject) => {
            smsCaptcha(params).then(res => {
                const data = res.data;
                if (data) {
                    resolve(data);
                } else {
                    resolve(-1);
                }
            }).catch(err => {
                reject(err)
            }).finally(res => {
                utils.nProgress.done();
            })
        });
    }
};

const handleSignUp = (params) => {
    return (dispatch, getState) => {
        utils.nProgress.start();
        dispatch(handleLoading(true));
        return new Promise((resolve, reject) => {
            signUp(params).then(res => {
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
                utils.nProgress.done();
                dispatch(handleLoading(false));
            })
        });
    }
};

const handleSignOut = () => {
    return (dispatch, getState) => {
        utils.nProgress.start();
        return new Promise((resolve, reject) => {
            signOut().then(res => {
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
                utils.nProgress.done();
            })
        });
    }
};

export {
    localeEN,
    localeZH,
    handleSignIn,
    handleCaptcha,
    handleSignUp,
    handleSignOut,
}