import React, { Component } from "react";
import { connect } from "react-redux";
import {
    Container
} from "@material-ui/core";

class ProjectEdit extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container>PROJECT EDIT</Container>
        );
    }
}
const mapStateToProps = store => {
    return {
        // project: store.project
    };
};
const mapDispatchToProps = dispatch => {
    return {
        // login: (username, password) => dispatch(login(username, password)),
        // signup: (username, password) => dispatch(signup(username, password)),
        // logout: () => dispatch(logout()),
        // removeErrors: () => dispatch(removeErrors())
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProjectEdit);
