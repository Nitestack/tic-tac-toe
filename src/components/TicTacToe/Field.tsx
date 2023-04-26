import { Component } from 'solid-js';

import { Switch, Match } from 'solid-js';

import classes from './Field.module.css';

import {
  isPlayerXTurn,
  setIsPlayerXTurn,
  board,
  setBoard,
  win,
  setWin,
} from './index';

function calculateWin(currentBoard: (boolean | undefined)[][]) {
  //Variable
  let isWin = false;
  //Wer ist dran
  const isXTurn = isPlayerXTurn();
  //alle Zeilen überprüfen
  for (let i = 0; i < 3; i++) {
    //Zeile #i + 1
    const rows = currentBoard[i];
    const isRowWin = rows.every((field) => {
      //Empty field
      if (typeof field === 'undefined') return false;
      return field === isXTurn;
    });
    if (isRowWin) {
      isWin = true;
      break;
    }
  }
  //alle Spalten überprüfen
  for (let i = 0; i < 3; i++) {
    if (isWin) break;
    //Spalte #i + 1
    const cols = [currentBoard[0][i], currentBoard[1][i], currentBoard[2][i]];
    const isColWin = cols.every((field) => {
      //Empty field
      if (typeof field === 'undefined') return false;
      return field === isXTurn;
    });
    if (isColWin) {
      isWin = true;
      break;
    }
  }
  //alle Diagonalen überprüfen
  for (let i = 0; i < 2; i++) {
    if (isWin) break;
    //Diagonale #i + 1
    const diagonal = [
      currentBoard[0][i === 0 ? i : 2],
      currentBoard[1][1],
      currentBoard[2][i === 0 ? 2 : 0],
    ];
    const isDiaWin = diagonal.every((field) => {
      //Empty field
      if (typeof field === 'undefined') return false;
      return field === isXTurn;
    });
    if (isDiaWin) {
      isWin = true;
      break;
    }
  }
  return isWin;
}

function isDraw(currentBoard: (boolean | undefined)[][]) {
  return (
    //Ist die erste Zeile gefüllt
    currentBoard[0].every((field) => typeof field !== 'undefined') &&
    //Ist die zweite Zeile gefüllt
    currentBoard[1].every((field) => typeof field !== 'undefined') &&
    //Ist die dritte Zeile gefüllt
    currentBoard[2].every((field) => typeof field !== 'undefined')
  );
}

/**
 * fill?: boolean; => true = "X", false = "O", undefined = "empty field"
 */
const TicTacToeField: Component<{
  row: number;
  col: number;
  class: string;
}> = (props) => {
  //Wenn der Spieler auf ein Feld drückt
  function onMove() {
    //Wenn das Game schon bereits gewonnen ist, nichts tun
    if (typeof win() !== 'undefined') return;
    //Wenn das Feld bereits von einem Spieler gedrückt wurde, nichts tun
    if (typeof board()[props.row - 1][props.col - 1] !== 'undefined') return;
    //Spielfeld aktualisieren
    setBoard((currentBoard) => {
      //Zeile "props.row - 1", Spalte "props.row - 1" für Spieler besetzen
      currentBoard[props.row - 1][props.col - 1] = isPlayerXTurn();
      //Berechnen, ob der aktuelle Spieler gewonnen hat
      const isWin = calculateWin(currentBoard);
      //Wenn der Spieler gewonnen hat
      if (isWin) setWin(isPlayerXTurn());
      //Wenn es ein unentschieden ist
      else if (isDraw(currentBoard)) setWin(null);
      //Gebe das neue Spielfeld zurück
      return [...currentBoard];
    });
    //Anderer Spieler ist dran
    setIsPlayerXTurn((currentTurn) => !currentTurn);
  }

  return (
    <button onClick={onMove} class={`${classes.field} ${props.class}`}>
      <Switch>
        <Match
          when={typeof board()[props.row - 1][props.col - 1] === 'undefined'}
        >
          {' '}
        </Match>
        <Match when={board()[props.row - 1][props.col - 1]}>
          <div class={`${classes.x} ${classes.click}`}>X</div>
        </Match>
        <Match when={!board()[props.row - 1][props.col - 1]}>
          <div class={`${classes.o} ${classes.click}`}>O</div>
        </Match>
      </Switch>
    </button>
  );
};

export default TicTacToeField;
