import React from 'react';
import {Card} from 'antd';
import {handleProfile} from "../redux/actions";
import connect from "react-redux/es/connect/connect";

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

    componentDidMount() {
        this.props.handleProfile();
    }

    render() {
        console.log(this.props.profile);
        return (
            <Card bordered={false} className='content'>
                Profile
            </Card>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);