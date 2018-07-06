/**
 * Created by Mo Chen on 4/25/2018.
 */
import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {Layout, Menu, Icon, Dropdown, Avatar, Breadcrumb, Button} from 'antd';
import {localeEN, localeZH, navToggle} from "../redux/actions";
import '../css/LayoutWithSidebar.css';

const mapStateToProps = (state) => {
    return {
        locale: state.localeReducer.locale,
        msgs: state.localeReducer.msgs,
        toggle: state.navToggleReducer.toggle,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        localeZH: () => dispatch(localeZH()),
        localeEN: () => dispatch(localeEN()),
        onToggle: () => dispatch(navToggle()),
    }
};

const { Header, Content, Sider, Footer } = Layout;

const navBar = [
    {linkTo: '', name: 'home', icon: 'home'},
    {linkTo: 'messages', name: 'messages', icon: 'mail'},
];

class LayoutWithSidebar extends React.Component {

    handleClick = () => {
        if (this.props.locale === 'zh-CN') {
            this.props.localeEN();
        } else if (this.props.locale === 'en-US') {
            this.props.localeZH();
        }
    };

    render() {
        const menu = (
            <Menu className="header_menu">
                <Menu.Item key="0">退出</Menu.Item>
            </Menu>
        );
        return (
            <Layout className="outer_layout">
                <Sider
                    theme="dark"
                    trigger={null}
                    collapsible
                    collapsed={this.props.toggle}
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
                                        {this.props.toggle ? '' : <span>{this.props.msgs[item.name]}</span>}
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
                                type={this.props.toggle ? 'menu-unfold' : 'menu-fold'}
                                onClick={this.props.onToggle}
                            />
                            <Button type='default' size='small' onClick={this.handleClick}>
                                {this.props.locale === 'zh-CN' ? 'EN' : '中文'}
                            </Button>
                        </div>
                        <div className="header_right">
                            <Dropdown overlay={menu}>
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
                                            return <Breadcrumb.Item key={index}>{this.props.msgs[item.name]}</Breadcrumb.Item>;
                                        return null;
                                    })
                                ))
                            }
                        </Breadcrumb>
                        <div className="content">
                            {this.props.children}
                        </div>
                    </Content>
                    <Footer className="footer">footer</Footer>
                </Layout>
            </Layout>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LayoutWithSidebar));