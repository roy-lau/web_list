import react from 'react'
import Hello from './components/Hello'

// console.log(react)

let Hello = React.createClass({
	render(){
		return(
			<div className='hello-component'>
			Hello,React
			</div>
			);
	}
})
export default Hello;