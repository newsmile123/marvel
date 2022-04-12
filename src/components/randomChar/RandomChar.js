import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';


class RandomChar extends Component{
    // constructor(props) {
    //     super(props);

    // };
    state = {
        char: {},
        loading: true,
        error: false  
    }

    marvelService = new MarvelService();

    onChatLoaded = (char) => {
        this.setState({char, loading: false})
    }

    updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
       this.marvelService
            .getCharacters(id)
            .then(this.onChatLoaded)
            .catch(this.onError)
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    componentDidMount() {
        this.updateChar();
    }

    loadingForRandom = () => {
        this.setState({
            loading: true
        })
    }

    handleUpdate = () => {
        this.loadingForRandom();
        this.forUpdateRandom()
        console.log('update')
    }
    
    forUpdateRandom = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
       this.marvelService
            .getCharacters(id)
            .then(this.onChatLoaded)
            .catch(this.onError)
    }

    


    render() {

        const {char, loading, error } = this.state
        const errorMessage = error? <ErrorMessage/> : null;
        const spinner = loading? <Spinner/>: null;
        const content = !(loading || error)? <View char={char}/>: null;

        return (
            <div className="randomchar">
                {errorMessage}
                {spinner}
                {content}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main">
                        <div onClick={this.handleUpdate} className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
}

const View = ({char}) => {
const {name, thumbnail, description, homepage, wiki} = char
const linkImg = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';
const thumbnailTest = thumbnail === linkImg? <img src={thumbnail} alt="Random character" style={{objectFit:'contain'}} className='randomchar__img'/> : <img src={thumbnail} alt="Random character" className='randomchar__img'/> ;

     return(
                <div className="randomchar__block">
                    {thumbnailTest}
                    <div className="randomchar__info">
                        <p className="randomchar__name">{name}</p>
                        <p className="randomchar__descr">
                            {description}
                        </p>
                        <div className="randomchar__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
     )
 }


export default RandomChar;