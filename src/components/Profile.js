import React from 'react';
import { connect } from 'react-redux';
import {Button, Card, Row, Col, Form, Input, Radio, DatePicker, Cascader} from 'antd';
import moment from 'moment';
import {handleProfile} from "../redux/actions";
import options from '../locale/locale-data';
import utils from "../libs/utils";

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

const mapStateToProps = (state) => {
    return {
        profile: state.profileReducer.profile,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleProfile: () => dispatch(handleProfile())
    }
};

class Profile extends React.Component {

    handleClick = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err && values) {
                const params = {
                    gender: values['gender'],
                    birthday: values['birthday'].format('YYYY-MM-DD'),
                    province: values['provinceAndCity'][0],
                    city: values['provinceAndCity'][1],
                };
                console.log(params)
            }
        });
    };

    preProcessingLocale = (options) => {
        for (let province of options) {
            if (province.children) {
                for (let city of province.children) {
                    if (city.children && city.children.length === 0) {
                        delete city.children
                    }
                }
            }
        }
        return options
    };

    componentDidMount() {
        this.props.handleProfile();
    }

    render() {
        console.log(this.props.profile);
        const {name, mobile, balance, gender, birthday, province, city, avatar} = this.props.profile;
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 7 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 17 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 7,
                },
            },
        };
        const formItems= [
            {
                label: '姓名',
                key: 'name',
                initialValue: name,
                disabled: true,
            },
            {
                label: '手机号码',
                key: 'mobile',
                initialValue: mobile,
                disabled: true,
            },
            {
                label: '余额',
                key: 'balance',
                initialValue: String(balance),
                disabled: true,
            },
        ];
        return (
            <Card bordered={false} className='content'>
                <Row type="flex" justify="start">
                    <Col xs={24} sm={24} md={8}>
                        <Form>
                            {
                                formItems.map((item, i) => (
                                    <FormItem key={i} label={item.label} {...formItemLayout}>
                                        {getFieldDecorator(item.key, {
                                            initialValue: item.initialValue,
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
                                                type={item.type}
                                                placeholder={item.placeholder}
                                                disabled={item.disabled}
                                            />
                                        )}
                                    </FormItem>
                                ))
                            }
                            <FormItem label='性别' {...formItemLayout}>
                                {getFieldDecorator('gender', {
                                    initialValue: gender,
                                })(
                                    <RadioGroup>
                                        <Radio value="male">男</Radio>
                                        <Radio value="female">女</Radio>
                                    </RadioGroup>
                                )}
                            </FormItem>
                            <FormItem label='生日' {...formItemLayout}>
                                {getFieldDecorator('birthday', {
                                    initialValue: moment(birthday, 'YYYY-MM-DD'),
                                })(
                                    <DatePicker placeholder='选择日期' style={{ width: '100%' }}/>
                                )}
                            </FormItem>
                            <FormItem label='所在省市' {...formItemLayout}>
                                {getFieldDecorator('provinceAndCity', {
                                    initialValue: [province, city],
                                })(
                                    <Cascader  placeholder='选择所在省市' options={this.preProcessingLocale(options)}/>
                                )}
                            </FormItem>
                            <FormItem {...tailFormItemLayout}>
                                <Button type="primary" onClick={this.handleClick}>修改</Button>
                            </FormItem>
                        </Form>
                    </Col>
                </Row>
            </Card>
        )
    }
}

export default Form.create()(connect(mapStateToProps, mapDispatchToProps)(Profile));