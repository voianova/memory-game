import React from 'react';
import Card from './Card';
import uniqueElementsArray from '../Game/cardsdata'; 

function GameBoard() {
    const [cardsArray, setCardsArray] = React.useState([]);
    const [moves, setMoves] = React.useState(0);
    const [firstCard, setFirstCard] = React.useState(null);
    const [secondCard, setSecondCard] = React.useState(null);
    const [stopFlip, setStopFlip] = React.useState(false);

    function shuffleCards() {
        const shuffledCards = [...uniqueElementsArray, ...uniqueElementsArray]
            .sort(() => Math.random() - 0.5)
            .map(card => ({ ...card, id: Math.random() }));
        setCardsArray(shuffledCards);
        setMoves(0);
        setFirstCard(null);
        setSecondCard(null);
    }

    function handleSelectedCards(card) {
        firstCard ? setSecondCard(card) : setFirstCard(card);
    }

    React.useEffect(() => {
        if (firstCard && secondCard) {
            setStopFlip(true);
            if (firstCard.type === secondCard.type) {
                setCardsArray(prev => prev.map(card => card.type === firstCard.type ? { ...card, matched: true } : card));
                resetTurns();
            } else {
                setTimeout(() => resetTurns(), 1000);
            }
        }
    }, [firstCard, secondCard]);

    function resetTurns() {
        setFirstCard(null);
        setSecondCard(null);
        setStopFlip(false);
        setMoves(moves => moves + 1);
    }

    React.useEffect(() => {
        shuffleCards();
    }, []);

    return (
        <div className="container">
            <div className="header">
                <h1>Memory Game</h1>
            </div>
            <div className="board">
                {cardsArray.map(card => (
                    <Card
                        key={card.id}
                        item={card}
                        handleSelectedCards={handleSelectedCards}
                        toggled={card === firstCard || card === secondCard || card.matched}
                        stopFlip={stopFlip}
                    />
                ))}
            </div>
            <div className="comments">
                Moves: {moves}
            </div>
            <button className="button" onClick={shuffleCards}>New Game</button>
        </div>
    );
}

export default GameBoard;
