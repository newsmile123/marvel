import './charList.scss';
import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

class CharList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            charList: [],
            loading: true,
            error: false
        }

    }
    // state = {
    //     char: {}
    // }

    marvelService = new MarvelService()

    updateState = (charList) => {
        this.setState({
            charList,
            loading: false
        })
    }

    getCard = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        this.marvelService.getAllCharacters(id).then(this.updateState).catch(this.handleError)
    }

    handleLoading = () => {
        return (
            <Spinner/>
        )
    }

    handleError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    componentDidMount() {
        this.getCard()
    }

    renderItems(arr) {
        const items = arr.map(item => {
            return (
                <li 
                className="char__item"
                key={item.id}
                onClick={() => this.props.onCharSelected(item.id)}
                >
                    <img src={item.thumbnail} alt="abyss"/>
                    <div className="char__name">{item.name}</div>
                </li>
            )
        })
        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }



    render() {
        const {charList, error, loading} = this.state
        console.log(this.state.charList)
        const items = this.renderItems(charList)

        const errorMessage = error? <ErrorMessage/> : null;
        const spinner = loading? <Spinner/> : null
        const content = !(error || loading)? items : null

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}




export default CharList;