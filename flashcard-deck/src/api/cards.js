import api from "./axios";

export const getDeck = () => {
  return api.get("/deck/all");
};

export const getDeckById = () => {
  return api.get(`/deck/${id}`);
};

// POST a new card
export const createDeck = (cardData) => {
  return api.post("/deck/post", cardData);
};

// UPDATE card
export const updateDeck = (id, data) => {
  return api.patch(`/deck/${id}`, data);
};

// DELETE card
export const deleteDeck = (id) => {
  return api.delete(`/deck/${id}`);
};

export const getCards = () => {
  return api.get("/card/all");
};

// POST a new card
export const createCard = (cardData) => {
  return api.post("/card/post", cardData);
};

// UPDATE card
export const updateCard = (id, data) => {
  return api.patch(`/card/${id}`, data);
};

// DELETE card
export const deleteCard = (id) => {
  return api.delete(`/card/${id}`);
};
