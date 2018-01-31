import React, {Component} from 'react'

class Game extends Component {
    constructor(props){
        super(props);

        this.state = {
            randomNumber: 0
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

    componentDidMount(){
        this.generateRandomNumber();
    }

    render(){
        console.log(this.state);
        return (
            <div>
                <p>random num: {this.state.randomNumber}</p>
                <button onClick={this.resetGame.bind(this)} className='btn orange'>Reset</button>
            </div>
        )
    }
}

export default Game