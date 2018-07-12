import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import {Row, Col, Card, Form, Input, Icon, Button, Checkbox} from 'antd';
import utils from '../libs/utils';
import '../assets/css/signup.less';
import {handleCaptcha, handleSignUp} from "../redux/actions";

const FormItem = Form.Item;

const mapStateToProps = (state) => {
    return {
        locale: state.localeReducer.locale,
        msgs: state.localeReducer.msgs,
        isLoading: state.loadingReducer.isLoading,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleCaptcha: (params) => dispatch(handleCaptcha(params)),
        handleSignUp: (params) => dispatch(handleSignUp(params)),
    }
};

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // confirm password
            confirmDirty: false,
            // captcha button
            disabled: false,
            // captcha count
            count: 60

        };
    }

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    checkPassword = (rule, value, callback) => {
        const {form} = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback(rule.message);
        } else {
            callback();
        }
    };

    checkConfirm = (rule, value, callback) => {
        const {form} = this.props;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirmPassword'], { force: true });
        }
        callback();
    };

    checkTerm = (rule, value, callback) => {
        return callback(value ? undefined : rule.message);
    };

    countDown = () => {
        if (this.state.disabled) {
            this.setState({count: this.state.count - 1});
            if (this.state.count < 1) {
                this.setState({
                    count: 60,
                    disabled: false,
                });
            }
        }
    };

    handleCaptchaClick = (e) => {
        e.preventDefault();
        const {smsCaptchaSuccess, smsCaptchaFail} = this.props.msgs.messages;
        this.props.form.validateFields(['mobile'], (err, values) => {
            if (!err && values) {
                this.props.handleCaptcha(values).then(res => {
                    if (res === -1) {
                        utils.nMessage.error(smsCaptchaFail);
                    } else {
                        utils.nMessage.success(smsCaptchaSuccess);
                        this.setState({disabled: true});
                    }
                }).catch(err => {
                    utils.nMessage.error(smsCaptchaFail)
                })
            }
        });
    };

    handleClick = (e) => {
        e.preventDefault();
        const {signupSuccess, signupFail} = this.props.msgs.messages;
        this.props.form.validateFields((err, values) => {
            if (!err && values) {
                this.props.handleSignUp(values).then(res => {
                    res === -1 ? utils.nMessage.error(signupFail) : utils.nMessage.success(signupSuccess);
                }).catch(err => {
                    utils.nMessage.error(signupFail)
                })
            }
        });
    };

    componentDidMount() {
        this.interval = setInterval(this.countDown, 1000);
    };

    // uninstall the component to prevent the warning of setState of an unmounted component
    componentWillUnmount() {
        clearInterval(this.interval);
    };

    render() {
        const {locale, isLoading} = this.props;
        const {signupForm} = this.props.msgs;
        const {getFieldDecorator} = this.props.form;
        const formItems= [
            {
                key: 'name',
                required: true,
                emptyMessage: signupForm.emptyName,
                pattern: /([a-zA-Z0-9]|[\u4E00-\u9FA5]){5,12}/,
                errorMessage: signupForm.errorName,
                icon: 'user',
                type: 'text',
                placeholder: signupForm.phName,
                title: signupForm.phName,
                layout: {sx: 24, sm: 24, md: 24},
            },
            {
                key: 'mobile',
                required: true,
                emptyMessage: signupForm.emptyMobile,
                pattern: /^[1][3,4,5,7,8][0-9]{9}$/,
                errorMessage: signupForm.errorMobile,
                icon: 'mobile',
                type: 'text',
                placeholder: signupForm.phMobile,
                title: signupForm.phMobile,
                layout: {sx: 24, sm: 24, md: 24},
            },
            {
                key: 'password',
                required: true,
                emptyMessage: signupForm.emptyPassword,
                pattern: /([a-zA-Z0-9_]){6,13}/,
                errorMessage: signupForm.errorPassword,
                validator: this.checkConfirm,
                icon: 'lock',
                type: 'password',
                placeholder: signupForm.phPassword,
                title: signupForm.phPassword,
                layout: {sx: 24, sm: 24, md: 24},
            },
            {
                key: 'confirmPassword',
                required: true,
                emptyMessage: signupForm.emptyCheckPass,
                validator: this.checkPassword,
                vMessage: signupForm.errorCheckPass,
                icon: 'lock',
                type: 'password',
                placeholder: signupForm.phCheckPass,
                title: signupForm.phCheckPass,
                layout: {sx: 24, sm: 24, md: 24},
            },
            {
                key: 'captcha',
                required: true,
                emptyMessage: signupForm.emptyCaptcha,
                icon: 'mail',
                type: 'text',
                placeholder: signupForm.phCaptcha,
                title: signupForm.phCaptcha,
                layout: {sx: 12, sm: 12, md: 12},
            },
            {
                key: 'term',
                validator: this.checkTerm,
                vMessage: signupForm.termMessage,
                term: signupForm.term,
                layout: {sx: 24, sm: 24, md: 24},
            },
        ];
        return (
            <Row type="flex" justify="space-around" className='signup_content'>
                <Col xs={18} sm={12} md={6} className='signup_wrapper'>
                    <Card className="signup_card" title={signupForm.title} >
                        <Form>
                            {
                                formItems.map((item, i) => (
                                    <FormItem className="form_item" key={i} label={null/*item.label*/}>
                                        <Row type="flex" justify="space-between" align="middle">
                                            <Col xs={item.layout.sx} sm={item.layout.sm} md={item.layout.md}>
                                                {item.key !== 'term' ? getFieldDecorator(item.key, {
                                                    validate: [{
                                                        trigger: 'onBlur',
                                                        rules: [
                                                            {required: item.required, message: item.emptyMessage}
                                                        ],
                                                    }, {
                                                        trigger: ['onBlur', 'onChange'],
                                                        rules: [
                                                            { pattern: item.pattern, message: item.errorMessage },
                                                            { validator: item.validator, message: item.vMessage }
                                                        ],
                                                    }],
                                                })(
                                                    <Input
                                                        prefix={<Icon type={item.icon}/>}
                                                        type={item.type}
                                                        placeholder={item.placeholder}
                                                        title={item.title}
                                                        onBlur={this.handleConfirmBlur}
                                                    />
                                                ) : getFieldDecorator(item.key, {
                                                    validate: [{
                                                        trigger: ['onBlur', 'onChange'],
                                                        rules: [{ validator: item.validator, message: item.vMessage }],
                                                    }],
                                                })(
                                                    <Checkbox className="signup_check">{item.term}</Checkbox>
                                                )}
                                            </Col>
                                            {
                                                item.key === 'captcha' &&
                                                <Col xs={10} sm={10} md={10}>
                                                    <Button className="captcha_button"
                                                            type="default"
                                                            onClick={this.handleCaptchaClick}
                                                            disabled={this.state.disabled}>
                                                        {
                                                            !this.state.disabled ?
                                                                signupForm.captchaButtonText :
                                                                (
                                                                    locale === 'zh-CN' ?
                                                                        this.state.count + signupForm.captchaButtonTextPressed :
                                                                        signupForm.captchaButtonTextPressed + this.state.count + 's'
                                                                )
                                                        }
                                                    </Button>
                                                </Col>
                                            }
                                        </Row>
                                    </FormItem>
                                ))
                            }
                            <FormItem className="signup_button">
                                <Button type="primary" onClick={this.handleClick} loading={isLoading}>{signupForm.button}</Button>
                            </FormItem>
                        </Form>
                        <Link className='signup_footer' to='/login'>{signupForm.login}</Link>
                    </Card>
                </Col>
            </Row>
        )
    }
}

export default Form.create()(connect(mapStateToProps, mapDispatchToProps)(Signup));