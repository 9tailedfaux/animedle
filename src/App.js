import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react";
import {getEntireList} from './api'

function App() {
  const [listFetched, setListFetched] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    const form = event.target
    const formData = new FormData(form)
    const formJson = Object.fromEntries(formData.entries())
    const username = formJson.username
    getEntireList(username)
        .then(() => {
          setListFetched(true)
        })
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {
          !listFetched && <form onSubmit={handleSubmit}>
            <input type={"text"} title={"Anilist username"} name={"username"}/>
            <input type={"submit"} name={"Let's go!"} />
          </form>
        }

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

function fetchAnime(user) {
  
}

export default App;
