import type { Component } from 'solid-js';

import { createSignal, Match, Switch } from 'solid-js';

import Field from './Field';

import classes from './index.module.css';

export const x = true;
export const o = false;
export const e = undefined;

export const [isPlayerXTurn, setIsPlayerXTurn] = createSignal(true);

export const [win, setWin] = createSignal<true | false | null | undefined>(
  undefined
);

export const [board, setBoard] = createSignal<(boolean | undefined)[][]>([
  [e, e, e],
  [e, e, e],
  [e, e, e],
]);

const TicTacToe: Component = () => {
  function restartGame() {
    setBoard([
      [e, e, e],
      [e, e, e],
      [e, e, e],
    ]);
    setWin(undefined);
    setIsPlayerXTurn(true);
  }
  return (
    <div class={classes.container}>
      <p class={classes['status-text']}>
        <Switch fallback="Noch kein Gewinner...">
          <Match when={typeof win() !== 'undefined' && win() !== null}>
            <div class={classes.status}>
              Spieler {win() ? 'X' : 'O'} gewinnt!
            </div>
          </Match>
          <Match when={win() === null}>
            <div class={classes.status}>Unentschieden!</div>
          </Match>
        </Switch>
      </p>
      <div class={classes.grid}>
        <Field
          class={`${classes['field-row-1']} ${classes['field-col-1']}`}
          row={1}
          col={1}
        />
        <Field class={classes['field-row-1']} row={1} col={2} />
        <Field
          class={`${classes['field-row-1']} ${classes['field-col-3']}`}
          row={1}
          col={3}
        />

        <Field class={classes['field-col-1']} row={2} col={1} />
        <Field class="" row={2} col={2} />
        <Field class={classes['field-col-3']} row={2} col={3} />

        <Field
          class={`${classes['field-row-3']} ${classes['field-col-1']}`}
          row={3}
          col={1}
        />
        <Field class={classes['field-row-3']} row={3} col={2} />
        <Field
          class={`${classes['field-row-3']} ${classes['field-col-3']}`}
          row={3}
          col={3}
        />
      </div>
      <div>
        <button
          class={classes['reset-button']}
          disabled={typeof win() === 'undefined'}
          onClick={restartGame}
        >
          Spiel neustarten
        </button>
      </div>
    </div>
  );
};

export default TicTacToe;
