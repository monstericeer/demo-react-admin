const en_ZH = {
    // 提示信息
    messages: {
        loginSuccess: '登录成功',
        loginFail: '登录失败',
        signupSuccess: '注册成功',
        signupFail: '注册失败',
        smsCaptchaSuccess: '验证码已发送',
        smsCaptchaFail: '获取验证码失败',
        logoutSuccess: '登出成功',
        logoutFail: '登出失败',
    },
    // 登陆
    loginIntro: {
        title: '这是一个React的Demo',
        details: '目前使用到的技术栈包括ES6，Create-React-App，React v16.x，React-Router v4.x，Antd v3.x，React Intl，Redux v4.x，React-Redux v5.x，Axios，Redux-thunk，ServiceWorker，Less。下个版本的Demo将使用Webpack构建，使用Redux-saga代替目前的Redux-thunk方案。另外，将加入Selector，用于优化Redux状态管理。未来版本还可能加入Node中间层，服务端渲染，以及Immutable。',
    },
    loginForm: {
        title: '登录',
        emptyMobile: '手机号码不能为空',
        errorMobile: '请输入正确的手机号码',
        phMobile: '请输入手机号码',
        emptyPassword: '密码不能为空',
        errorPassword: '',
        phPassword: '请输入密码',
        button: '登录',
        signup: '免费注册',
    },
    signupForm: {
        title: '注册',
        emptyName: '请输入用户名',
        errorName: '5-12个字符,只可包含数字和中英文字符',
        phName: '请输入用户名',
        emptyMobile: '手机号码不能为空',
        errorMobile: '请输入正确的手机号码',
        phMobile: '请输入手机号码',
        emptyPassword: '密码不能为空',
        errorPassword: '6-13个字符,只可包含数字字母下划线',
        phPassword: '请输入密码',
        emptyCheckPass: '重复密码不能为空',
        errorCheckPass: '密码不一致',
        phCheckPass: '请重复输入密码',
        emptyCaptcha: '验证码不能为空',
        errorCaptcha: '',
        phCaptcha: '验证码',
        captchaButtonText: '验证码',
        captchaButtonTextPressed: '秒后重发',
        term: '同意服务条款及隐私声明',
        termMessage: '请勾选',
        button: '注册',
        login: '已经注册？立即登录',
    },
    // 导航栏
    navItem: {
        home: '首页',
        products: '产品列表',
        profile: '用户资料',
    },
    // 用户设置
    userMenu: {
        profile: '用户资料',
        signout: '退出',
    },
};

export default en_ZH;