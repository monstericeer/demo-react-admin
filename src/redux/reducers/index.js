//Reducer is a pure function that takes previous state and an action
//as arguments and returns the next State.
import zh_CN from '../../locale/zh_CN';
import en_US from '../../locale/en_US';

const language = navigator.language === 'zh-CN' ? 'zh-CN' : 'en-US';
const msgs = navigator.language === 'zh-CN' ? zh_CN : en_US;
const localLanguage = localStorage.language;
const localMsgs = localStorage.language === 'zh-CN' ? zh_CN : en_US;

// locale provider
export const localeReducer = (state = {locale: localLanguage || language, msgs: localMsgs || msgs}, action) => {
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

// sign in
export const tokenReducer = (state = {token: localStorage.getItem('token')}, action) => {
    switch (action.type) {
        case 'TOKEN':
            return {
                token: action.token
            };
        default:
            return state;
    }
};