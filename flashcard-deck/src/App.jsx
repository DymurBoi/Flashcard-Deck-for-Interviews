import {Routes,Route} from "react-router-dom"
import Home from "./pages/Home.jsx"
import './App.css'
import Flashcards from "./pages/Flashcards.jsx";
import Navbar from "./components/Navbar.jsx";

function App() {
  
  return (
    <>
    <Navbar/>
      <Routes>
        <Route path ="/" element={<Home/>}> </Route>
        <Route path ="/flashcards/:deckId" element={<Flashcards/>}></Route>
        <Route path ="/decks" element={<Home/>}> </Route>
      </Routes>
    </>
  )
}

export default App
