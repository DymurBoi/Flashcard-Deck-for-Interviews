function DeckCard({ deck, onClick }) {
  return (
    <div className="deck-card" onClick={() => onClick(deck.id)}>
      <h3>{deck.title}</h3>
      <p>{deck.cardCount} cards</p>
    </div>
  );
}

export default DeckCard;
