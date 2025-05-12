<<<<<<< HEAD
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

function App() {
  const [count, setCount] = useState(0);
=======
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import "tailwindcss";

function App() {
  const [count, setCount] = useState(0)
>>>>>>> 5b828a73d46afc6abeb359077549f41d56d2ae8c

  return (
    <>
      <div>
<<<<<<< HEAD
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
=======
        <a href="https://vite.dev" target="_black">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_black">
>>>>>>> 5b828a73d46afc6abeb359077549f41d56d2ae8c
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
<<<<<<< HEAD
          Edit <code>src/App.tsx</code> and save to test HMR
=======
          Edit <code>src/App.jsx</code> and save to test HMR
>>>>>>> 5b828a73d46afc6abeb359077549f41d56d2ae8c
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
<<<<<<< HEAD
  );
}

export default App;

=======
  )
}


export default App
>>>>>>> 5b828a73d46afc6abeb359077549f41d56d2ae8c
