import {addLocaleData} from 'react-intl';
import en_US from '../../locale/en_US';
import zh_CN from '../../locale/zh_CN';
import en from 'react-intl/locale-data/en';
import zh from 'react-intl/locale-data/zh';

//Locale Provider
addLocaleData([...en, ...zh]);

let localeEN = () => ({
    type: 'LOCALE_EN',
    locale: 'en-US',
    msgs: en_US,
});

let localeZH = () => ({
    type: 'LOCALE_ZH',
    locale: 'zh-CN',
    msgs: zh_CN,
});

// navBar toggle
const navToggle = () => ({
    type: 'NAV_TOGGLE',
});

export {
    localeEN,
    localeZH,
    navToggle,
}