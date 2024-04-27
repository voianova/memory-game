import React from 'react';

function Card({ item, handleSelectedCards, toggled, stopFlip }) {
    return (
        <div className={toggled ? "card flipped" : "card"}>
            <div className="card-inner">
                <div className="card-front">
                    <img src={item.image} alt={item.type} />
                </div>
                <div className="card-back" onClick={() => !stopFlip && handleSelectedCards(item)}>
                    {}
                </div>
            </div>
        </div>
    );
}

export default Card;
