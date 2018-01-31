import React, {Component} from 'react'

class Game extends Component {
    constructor(props){
        super(props);

        this.state = {
            randomNumber: 0,
            userNumber: ''
        }

    }

    generateRandomNumber(){
        const randNum = Math.floor(Math.random() * 10) + 1;

        this.setState({
            randomNumber: randNum
        })
    }

    resetGame(){
        this.generateRandomNumber();
    }

    makeGuess(event){
        event.preventDefault();

        console.log(this.state.userNumber)
    }

    componentDidMount(){
        this.generateRandomNumber();
    }

    render(){

        const btnStyle = {
            margin: '10px 5px'
        };

        const {randomNumber, userNumber} = this.state;

        console.log(this.state);
        return (
            <div>
                <p>random num: {randomNumber}</p>
                <div className='row'>
                    <form className='col s6 offset-s3' onSubmit={this.makeGuess.bind(this)}>
                        <div className='input-field'>
                            <input className='center-align' onChange={(event)=> {this.setState({userNumber: event.target.value}) }} value={userNumber} type='number' placeholder='enter a number'/>
                        </div>
                        <div className='row center-align'>
                            <button style={btnStyle} className='btn green'>Guess</button>
                            <button style={btnStyle} type='button' onClick={this.resetGame.bind(this)} className='btn orange'>Reset</button>
                            {/*by default button type is submit. change it to button if i dont want it to submit*/}
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Game