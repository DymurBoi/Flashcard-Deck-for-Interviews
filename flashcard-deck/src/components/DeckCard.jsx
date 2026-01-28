import Typography from "@mui/material/Typography";

function DeckCard({ deck, onClick }) {
  return (
    <div className="deck-card" onClick={() => onClick(deck.id)}>
      <div className="deck-card-text">
        <Typography variant="h5">{deck.title}</Typography>
      </div>
    </div>
  );
}

export default DeckCard;
