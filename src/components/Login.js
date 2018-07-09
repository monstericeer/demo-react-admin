import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import {Row, Col, Card, Form, Input, Icon, Button, message} from 'antd';
import {handleSignIn} from "../redux/actions";
import '../assets/css/login.less'

const FormItem = Form.Item;

const mapStateToProps = (state) => {
    return {
        msgs: state.localeReducer.msgs,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleSignIn: (params) => dispatch(handleSignIn(params)),
    }
};

class Login extends React.Component {

    handleClick = (e) => {
        e.preventDefault();
        const {loginSuccess, loginFail} = this.props.msgs.messages;
        this.props.form.validateFields((err, values) => {
            if (!err && values) {
                this.props.handleSignIn(values).then(res => {
                    res === -1 ? message.error(loginFail) : message.success(loginSuccess);
                }).catch(err => {
                    message.error(loginFail)
                })
            }
        });
    };

    render() {
        const {loginIntro, loginForm} = this.props.msgs;
        const {getFieldDecorator} = this.props.form;
        const formItems= [
            {
                key: 'mobile',
                required: true,
                emptyMessage: loginForm.emptyMobile,
                pattern: /^[1][3,4,5,7,8][0-9]{9}$/,
                errorMessage: loginForm.errorMobile,
                icon: 'user',
                type: 'text',
                placeholder: loginForm.phMobile,
                title: loginForm.phMobile
            },
            {
                key: 'password',
                required: true,
                emptyMessage: loginForm.emptyPassword,
                pattern: '',
                errorMessage: '',
                icon: 'lock',
                type: 'password',
                placeholder: loginForm.phPassword,
                title: loginForm.phPassword
            }
        ];
        return (
            <Row type="flex" justify="space-around" className='login_content'>
                <Col xs={0} sm={0} md={10} className='login_intro'>
                    <h2>{loginIntro.title}</h2>
                    <p>{loginIntro.details}</p>
                </Col>
                <Col xs={12} sm={12} md={6} className='login_wrapper'>
                    <Card className="login_card" title={loginForm.title} >
                        <Form>
                            {
                                formItems.map((item, i) => (
                                    <FormItem className="form_item" key={i} label={null/*item.label*/}>
                                        {getFieldDecorator(item.key, {
                                            validate: [{
                                                trigger: 'onBlur',
                                                rules: [
                                                    {required: item.required, message: item.emptyMessage}
                                                ],
                                            }, {
                                                trigger: 'onBlur', // ['onBlur', 'onChange']
                                                rules: [
                                                    { pattern: item.pattern, message: item.errorMessage }
                                                ],
                                            }],
                                        })(
                                            <Input
                                                addonBefore={<Icon type={item.icon}/>}
                                                type={item.type}
                                                placeholder={item.placeholder}
                                                title={item.title}
                                            />
                                        )}
                                    </FormItem>
                                ))
                            }
                            <FormItem className="login_button">
                                <Button type="primary" onClick={this.handleClick}>{loginForm.button}</Button>
                            </FormItem>
                        </Form>
                        <Link className='login_footer' to='/signup'>{loginForm.signup}</Link>
                    </Card>
                </Col>
            </Row>
        )
    }
}

export default Form.create()(connect(mapStateToProps, mapDispatchToProps)(Login));