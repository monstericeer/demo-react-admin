//Actions are the only source of information for the store
//Send them to the store using store.dispatch()
import {addLocaleData} from 'react-intl';
import en_US from '../../locale/en_US';
import zh_CN from '../../locale/zh_CN';
import en from 'react-intl/locale-data/en';
import zh from 'react-intl/locale-data/zh';

const DEV_URL = process.env.REACT_APP_DEV_URL;
const PRO_URL = process.env.REACT_APP_PRO_URL;
const URL = process.env.NODE_ENV !== 'development' ? DEV_URL : PRO_URL;

// locale provider
addLocaleData([...en, ...zh]);

const localeEN = () => ({
    type: 'LOCALE_EN',
    locale: 'en-US',
    msgs: en_US,
});

const localeZH = () => ({
    type: 'LOCALE_ZH',
    locale: 'zh-CN',
    msgs: zh_CN,
});

// sign in
const signIn = (params) => {
    return (dispatch, getState) => {
        fetch(URL+'/users/signin', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(params)
        }).then(response => {
            if (response.ok) {
                return response.json();
            }
        }).then(res => {
            if (res.success === true) {
                const data = res.data;
                dispatch(token(data.token));
                localStorage.token = data.token;
                localStorage.timeStamp = new Date().getTime();
            } else {
                console.log(getState())
            }
        })
    }
};

const token = (token) => ({
    type: 'TOKEN',
    token
});

export {
    localeEN,
    localeZH,
    signIn
}