import React, { Component } from "react";
import { connect } from "react-redux";

export default function withAuth(ComponentToBERendered) {
  class Authenticate extends Component {
    componentWillMount() {
      if (this.props.isAuthenticated === false) {
        this.props.history.push("/signin");
      }
    }

    componentWillUpdate(nextProps) {
      if (nextProps.isAuthenticated === false) {
        this.props.history.push("/signin");
      }
    }

    render() {
      return <ComponentToBERendered {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return {
      isAuthenticated: state.currentUser.isAuthenticated,
    };
  }

  return connect(mapStateToProps)(Authenticate);
}
