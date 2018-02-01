import React, {Component} from 'react'
import '../assets/css/game.css'
import History from './history'

class Game extends Component {
    constructor(props){
        super(props);

        this.state = {
            userNumber: '',
            message: '',
            shake: false,
            guesses: 0,
            lowScore: localStorage.getItem('score') || 'Not Set',
            history: []
        }

        this.randomNumber = 0;
        this.status = 'playable';
    }

    generateRandomNumber(){
        this.randomNumber = Math.floor(Math.random() * 10) + 1;
    }

    resetGame(){
        this.status = 'playable';
        this.generateRandomNumber();

        this.setState({
            message: '',
            userNumber: '',
            shake: false,
            guesses: 0
        })
    }

    checkHighScore(){
        const highScore = localStorage.getItem('score');
        const {guesses} = this.state;

        if(highScore){

            if(guesses < highScore){
                localStorage.setItem('score', guesses)
            }

        } else {
            // stores the score in local storage and stays there even after the page refreshes
            localStorage.setItem('score', guesses)
        }

        this.setState({
            lowScore: localStorage.getItem('score')
        })
    }

    makeGuess(event){
        event.preventDefault();
        if(this.status === 'won'){
            return;
        }
        const {userNumber, guesses, history} = this.state;
        let msg = '';

        if(this.randomNumber < userNumber){
            msg = 'Too High'
        } else if(this.randomNumber > userNumber){
            msg = 'Too Low'
        } else {
            msg = 'You Got It!!!!';
            this.status = 'won';
        }

        this.setState({
            message: msg,
            userNumber: '',
            shake: true,
            guesses: guesses + 1,
            history: [`${userNumber} is ${msg}`, ...history]
        }, ()=> {
            if(this.status === 'won'){
                this.checkHighScore();
            }
        });

        setTimeout(()=>{
            this.setState({
                shake:false
            })
        }, 1000)
    }

    componentDidMount(){
        this.generateRandomNumber();
    }

    render(){

        const btnStyle = {
            margin: '10px 5px'
        };

        const { userNumber, message, shake, guesses, lowScore, history} = this.state;

        console.log(this.state);
        return (
            <div>
                <h3 className='center-align'>Best Score: {lowScore}</h3>
                <div className='row'>
                    <form className='col s6 offset-s3' onSubmit={this.makeGuess.bind(this)}>
                        <div className='input-field'>
                            <input className='center-align' onChange={(event)=> {this.setState({userNumber: event.target.value}) }} value={userNumber} type='number' placeholder='enter a number'/>
                        </div>
                        <div className='row center-align'>
                            <button style={btnStyle} className='btn green pulse'>Guess</button>
                            <button style={btnStyle} type='button' onClick={this.resetGame.bind(this)} className='btn orange pulse'>Reset</button>
                            {/*by default button type is submit. change it to button if i dont want it to submit*/}
                        </div>
                    </form>
                </div>
                <h4 className='center-align'>Number of Guess: {guesses}</h4>
                <h3 className={`center-align ${shake ? 'shake': ''}`}>{message}</h3>
                <History data={history}/>
            </div>
        )
    }
}

export default Game