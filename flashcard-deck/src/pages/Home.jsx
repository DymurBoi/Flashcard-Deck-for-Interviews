import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getDecks,createDeck } from "../api/cards";
import DeckCard from "../components/DeckCard";
import AddIcon from '@mui/icons-material/Add';
import FormModal from "../components/FormModal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "../styles/home.css";

function Home() {
  const [decks, setDecks] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [addModal, setAddModal] = useState(false);
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

  const handleCreateDeck = async (e) =>{
    try {
        const res = await createDeck({
            title: newTitle,
            description: newDescription,
        })
        console.log(res.data);
        const fetchRes = await getDecks();
        setDecks(fetchRes.data);
    } catch (error) {
        console.log(error);
    }
  }

  return (
    <div className="deck-grid">
      {decks.map((deck) => (
        <DeckCard
          key={deck.id}
          deck={deck}
          onClick={() => handleDeckClick(deck.id)}
        />
      ))}
      <div className="deck-card" onClick={()=>setAddModal(!addModal)}>
        <div className="deck-card-text">
            <AddIcon/> Add a deck
        </div>
      </div>
      { addModal? (
                <FormModal
                    open={addModal}
                    onClose={() => setAddModal(false)}
                    title="Create a new deck"
                    onSubmit={handleCreateDeck}
                >
                    <TextField
                    label="Title"
                    fullWidth
                    margin="normal"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    />

                    <TextField
                    label="Description"
                    fullWidth
                    margin="normal"
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    />

                    <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 2 }}
                    fullWidth
                    >
                    Save
                    </Button>
                </FormModal>
                
            ):(
                <>
                </>
            )}
    </div>
  );
}

export default Home;
