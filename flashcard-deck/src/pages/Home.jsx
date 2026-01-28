import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getDecks } from "../api/cards";
import DeckCard from "../components/DeckCard";
import "../styles/home.css";

function Home() {
  const [decks, setDecks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDecks = async () => {
      const res = await getDecks();
      setDecks(res.data);
    };
    fetchDecks();
  }, []);

  if (decks.length === 0) {
    return <p>Loading decks...</p>;
  }

  const handleDeckClick = (deckId) => {
    navigate(`/flashcards/${deckId}`);
  };

  return (
    <div className="deck-grid">
      {decks.map((deck) => (
        <DeckCard
          key={deck.id}
          deck={deck}
          onClick={() => handleDeckClick(deck.id)}
        />
      ))}
    </div>
  );
}

export default Home;
