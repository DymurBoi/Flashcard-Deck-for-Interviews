import "../styles/flashcard.css"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {createCard, updateCard, getDeckById, getCardsByDeckId, deleteCard} from "../api/cards"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormModal from '../components/FormModal';
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

function Flashcards(){
    const {deckId} = useParams();
    const [deck,setDeck]=useState();
    const [cards,setCards]= useState([]);
    const [flipped,setFlipped] = useState(false);
    const [currentIndex,setCurrentIndex] = useState(0);
    const [addModal,setAddModal] = useState(false);
    const [updateModal,setUpdateModal] = useState(false);
    const [deleteModal,setDeleteModal] = useState(false);
    const [newQuestion, setNewQuestion] = useState('');
    const [newAnswer, setNewAnswer] = useState('');
    const [isLoading,setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCards = async () => {
        try {
            const res = await getCardsByDeckId(deckId);
            setCards(res.data);
            console.log(res.data);
            const deckRes = await getDeckById(deckId);
            setDeck(deckRes.data);
            setIsLoading(false);
        } catch (err) {
            console.error(err);
        }
        };

        fetchCards();
    }, []);

    const handleNext = (e) =>{
        e.stopPropagation();
        setFlipped(false);
        setCurrentIndex((prev)=>
            prev === cards.length-1? 0 :prev+1
        );
    }

    const handleBack = (e)=>{
        e.stopPropagation();
        setFlipped(false);
        setCurrentIndex((prev)=>
            prev === 0? cards.length-1 :prev-1
        );
    }
    
    const toggleMastered = async (e)=>{
        const currentCard = cards[currentIndex];
        try {
            const res= await updateCard(currentCard.id,{
            isMastered: !currentCard.isMastered,
            });
            setCards((prevCards) =>
            prevCards.map((card, index) =>
                index === currentIndex ? res.data : card
            )
            );
        } catch (e) {
            console.error(e);
        }
    }
    const handleCreateCard = async () => {
        try {
            const res = await createCard({
                question: newQuestion,
                answer: newAnswer,
                isMastered: false,
                deckId: parseInt(deckId, 10),
            });
            console.log(res.data);
            const fetchRes = await getCardsByDeckId(deckId);
            setCards(fetchRes.data);
        } catch (error) {
            console.error(error);
        }
        setAddModal(false);
    };

    const handleUpdateCard = async () => {
        try {
            const res = await updateCard(currentCard.id,{
                question: newQuestion,
                answer: newAnswer,
            });
            console.log(res.data);
            const fetchRes = await getCardsByDeckId(deckId);
            setCards(fetchRes.data);
        } catch (error) {
            console.error(error);
        }
        setUpdateModal(false);
    };

    const handleDeleteCard = async () =>{
        try {
            const res = await deleteCard(currentCard.id)
            const fetchRes = await getCardsByDeckId(deckId);
            setCards(fetchRes.data);
            setCurrentIndex(0);
            setDeleteModal(false);
        } catch (error) {
            console.log(error);
        }
    };

    const closeAddModal = () =>{
        setAddModal(false);
        setNewAnswer('');
        setNewQuestion('');
    }

    const closeUpdateModal = () =>{
        setUpdateModal(false);
        setNewAnswer('');
        setNewQuestion('');
    }
    const currentCard = cards[currentIndex];

    if (isLoading) {
        return <div className="loading"><p>Loading cards...</p></div>;
    }

    if (cards.length === 0) {
        return (
            <div className="container--column">
            <Typography variant="h3" sx={{color: '#1976d2'}}>There are currently no cards.</Typography>
            <div className="card">
                <div className="card-content" onClick={e=>{e.stopPropagation(); setAddModal(!addModal)}}>
                    <div className="deck-card-text">
                        <AddIcon/>Add a card
                    </div>
                </div>
            </div>
            { addModal? (
                <FormModal
                    open={addModal}
                    onClose={() => closeAddModal()}
                    title="Create Card"
                    onSubmit={handleCreateCard}
                >
                    <TextField
                    label="Question"
                    fullWidth
                    margin="normal"
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    />

                    <TextField
                    label="Answer"
                    fullWidth
                    margin="normal"
                    value={newAnswer}
                    onChange={(e) => setNewAnswer(e.target.value)}
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
    return(
        <>
            <div className="container">
            {/* Left column */}
            <div className="left-column">
                <Typography sx={{textAlign: 'left', marginLeft: 5, marginTop: 4, fontWeight: '600'}} variant="h4" color="#1976d2">{deck.title}</Typography>

                <div className={`card ${flipped ? "flipped" : ""}`} onClick={() => setFlipped(!flipped)}>
                <div className="card-content">
                    <div className="card-front">{currentCard.question}</div>
                    <div className="card-back">{currentCard.answer}</div>
                </div>
                </div>
                <div className="card-buttons">  
                    <Button onClick={handleBack}><ArrowBackIcon /></Button>
                        <div className="center-buttons">
                            <IconButton
                                disableRipple
                                className="star-button"
                                onClick={e => { e.stopPropagation(); toggleMastered(); }}
                            >
                                {currentCard.isMastered ? <StarIcon style={{ color: "gold" }} /> : <StarBorderIcon />}
                            </IconButton>
                            <p>{currentIndex + 1}/{cards.length}</p>
                        </div>
                    <Button onClick={handleNext}><ArrowForwardIcon /></Button>
                </div>
            </div>

            {/* Right column */}
            <div className="right-column">
            <Typography variant="h4" sx={{fontWeight: 'bold', color:'#222',mb: '1rem'}}>Deck Description</Typography>
            <Typography variant="body1" sx={{ mb: '6rem', color: "#555",fontSize: 20, textAlign:"left", maxWidth:'45rem'}}>
                {deck.description}
            </Typography>
            <div className="right-buttons">
                    <Button 
                        onClick={e => { e.stopPropagation(); setAddModal(!addModal); }}
                        variant="contained"
                        startIcon={<AddIcon />}
                    >
                        Add
                    </Button>

                    <Button 
                        onClick={e => { 
                            e.stopPropagation(); 
                            setUpdateModal(!updateModal); 
                            setNewQuestion(currentCard.question); 
                            setNewAnswer(currentCard.answer); 
                        }}
                        variant="outlined"
                        startIcon={<EditIcon />}
                    >
                        Edit
                    </Button>

                    <Button 
                        color="error"
                        onClick={e => { e.stopPropagation(); setDeleteModal(!deleteModal); }}
                        startIcon={<DeleteIcon />}
                        variant="contained"
                    >
                        Delete
                    </Button>
                </div>
            </div>
            {/* Add Card Modal */}
            { addModal? (
                <FormModal
                    open={addModal}
                    onClose={() => closeAddModal()}
                    title="Create Card"
                    onSubmit={handleCreateCard}
                >
                    <TextField
                    label="Question"
                    fullWidth
                    margin="normal"
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    />

                    <TextField
                    label="Answer"
                    fullWidth
                    margin="normal"
                    value={newAnswer}
                    onChange={(e) => setNewAnswer(e.target.value)}
                    />
                    <div className="button-container">
                       <Button
                        variant="contained"
                        color="#DCDCDC"
                        sx={{ mt: 2 }}
                        fullWidth
                        onClick={() => setAddModal(false)}>
                        Cancel
                        </Button>
                    <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 2 }}
                    fullWidth
                    >
                    Save
                    </Button>
                    </div>
                </FormModal>
                
            ):(
                <>
                </>
            )}
            { updateModal? (
                <FormModal
                    open={updateModal}
                    onClose={() => closeUpdateModal()}
                    title="Update Card"
                    onSubmit={handleUpdateCard}
                >
                    <TextField
                    label="Question"
                    fullWidth
                    margin="normal"
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    />

                    <TextField
                    label="Answer"
                    fullWidth
                    margin="normal"
                    value={newAnswer}
                    onChange={(e) => setNewAnswer(e.target.value)}
                    />
                    <div className="button-container">
                       <Button
                        variant="contained"
                        sx={{ mt: 2 }}
                        color="#DCDCDC"
                        fullWidth
                        onClick={() => setUpdateModal(false)}>
                        Cancel
                        </Button>
                    <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 2 }}
                    fullWidth
                    >
                    Save
                    </Button>
                    </div>
                </FormModal>
            ):(
                <>
                </>
            )}
            { deleteModal? (
                <FormModal
                    open={deleteModal}
                    onClose={() => setDeleteModal(false)}
                    title="Confirm Delete"
                    onSubmit={handleDeleteCard}
                >
                    <Typography>Are you sure you want to delete this card?</Typography>
                    <div className="button-container">
                       <Button
                        variant="contained"
                        sx={{ mt: 2}}
                        color="#DCDCDC"
                        fullWidth
                        onClick={() => setDeleteModal(false)}>
                        Cancel
                        </Button>
                        <Button
                        type="submit"
                        color="error"
                        variant="contained"
                        sx={{ mt: 2 }}
                        fullWidth
                        >
                        Delete
                        </Button> 
                    </div>
                </FormModal>
            ):(
                <>
                </>
            )}
            </div>
        </>
    )
}
export default Flashcards
