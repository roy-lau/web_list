/**
 * Created by roy-lau on 2017/9/9 0009.
 */
import React, { Component } from 'react';
import './progress.less';
class Progress extends Component {
    render() {
        return (
            <div className="components-progress row">
                <div className="progress" style={{ width: `${this.props.progress}%`}}></div>
            </div>
        );
    }
}
export default Progress;