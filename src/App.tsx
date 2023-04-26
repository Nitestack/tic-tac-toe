import type { Component } from 'solid-js';

import TicTacToe from './components/TicTacToe';

import classes from './App.module.css';

const App: Component = () => {
  return (
    <>
      <nav class={classes.navbar}>
        <h1>Tic Tac Toe</h1>
      </nav>
      <main class={classes.main}>
        <TicTacToe />
      </main>
      <footer class={classes.footer}>Erstellt von Nhan and Alex</footer>
    </>
  );
};

export default App;
