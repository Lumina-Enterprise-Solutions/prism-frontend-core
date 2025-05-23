import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import './App.css';
import { Button } from './components/atoms/Button';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="py-2 px-4">
          <div className="flex items-center justify-center gap-2 ">
            <a href="https://vite.dev" target="_blank">
              <img src={viteLogo} className="logo" alt="Vite logo" />
            </a>
            <a href="https://react.dev" target="_blank">
              <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
          </div>
          <div className="flex items-center justify-center">
            <h1 className="text-3xl">Vite + React</h1>
          </div>
          <div className="flex items-center justify-center space-y-2">
            <div className="flex flex-row gap-2">
              <button
                className="bg-red-500 px-2 py-1 rounded-sm"
                onClick={() => setCount((count) => count + 1)}
              >
                count is {count}
              </button>
              <Button variant="secondary">Tets</Button>
            </div>
          </div>
          <div className="items-center flex flex-col pt-2 space-x-2">
            <p>
              Edit <code>src/App.tsx</code> and save to test HMR
            </p>
            <p className="read-the-docs">
              Click on the Vite and React logos to learn more
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
