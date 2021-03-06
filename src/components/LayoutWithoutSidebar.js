import React from 'react';
import { connect } from 'react-redux';
import { Layout, Button } from 'antd';
import {localeEN, localeZH} from "../redux/actions";
import '../assets/css/layoutHasNoSidebar.less';

const mapStateToProps = (state) => {
    return {
        locale: state.localeReducer.locale,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        localeZH: () => dispatch(localeZH()),
        localeEN: () => dispatch(localeEN()),
    }
};

const { Header, Footer, Content } = Layout;

class LayoutWithoutSidebar extends React.Component {

    handleClick = () => {
        if (this.props.locale === 'zh-CN') {
            this.props.localeEN();
        } else if (this.props.locale === 'en-US') {
            this.props.localeZH();
        }
    };

    render() {
        return (
            <Layout className="no_sider_layout">
                <Header className="header">
                    <div className="logo_wrapper">
                        <div className="logo" />
                    </div>
                    <Button ghost size='small' onClick={this.handleClick}>
                        {this.props.locale === 'zh-CN' ? 'EN' : '中文'}
                    </Button>
                </Header>
                <Content className="content_wrapper">{this.props.children}</Content>
                <Footer className="footer">demo-react-admin @ https://github.com/mochen0505</Footer>
            </Layout>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LayoutWithoutSidebar);