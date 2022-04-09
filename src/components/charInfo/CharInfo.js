import { Component } from 'react';
import Skeleton from '../skeleton/Skeleton'
import './charInfo.scss';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';


class CharInfo extends Component{

    state = {
        char: null,
        loading: false,
        error: false  
    }

    

    marvelService = new MarvelService()

    componentDidMount() {
        this.updateChar()
    }

    componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar()
        }

    }

    updateChar = () => {
        const {charId} = this.props;
        if (!charId) {
            return;
        }
        this.handleLoading();
        this.marvelService.getCharacters(charId).then(this.updateState).catch(this.handleError)

    }

    updateState = (char) => {
        this.setState({
            char,
            loading: false
        })
    }

    handleLoading = () => {
        this.setState({
            loading: true
        })
    }

    handleError = () => {
        return (
            <ErrorMessage/>
        )
    }

    render() {
        const {char, loading, error} = this.state

        const skeleton = char || loading || error ? null: <Skeleton/>;
        const errorMessage = error? <ErrorMessage/> : null;
        const spinner = loading? <Spinner/> : null
        const content = !(error || loading || !char)? <View char={char}/> : null

        return (
            <div className="char__info">
                {skeleton}
                {errorMessage}
                {spinner}
                {content}
            </div>
        )
    }
}


const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char
    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt="abyss"/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? null: 'No comics'}
                
                {
                    comics.map((item, i) => {
                        if (i > 9) {
                            return;
                        }
                        return (
                            <li 
                            className="char__comics-item"
                            key={i}
                            >
                                {item.name}
                            </li>
                        )
                    })
                }
            </ul>
        </>
    )
}

export default CharInfo;