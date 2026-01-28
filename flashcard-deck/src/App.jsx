import {Routes,Route} from "react-router-dom"
import Home from "./pages/Home.jsx"
import './App.css'
import Flashcards from "./pages/Flashcards.jsx";

function App() {
  
  return (
      <Routes>
        <Route path ="/" element={<Home/>}> </Route>
        <Route path ="/flashcards/:deckId" element={<Flashcards/>}></Route>
      </Routes>
  )
}

export default App
