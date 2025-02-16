import { StrictMode, use, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import './index.css'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />}></Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)

function HomePage() {

  const [game, setGame] = useState([]);

  const [currentRound, setCurrentRound] = useState(1);

  async function LoadGame() {
    const response = await fetch("/api/getGame");
    const data = await response.json();
    setGame(data);
    console.log("Data loaded!")

  }




  const [currentHit, setCurrentHit] = useState(1);
  //1 = hit1, 2 = hit2, 3 = bonusBall
  const [roundScore, setRoundScore] = useState("");

  function handleRollBall() {
    if (currentRound > 10) {
      alert("Game over! Please reset the game.");
      return;
    }


    const currentGame = game.find((g) => g.id === currentRound);
    if (!currentGame) {
      alert("No game data found for this round.");
      return;
    }


    const roundHits = document.querySelector(`.round${currentRound}-hits`);
    const roundScoreElement = document.querySelector(`.r${currentRound}cuScore`);

    if (roundHits) {
      const hit1Box = roundHits.querySelector(`.r${currentRound}-1`);
      const hit2Box = roundHits.querySelector(`.r${currentRound}-2`);
      const hit3Box = roundHits.querySelector(`.r${currentRound}-3`);

      if (currentRound < 10) {
        if (currentHit === 1) {

          if (currentGame.hit1.pinsStruck === 10) {

            hit1Box.textContent = "X";
            hit2Box.textContent = "";
            setCurrentHit(1);
            setCurrentRound(currentRound + 1);
          } else {

            hit1Box.textContent = currentGame.hit1.pinsStruck;
            setCurrentHit(2);
          }
        } else if (currentHit === 2) {

          if (currentGame.hit1.pinsStruck + currentGame.hit2.pinsStruck === 10) {

            hit2Box.textContent = "/";
          } else {

            hit2Box.textContent = currentGame.hit2.pinsStruck;
          }
          setCurrentHit(1);
          setCurrentRound(currentRound + 1);
        }


        if (currentRound > 1) {
          roundScoreElement.textContent = currentGame.roundScore + (parseInt(document.querySelector(`.r${currentRound - 1}cuScore`).textContent));
        }
        else {
          roundScoreElement.textContent = currentGame.roundScore;
        }
      }


      if (currentRound === 10) {
        if (currentHit === 1) {

          if (currentGame.hit1.pinsStruck === 10) {

            hit1Box.textContent = "X";
            hit2Box.textContent = "";
            setCurrentHit(2);
          } else {

            hit1Box.textContent = currentGame.hit1.pinsStruck;
            setCurrentHit(2);
          }
        } else if (currentHit === 2) {

          if (currentGame.hit1.pinsStruck === 10) {

            if (currentGame.hit2) {
              if (currentGame.hit2.pinsStruck === 10) {

                hit2Box.textContent = "X";
              } else {

                hit2Box.textContent = currentGame.hit2.pinsStruck;
              }
            }
            setCurrentHit(3);
          } else if (currentGame.hit1.pinsStruck + currentGame.hit2.pinsStruck === 10) {

            hit2Box.textContent = "/";
            setCurrentHit(3);
          } else {

            hit2Box.textContent = currentGame.hit2.pinsStruck;
            setCurrentHit(1);
            setCurrentRound(currentRound + 1);
          }
        } else if (currentHit === 3) {

          if (currentGame.bonusBall) {
            hit3Box.textContent = currentGame.bonusBall.pinsStruck;
          }
          setCurrentHit(1);
          setCurrentRound(currentRound + 1);
        }


        if (roundScoreElement) {
          roundScoreElement.textContent = currentGame.roundScore + (parseInt(document.querySelector(`.r${currentRound - 1}cuScore`).textContent)) || "";
        }
      }
    }
  }


  function handleResetGame() {

    for (let i = 1; i <= 10; i++) {
      const roundHits = document.querySelector(`.round${i}-hits`);
      if (roundHits) {
        const hit1Box = roundHits.querySelector(`.r${i}-1`);
        const hit2Box = roundHits.querySelector(`.r${i}-2`);
        const hit3Box = roundHits.querySelector(`.r${i}-3`);

        if (hit1Box) hit1Box.textContent = "";
        if (hit2Box) hit2Box.textContent = "";
        if (hit3Box) hit3Box.textContent = "";
      }
    }


    setCurrentRound(1);
    setCurrentHit(1);
    LoadGame();
  }

  useEffect(() => {
    LoadGame();
  }, []);


  return (

    <main>
      <div className="scoreboard-container">
        <div className="round-section">
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
          <div>5</div>
          <div>6</div>
          <div>7</div>
          <div>8</div>
          <div>9</div>
          <div>10</div>
        </div>
        <div className="hit-section">
          <div className="round1-hits">
            <div className="r1-1"></div>
            <div className="r1-2"></div>
          </div>
          <div className="round2-hits">
            <div className="r2-1"></div>
            <div className="r2-2"></div>
          </div>
          <div className="round3-hits">
            <div className="r3-1"></div>
            <div className="r3-2"></div>
          </div>
          <div className="round4-hits">
            <div className="r4-1"></div>
            <div className="r4-2"></div>
          </div>
          <div className="round5-hits">
            <div className="r5-1"></div>
            <div className="r5-2"></div>
          </div>
          <div className="round6-hits">
            <div className="r6-1"></div>
            <div className="r6-2"></div>
          </div>
          <div className="round7-hits">
            <div className="r7-1"></div>
            <div className="r7-2"></div>
          </div>
          <div className="round8-hits">
            <div className="r8-1"></div>
            <div className="r8-2"></div>
          </div>
          <div className="round9-hits">
            <div className="r9-1"></div>
            <div className="r9-2"></div>
          </div>
          <div className="round10-hits">
            <div className="r10-1"></div>
            <div className="r10-2"></div>
            <div className="r10-3"></div>
          </div>
        </div>
        <div className="cumulate-score-section">
          <div className="r1cuScore"></div>
          <div className="r2cuScore"></div>
          <div className="r3cuScore"></div>
          <div className="r4cuScore"></div>
          <div className="r5cuScore"></div>
          <div className="r6cuScore"></div>
          <div className="r7cuScore"></div>
          <div className="r8cuScore"></div>
          <div className="r9cuScore"></div>
          <div className="r10cuScore"></div>

        </div>
      </div>

      <button className="roll-ball-button" onClick={handleRollBall}>Roll ball</button>
      <button className="reset-game-button" onClick={handleResetGame}> Reset game</button>
    </main>

  )
};

