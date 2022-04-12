import './charList.scss';
import { useState, useEffect, useRef } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const CharList = (props) => {

    const [charList, setCharList] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [newItemLoading, setNewItemLoading] = useState(false)
    const [offset, setOffset] = useState(210)
    const [charEnded, setCharEnded] = useState(false)

    const marvelService = new MarvelService()

    useEffect(() => {
        onRequest()
    }, [])



    const onRequest = (offset) => {
        onCharListLoading();
        marvelService.getAllCharacters(offset).then(updateState).catch(handleError)
    }

    const updateState = (newCharList) => {
        let ended = false
        if (newCharList.length < 9) {
            ended = true
        }
        
        setCharList(charList => [...charList, ...newCharList ])
        setLoading((loading) => false)
        setNewItemLoading(newItemLoading => false)
        setOffset(offset => offset + 9)
        setCharEnded(charEnded => ended)
    }

    

  

    const handleError = () => {
        
        setError((error) => true)
        setLoading((loading) => false)

    }

    const itemRefs = useRef([])

    const focusOnItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();

    }

    const onCharListLoading = () => {
        setNewItemLoading(true);
    }

    function renderItems(arr) {
        const items = arr.map((item, i) => {
            return (
                <li 
                className="char__item"
                ref={el => itemRefs.current[i] = el}
                key={item.id}
                onClick={() => {
                    props.onCharSelected(item.id);
                    focusOnItem(i)
                }}
                onKeyPress={(e) => {
                    if (e.key === ' ' || e.key === 'Enter') {
                        props.onCharSelected(item.id);
                        focusOnItem(i)
                    }
                }}
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

    const items = renderItems(charList)

    const errorMessage = error? <ErrorMessage/> : null;
    const spinner = loading? <Spinner/> : null
    const content = !(error || loading)? items : null

    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {content}
            <button 
            className="button button__main button__long"
            disabled={newItemLoading}
            onClick={() => onRequest(offset)}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}




export default CharList;