import zh_CN from '../../locale/zh_CN';
import en_US from '../../locale/en_US';

//Locale Provider
const msgs = navigator.language === 'zh-CN' ? zh_CN : en_US;
const language = navigator.language === 'zh-CN' ? 'zh-CN' : 'en-US';

let localeReducer = (state = {locale: language, msgs: msgs}, action) => {
    switch (action.type) {
        case 'LOCALE_EN':
            return {
                locale: action.locale,
                msgs: action.msgs,
            };
        case 'LOCALE_ZH':
            return {
                locale: action.locale,
                msgs: action.msgs,
            };
        default:
            return state;
    }
};

// navBar toggle
const navToggleReducer = (state = {toggle: false}, action) => {
    switch (action.type) {
        case 'NAV_TOGGLE':
            return {
                toggle: !state.toggle
            };
        default:
            return state;
    }
};

export {
    localeReducer,
    navToggleReducer,
}