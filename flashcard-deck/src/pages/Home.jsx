import "../styles/flashcard.css"
import { useState, useEffect } from "react"
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import {createCard, getCards, updateCard} from "../api/cards"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormModal from '../components/FormModal';
import Typography from "@mui/material/Typography";

function Home(){
    const [cards,setCards]= useState([]);
    const [flipped,setFlipped] = useState(false);
    const [currentIndex,setCurrentIndex] = useState(0);
    const [addModal,setAddModal] = useState(false);
    const [updateModal,setUpdateModal] = useState(false);
    const [newQuestion, setNewQuestion] = useState('');
    const [newAnswer, setNewAnswer] = useState('');

    useEffect(() => {
        const fetchCards = async () => {
        try {
            const res = await getCards();
            setCards(res.data);
            console.log(res.data);
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
    const handleCreateCard = async (e) => {
        try {
            const res = await createCard({
                question: newQuestion,
                answer: newAnswer,
                isMastered: false,
                deckId: 1,
            });
            console.log(res.data);
        } catch (error) {
            console.error(error);
        }
        setAddModal(false);
    };

    const handleUpdateCard = async (e) => {
        try {
            const res = await updateCard(currentCard.id,{
                question: newQuestion,
                answer: newAnswer,
            });
            console.log(res.data);
        } catch (error) {
            console.error(error);
        }
        setUpdateModal(false);
    };

    if (cards.length === 0) {
        return <p>Loading cards...</p>;
    }

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
    return(
        <>
        <Typography color="primary">Flashcards</Typography>
            <div className="container">
            <div className={`card ${flipped ? "flipped": ""}`} onClick={()=>setFlipped(!flipped)}>
            <div className="card-content">
                <div className="card-front">
                    {currentCard.question}
                </div>
                <div className="card-back">
                    {currentCard.answer}
                </div>    
            </div>
            </div>
            
            <div className="button-container">
            <Button variant="outlined" onClick={handleBack}><ArrowBackIcon/></Button>
            <button className="star-button" onClick={e => { e.stopPropagation(); toggleMastered(); }}>
            {currentCard.isMastered ? (
                <>
                <StarIcon style={{ color: "gold" }} />
                </>
            ) : (
                <StarBorderIcon />
            )}
            <p>{currentIndex+1}/{cards.length}</p>
            </button>
            <Button onClick={handleNext}><ArrowForwardIcon/></Button>
            <Button onClick={e=>{e.stopPropagation(); setAddModal(!addModal)}}><AddIcon/>Add a card</Button>
            <Button onClick={e=>{e.stopPropagation(); setUpdateModal(!updateModal); setNewQuestion(currentCard.question); setNewAnswer(currentCard.answer);}}><EditIcon/>Edit card</Button>
            </div>
            {/* Add Card Modal */}
            { addModal? (
                <FormModal
                    open={open}
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
            { updateModal? (
                <FormModal
                    open={open}
                    onClose={() => closeUpdateModal()}
                    title="Update Modal"
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
        </>
    )
}
export default Home
