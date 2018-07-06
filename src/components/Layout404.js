import React from 'react';
import '../css/Layout404.css';

class Layout404 extends React.Component {
    render() {
        return (
            <div className="not_found">{this.props.children}</div>
        )
    }
}

export default Layout404;