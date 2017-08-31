import React from "react";
import Home from "./page/HomePage";

import Header from "./component/Header";

export default class TestApplication extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Header/>

                {this.props.children || <Home/>}
            </div>
        )
    }
}
