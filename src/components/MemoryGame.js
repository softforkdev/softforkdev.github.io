import React, { useEffect, useState } from 'react';

import egg from '../assets/egg.svg';
import pumpkin from '../assets/pumpkin.svg';
import Santa from '../assets/Santa.svg';

import Bird from '../assets/easter/Bird.svg';
import Rabbit from '../assets/easter/Rabbit.svg';
import easter01 from '../assets/easter/easter01.svg';
import chicken from '../assets/easter/chicken.svg';
import flowers from '../assets/easter/flowers.svg';
import rabbit2 from '../assets/easter/rabbit2.svg';

import ball from '../assets/santa/ball.svg';
import bells from '../assets/santa/bells.svg';
import snowflake from '../assets/santa/snowflake.svg';
import gift from '../assets/santa/gift.svg';
import hat1 from '../assets/santa/hat.svg';
import treno from '../assets/santa/treno.svg';

import bruxa1 from '../assets/halloween/bruxa1.svg';
import bruxa2 from '../assets/halloween/bruxa2.svg';
import bruxa3 from '../assets/halloween/bruxa3.svg';
import hat from '../assets/halloween/hat.svg';
import potion from '../assets/halloween/potion.svg';
import frog from '../assets/halloween/frog.svg';

import spikes from '../assets/spikes.svg';

import '../memoryGame.scss';

const MemoryGame = () => {

  const [firstIndex, setFirstIndex] = useState(undefined);
  const [randomizedCards, setRandomizedCards] = useState([])
  const [gameTheme, setGameTheme] = useState("");
  const [gameOver, setGameOver] = useState(true);
  const [itemCount, setItemCount] = useState(12);

  useEffect(() => {
    document.body.style.backgroundColor = '#97c4c7';
  }, [])

  useEffect(() => {
    setRandomizedCards(randomizeCard());
    if (gameTheme === "pumpkin") {
      document.body.animate([
        // keyframes
        { backgroundColor: '#97c4c7' },
        { backgroundColor: '#303331' }
      ], {
        // timing options
        duration: 1000,
      });
      document.body.style.backgroundColor = '#303331';
    }
    else if (gameTheme === "santa") {
      document.body.animate([
        // keyframes
        { backgroundColor: '#97c4c7' },
        { backgroundColor: '#e9ecf0' }
      ], {
        // timing options
        duration: 1000,
      });
      document.body.style.backgroundColor = '#e9ecf0';
    }
    else if (gameTheme === "egg") {
      document.body.animate([
        // keyframes
        { backgroundColor: '#80a6a8' },
        { backgroundColor: '#97c4c7' }
      ], {
        // timing options
        duration: 1000,
      });
      document.body.style.backgroundColor = '#97c4c7';
    }

    else {
      document.body.style.backgroundColor = '#97c4c7';
    }
  }, [gameTheme])

  useEffect(() => {
    if (itemCount === 0)
      setTimeout(() => {
        setGameOver(true);
      }, 1000)
  }, [itemCount])

  const handleItemClick = (index) => {

    if (firstIndex !== undefined) {
      document.getElementById(`card-(${index})`).style.zIndex = 2;
      document.getElementById(`card-(${index})`).style.clipPath = 'none';
      document.getElementById(`item-(${index})`).style.clipPath = 'circle(0)';
      const indexes = [firstIndex, index]
      setTimeout(() => {
        if (randomizedCards[index] === randomizedCards[firstIndex]) {//cards match
          indexes.forEach(i => {
            document.getElementById(`card-(${i})`).classList.add("slide-out-bck-center");
            document.getElementById(`item-(${i})`).style.display = 'none';
          })
          setItemCount(eggCount => eggCount - 2)
        } else {//cards dont match
          indexes.forEach(i => {
            document.getElementById(`card-(${i})`).style.zIndex = -1;
            document.getElementById(`card-(${i})`).style.clipPath = 'circle(0)';
            document.getElementById(`item-(${i})`).style.zIndex = 1;
            document.getElementById(`item-(${i})`).style.clipPath = 'none';
          })
        }
      }, 500)
      setFirstIndex(undefined)
    } else {
      document.getElementById(`card-(${index})`).style.zIndex = 2;
      document.getElementById(`card-(${index})`).style.clipPath = 'none';
      document.getElementById(`item-(${index})`).style.clipPath = 'circle(0)';
      setFirstIndex(index)
    }
  };

  const randomizeCard = () => {
    let cards = [];
    if (gameTheme === "pumpkin")
      cards = [bruxa1, bruxa2, bruxa3, hat, potion, frog];
    else if (gameTheme === "egg")
      cards = [easter01, chicken, Bird, Rabbit, flowers, rabbit2];
    else if (gameTheme === "santa")
      cards = [ball, bells, snowflake, gift, hat1, treno];

    const doubledcards = cards.concat(cards)
    return doubledcards.sort(() => 0.5 - Math.random());
  };

  const renderItems = () => {
    const items = [];

    for (let i = 0; i < 12; i++) {
      items.push(
        <div key={i} className='game-square'>
          <div id={`card-(${i})`} className='card'>
            <div
              className='card-content-img roll-in-left'
              style={{
                backgroundImage: `url(${randomizedCards[i]})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
              }}>
            </div>
          </div>
          {
            gameTheme === "pumpkin" &&
            <img
              id={`item-(${i})`}
              src={pumpkin}
              className="item-pumpkin roll-in-left"
              alt="item"
              onClick={() => handleItemClick(i)}
            />
          }
          {
            gameTheme === "egg" &&
            <img
              id={`item-(${i})`}
              src={egg}
              className="item-egg roll-in-left"
              alt="item"
              onClick={() => handleItemClick(i)}
            />
          }
          {
            gameTheme === "santa" &&
            <img
              id={`item-(${i})`}
              src={Santa}
              className="item-santa roll-in-left"
              alt="item"
              onClick={() => handleItemClick(i)}
            />
          }
        </div>
      )
    }
    return items;
  };

  const handleGamePlay = (gameTheme) => {
    setGameOver(false);
    setGameTheme(gameTheme);
    setItemCount(12);
  };

  const renderGameOver = () => {
    return <div className="gameOver-wrapper">
      <img src={spikes}
        className="spikes"
        alt="spikes" />
      <div className="button-wrapper bounce-in-top">
        <div className="button-spinner">
          <div className="common-flex-box">
            <a href="#" className="rainbow-button" alt="Button" >
              <img src={egg} alt="egg" className="button-egg" onClick={() => handleGamePlay("egg")} />
            </a>
          </div>
          <div className="common-flex-box">
            <a href="#" className="rainbow-button" alt="Button" >
              <img src={pumpkin} alt="pumpkin" className="button-pumpkin" onClick={() => handleGamePlay("pumpkin")} />
            </a>
            <a href="#" className="rainbow-button" alt="Button" >
              <img src={Santa} alt="Santa" className="button-santa" onClick={() => handleGamePlay("santa")} />
            </a>
          </div>
        </div>
      </div>
    </div >
  }

  return (
    <div className="content-wrapper">
      {gameOver ?
        renderGameOver()
        :
        <div className="item-wrapper">
          {renderItems()}
        </div>}
    </div >
  );
}

export default MemoryGame;
