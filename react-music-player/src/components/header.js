/**
 * Created by roy-lau on 2017/9/6 0006.
 */
//import React from 'react';
import React, { Component } from 'react';
import './header.less';

console.log(React)
//let Header = React.createClass({
//    render(){
//        return (
//            <div className="components-header row">
//                <img src="./static/imgs/logo.png" width="40px" className="-col-auto" alt="logo"/>
//                <h1>React </h1>
//            </div>
//        );
//    }
//});
class Header extends Component {
    render() {
        return (
            <div className="components-header row">
                <img src="static/imgs/logo.png" width="40px" className="-col-auto" alt="logo"/>
                <h1>React Music Player</h1>
            </div>
        );
    }
}
export default Header;