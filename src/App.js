import logo from './logo.svg';
import './App.css';

function App() {
  const fun=async ()=>{
    const data=await fetch("/saymyname");console.log(data); 
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
        </a>
      </header>
      <h3>
        {fun()}  
      </h3>
    </div>
  );
}

export default App;
