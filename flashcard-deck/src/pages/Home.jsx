import "../styles/flashcard.css"
import { useState, useEffect } from "react"
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import {getCards, updateCard} from "../api/cards"

function Home(){
    const [cards,setCards]= useState([]);
    const [flipped,setFlipped] = useState(false);
    const [currentIndex,setCurrentIndex] = useState(0);
    const [addModal,setAddModal] = useState(false);
    const [updateModal,setUpdateAddModal] = useState(false);

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

    if (cards.length === 0) {
        return <p>Loading cards...</p>;
    }

    const currentCard = cards[currentIndex];
    return(
        <>
        <h2>Flashcards</h2>
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
            <button onClick={handleBack}><ArrowBackIcon/></button>
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
            <button onClick={handleNext}><ArrowForwardIcon/></button>
            <button onClick={e=>{e.stopPropagation(); setAddModal(!addModal)}}><AddIcon/><p>Add a card</p></button>
            <button onClick={e=>{e.stopPropagation(); setUpdateAddModal(!updateModal)}}><EditIcon/><p>Edit card</p></button>
            </div>
            { addModal? (
                <p>Add Modal</p>
            ):(
                <>
                </>
            )}
            { updateModal? (
                <p>Update Modal</p>
            ):(
                <>
                </>
            )}
            </div>
        </>
    )
}
export default Home
