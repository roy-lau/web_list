import React, { Component } from 'react';
import Header from './components/header.js'
import Progress from './components/progress.js'
import './App.css';

class App extends Component {
    getInitialState(){
        return {
            progress: '-'
        }
    },
    componentDidMount(){
        $("#player").jPlayer({
            ready: function(){
                $(this).jPlayer('setMedia',{
                    mp3: 'http://play.baidu.com/player/static/js/bower/muplayer/empty.mp3'
                }).jPlary('play')
            },
            supplied: 'mp3',
            wmode: 'window'
        });
        $('#player').bind($.jPlayer.event.timeupdate, (e) =>{
            this.setState({  // setState: 可以更新render函数
                progress: e.jPlayer.status.currentPercentAbsolute
            });
        });
    },
    componentWillUnMount(){
        $('jPlayer').unbind($.jPlayer.event.timeupdate);
    },
    render() {
        return (
            <div>
                <Header />
                <Progress progress={this.state.progress}></Progress>
            </div>
        );
    }
}

export default App;
