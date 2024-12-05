import axios from 'axios';

// Base URL de ton API backend
const API_URL = 'http://localhost:8080/transactions';

// Fonction pour récupérer toutes les transactions
export const getTransactions = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des transactions:", error);
  }
};

// Fonction pour ajouter une transaction
export const addTransaction = async (transaction) => {
  try {
    const response = await axios.post(API_URL, transaction);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'ajout de la transaction:", error);
  }
};

// Fonction pour modifier une transaction
export const updateTransaction = async (id, transaction) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, transaction);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la modification de la transaction:", error);
  }
};

// Fonction pour supprimer une transaction
export const deleteTransaction = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error("Erreur lors de la suppression de la transaction:", error);
  }
};
