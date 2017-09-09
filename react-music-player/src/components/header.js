/**
 * Created by roy-lau on 2017/9/6 0006.
 */
import React, { Component } from 'react';
import './header.less';

class Header extends Component {
    render() {
        return (
            <div className="components-header row">
                <img src="/images/logo.png" width="40px" className="-col-auto" alt="这是一张logo"/>
                <h1 className="caption">React Music Player</h1>
            </div>
        );
    }
}
export default Header;