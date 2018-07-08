import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import {Row, Col, Card, Form, Input, Icon, Button} from 'antd';
import '../assets/css/Login.css';
import {signIn} from "../redux/actions";

const FormItem = Form.Item;

const mapStateToProps = (state) => {
    return {
        msgs: state.localeReducer.msgs,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (params) => dispatch(signIn(params)),
    }
};

class Login extends React.Component {

    handleClick = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err && values) {
                this.props.signIn(values)
            }
        });
    };

    componentDidMount() {
        if (new Date().getTime() - localStorage.timeStamp > 1000*60*60*24) { // 24 hours
            localStorage.clear();
        }
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
                        <Form className="login_form">
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