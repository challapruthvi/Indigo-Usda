import PropTypes from 'prop-types';
import React, {Component} from "react";

export default class Main extends Component {

    static get propTypes() {
        return {
            children: PropTypes.node,
            location: PropTypes.obect
        };
    }

    render() {
        const {children} = this.props;
        return (
        <div id="maincontent">{children}</div>
        );
    }
}
