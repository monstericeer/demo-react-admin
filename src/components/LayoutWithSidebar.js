/**
 * Created by Mo Chen on 4/25/2018.
 */
import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {Layout, Menu, Icon, Dropdown, Avatar, Breadcrumb, Button} from 'antd';
import {localeEN, localeZH, handleSignOut} from "../redux/actions";
import '../assets/css/layoutHasSidebar.less';
import utils from "../libs/utils";

const mapStateToProps = (state) => {
    return {
        locale: state.localeReducer.locale,
        msgs: state.localeReducer.msgs,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        localeZH: () => dispatch(localeZH()),
        localeEN: () => dispatch(localeEN()),
        handleSignOut: () => dispatch(handleSignOut())
    }
};

const { Header, Content, Sider, Footer } = Layout;

const navBar = [
    {linkTo: 'home', name: 'home', icon: 'home'},
    {linkTo: 'products', name: 'products', icon: 'book'},
];

class LayoutWithSidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false
        }
    }

    handleClick = () => {
        if (this.props.locale === 'zh-CN') {
            this.props.localeEN();
        } else if (this.props.locale === 'en-US') {
            this.props.localeZH();
        }
    };

    handleSignOut = () => {
        const {logoutSuccess, logoutFail} = this.props.msgs.messages;
        this.props.handleSignOut().then(res => {
            res === -1 ? utils.nMessage.error(logoutFail) : utils.nMessage.success(logoutSuccess);
        }).catch(err => {
            utils.nMessage.error(logoutFail)
        })
    };

    render() {
        const {navItem, userMenu} = this.props.msgs;
        const menu = (
            <Menu className="header_menu">
                <Menu.Item key="0">{userMenu.profile}</Menu.Item>
                <Menu.Divider />
                <Menu.Item key="1" onClick={this.handleSignOut}>{userMenu.signout}</Menu.Item>
            </Menu>
        );
        return (
            <Layout className="outer_layout">
                <Sider
                    theme="dark"
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}
                    className="nav_bar"
                >
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        selectedKeys={
                            navBar.map((item) => {
                                if (this.props.location.pathname.split('/')[1] === item.linkTo) {
                                    return item.name
                                }
                                return null
                            })
                        }
                        mode="inline"
                        className="menu_items"
                    >
                        {
                            navBar.map((item, index) => (
                                <Menu.Item key={item.name}>
                                    <NavLink to={`/${item.linkTo}`}>
                                        <Icon type={item.icon} />
                                        {this.state.collapsed ? '' : <span>{navItem[item.name]}</span>}
                                    </NavLink>
                                </Menu.Item>
                            ))
                        }
                    </Menu>

                </Sider>
                <Layout className="inner_layout">
                    <Header className="header_bar">
                        <div className='toggle_wrapper'>
                            <Icon
                                className="trigger"
                                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                onClick={() => this.setState({collapsed: !this.state.collapsed})}
                            />
                            <Button type='default' size='small' onClick={this.handleClick}>
                                {this.props.locale === 'zh-CN' ? 'EN' : '中文'}
                            </Button>
                        </div>
                        <div className="header_right">
                            <Dropdown overlay={menu} trigger={['hover']}>
                                <div className="user">
                                    <div className="name">Mo Chen</div>
                                    <Avatar>Mo</Avatar>
                                </div>
                            </Dropdown>
                        </div>
                    </Header>
                    <Content className="content_wrapper">
                        <Breadcrumb className="breadcrumb">
                            {
                                this.props.location.pathname.split('/').map((str, index) => (
                                    navBar.map((item, index) => {
                                        if (item.linkTo === str)
                                            return <Breadcrumb.Item key={index}>{navItem[item.name]}</Breadcrumb.Item>;
                                        return null;
                                    })
                                ))
                            }
                        </Breadcrumb>
                        <div className="content">
                            {this.props.children}
                        </div>
                    </Content>
                    <Footer className="footer">demo-react-admin @ https://github.com/mochen0505</Footer>
                </Layout>
            </Layout>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LayoutWithSidebar));