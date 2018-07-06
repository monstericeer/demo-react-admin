import React from 'react';
import { Layout } from 'antd';
import '../css/LayoutWithoutSidebar.css';

const { Header, Footer, Content } = Layout;

class LayoutWithoutSidebar extends React.Component {
    render() {
        return (
            <Layout className="login_layout">
                <Header className="header">
                    <div className="logo_wrapper">
                        <div className="logo" />
                    </div>
                </Header>
                <Content className="content_wrapper">{this.props.children}</Content>
                <Footer className="footer">Footer</Footer>
            </Layout>
        )
    }
}

export default LayoutWithoutSidebar