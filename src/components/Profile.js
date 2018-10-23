import React from 'react';
import { connect } from 'react-redux';
import {Button, Card, Row, Col, Form, Input, Radio, DatePicker, Cascader, Upload, Icon} from 'antd';
import moment from 'moment';
import {handleProfile, handleEditProfile} from "../redux/actions";
import options from '../locale/locale-data';
import utils from "../libs/utils";
import {baseURL} from '../config/url';
import '../assets/css/profile.less';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

const mapStateToProps = (state) => {
    return {
        profile: state.profileReducer.profile,
        msgs: state.localeReducer.msgs,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleProfile: () => dispatch(handleProfile()),
        handleEditProfile: (params) => dispatch(handleEditProfile(params))
    }
};

class Profile extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            picLoading: false
        }
    }

    handleClick = (e) => {
        e.preventDefault();
        const {editSuccess, editFail} = this.props.msgs.userInfo;
        this.props.form.validateFields((err, values) => {
            if (!err && values) {
                const params = {
                    gender: values['gender'],
                    birthday: values['birthday'] ? values['birthday'].format('YYYY-MM-DD') : null,
                    province: values['provinceAndCity'][0] || null,
                    city: values['provinceAndCity'][1] || null,
                };
                this.props.handleEditProfile(params).then(res => {
                    res === -1 ? utils.nMessage.error(editFail) : utils.nMessage.success(editSuccess);
                }).catch(err => {
                    utils.nMessage.error(editFail)
                });
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

    beforeUpload = (file) => {
        const {uploadFormat, uploadSize} = this.props.msgs.userInfo;
        const isJPG = file.type === 'image/jpeg';
        if (!isJPG) {
            utils.nMessage.error(uploadFormat)
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            utils.nMessage.error(uploadSize)
        }
        return isJPG && isLt2M;
    };

    handleChange = (info) => {
        const {uploadSuccess, uploadFail} = this.props.msgs.userInfo;
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            this.getBase64(info.file.originFileObj, imageUrl => this.setState({
                imageUrl,
                loading: false,
            }));
            utils.nMessage.success(uploadSuccess);
            this.props.handleProfile();
        }
        if (info.file.status === 'error') {
            utils.nMessage.error(uploadFail)
        }
    };

    getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    };

    componentDidMount() {
        this.props.handleProfile();
    }

    render() {
        const {userInfo} = this.props.msgs;
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
                label: userInfo.name,
                key: 'name',
                initialValue: name,
                disabled: true,
            },
            {
                label: userInfo.mobile,
                key: 'mobile',
                initialValue: mobile,
                disabled: true,
            },
            {
                label: userInfo.balance,
                key: 'balance',
                initialValue: String(balance),
                disabled: true,
            },
        ];
        const uploadButton = (
            <div>
                <Icon type={this.state.picLoading ? 'loading' : 'plus'} />
                <div>Upload</div>
            </div>
        );
        return (
            <Card bordered={false} className='profile'>
                <Row type="flex" justify="space-around">
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
                            <FormItem label={userInfo.gender} {...formItemLayout}>
                                {getFieldDecorator('gender', {
                                    initialValue: gender,
                                })(
                                    <RadioGroup>
                                        <Radio value="male">{userInfo.male}</Radio>
                                        <Radio value="female">{userInfo.female}</Radio>
                                    </RadioGroup>
                                )}
                            </FormItem>
                            <FormItem label={userInfo.birthday} {...formItemLayout}>
                                {getFieldDecorator('birthday', {
                                    initialValue: birthday ? moment(birthday, 'YYYY-MM-DD') : null,
                                })(
                                    <DatePicker placeholder={userInfo.birthdayPlaceholder} style={{ width: '100%' }}/>
                                )}
                            </FormItem>
                            <FormItem label={userInfo.locale} {...formItemLayout}>
                                {getFieldDecorator('provinceAndCity', {
                                    initialValue: [province, city],
                                })(
                                    <Cascader  placeholder={userInfo.localePlaceholder} options={this.preProcessingLocale(options)}/>
                                )}
                            </FormItem>
                            <FormItem {...tailFormItemLayout}>
                                <Button type="primary" onClick={this.handleClick}>{userInfo.buttonText}</Button>
                            </FormItem>
                        </Form>
                    </Col>
                    <Col  xs={24} sm={24} md={8}>
                        <Upload
                            name="avatar"
                            listType="picture-card"
                            className="avatar"
                            showUploadList={false}
                            action={baseURL + 'users/avatarEdit'}
                            headers={{Authorization: `Bearer ${localStorage.getItem('token')}`}}
                            beforeUpload={this.beforeUpload}
                            onChange={this.handleChange}
                        >
                            {avatar ? <img src={ baseURL + avatar} alt=''/> : uploadButton}
                        </Upload>
                    </Col>
                </Row>
            </Card>
        )
    }
}

export default Form.create()(connect(mapStateToProps, mapDispatchToProps)(Profile));