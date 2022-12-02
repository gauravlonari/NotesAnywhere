import './App.css';
import { useEffect, useState } from 'react';

function App() {
  
  const [text, setText] = useState("Hi");
  const fun=async ()=>{
    const data=await fetch("/saymyname");
    // setText(data);
    console.log(await data.text());
  }
  useEffect(()=>{
    fun();
  },[]);
  
  return (
    <div>
      <h3>
        {text}
      </h3>
    </div>
  );
}

export default App;
