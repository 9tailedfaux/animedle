import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react";
import {getEntireList} from './api'
import Autocomplete from './Autocomplete'

function App() {
  const [listFetched, setListFetched] = useState(false)
  const [chosenMedia, setChosenMedia] = useState({})
  const [prefix, setPrefix] = useState("");
  const [suggestion, setSuggestion] = useState("");

  function handleSubmit(event) {
    event.preventDefault()
    const form = event.target
    const formData = new FormData(form)
    const formJson = Object.fromEntries(formData.entries())
    const username = formJson.username
    getEntireList(username)
        .then((list) => {
          const chosen = list.at(Math.floor(Math.random() * list.length))
          setChosenMedia(chosen)
          console.log(chosen)
          setListFetched(true)
        })
  }

  function handleSearchChange(e) {
    let value = e.target.value
    setPrefix(value)

  }

  return (
    <div className="App">
      <header className="App-header">
        {
          !listFetched && <form onSubmit={handleSubmit}>
            <input type={"text"} title={"Anilist username"} name={"username"}/>
            <input type={"submit"} title={"Let's go!"} />
          </form>
        }
        {
          !listFetched && <div>
              <Autocomplete/>
          </div>
        }
      </header>
    </div>
  );
}

export default App;
