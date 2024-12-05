import React, { useEffect, useState } from 'react';
import { getTransactions, deleteTransaction, updateTransaction, addTransaction } from '../api'; 
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, Snackbar, Alert, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import EditTransactionForm from './EditTransactionForm'; 
import AddTransactionForm from './AddTransactionForm'; 

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);  
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null);  
  const [successMessage, setSuccessMessage] = useState('');  
  const [snackbarOpen, setSnackbarOpen] = useState(false);  
  const [selectedTransaction, setSelectedTransaction] = useState(null);  
  const [showAddForm, setShowAddForm] = useState(false);  
  const [dialogOpen, setDialogOpen] = useState(false);  // Pour gérer l'état du Dialog de confirmation
  const [transactionToDelete, setTransactionToDelete] = useState(null);  // Transaction à supprimer

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await getTransactions();
        setTransactions(data || []);  
      } catch (err) {
        setError('Erreur lors du chargement des transactions');
      } finally {
        setLoading(false);  
      }
    };

    fetchTransactions();
  }, []); 

  const handleDeleteConfirmation = (transaction) => {
    setTransactionToDelete(transaction);  // Sauvegarder la transaction à supprimer
    setDialogOpen(true);  // Ouvrir le Dialog de confirmation
  };

  const handleDelete = async () => {
    try {
      if (transactionToDelete) {
        await deleteTransaction(transactionToDelete.id);
        setTransactions(transactions.filter(transaction => transaction.id !== transactionToDelete.id));
        setSuccessMessage('Transaction supprimée avec succès');
        setSnackbarOpen(true); 
        setDialogOpen(false);  // Fermer le Dialog après la suppression
      }
    } catch (err) {
      setError('Erreur lors de la suppression de la transaction');
      setSnackbarOpen(true);
      setDialogOpen(false);  // Fermer le Dialog en cas d'erreur
    }
  };

  const handleCancelDelete = () => {
    setDialogOpen(false);  // Fermer le Dialog sans effectuer la suppression
  };

  const handleEdit = (transaction) => {
    setSelectedTransaction(transaction);
  };

  const handleUpdate = async (updatedTransaction) => {
    try {
      await updateTransaction(updatedTransaction); 
      setTransactions(transactions.map(transaction =>
        transaction.id === updatedTransaction.id ? updatedTransaction : transaction
      ));
      setSuccessMessage('Transaction mise à jour avec succès');
      setSnackbarOpen(true);  
      setSelectedTransaction(null);
    } catch (err) {
      setError('Erreur lors de la mise à jour de la transaction');
      setSnackbarOpen(true);
    }
  };

  const handleAddTransaction = async (newTransaction) => {
    try {
      const addedTransaction = await addTransaction(newTransaction);
      setTransactions([...transactions, addedTransaction]);
      setSuccessMessage('Transaction ajoutée avec succès');
      setSnackbarOpen(true);
      setShowAddForm(false);  
    } catch (err) {
      setError('Erreur lors de l\'ajout de la transaction');
      setSnackbarOpen(true);
    }
  };

  const totalBalance = transactions.reduce((acc, transaction) => {
    if (transaction.type === 'REVENUE') {
      return acc + transaction.amount;
    } else if (transaction.type === 'EXPENSE') {
      return acc - transaction.amount;
    }
    return acc;
  }, 0);

  return (
    <div>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        {!selectedTransaction && !showAddForm && (
          <Button variant="contained" color="primary" onClick={() => setShowAddForm(true)}>
            Ajouter une Transaction
          </Button>
        )}
        <Typography variant="h6" color="textSecondary">
          Solde total : {totalBalance} €
        </Typography>
      </Box>

      {loading ? (
        <Typography variant="h6" color="textSecondary">Chargement des transactions...</Typography>
      ) : error ? (
        <Typography variant="h6" color="error">{error}</Typography>
      ) : selectedTransaction ? (
        <EditTransactionForm 
          transaction={selectedTransaction} 
          onSave={handleUpdate}
          onCancel={() => setSelectedTransaction(null)}  
        />
      ) : showAddForm ? (
        <AddTransactionForm 
          onTransactionAdded={handleAddTransaction}
          onClose={() => setShowAddForm(false)} 
        />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Description</strong></TableCell>
                <TableCell><strong>Type</strong></TableCell>
                <TableCell><strong>Montant</strong></TableCell>
                <TableCell><strong>Date</strong></TableCell>
                <TableCell><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>{transaction.type}</TableCell>
                  <TableCell>{transaction.amount} €</TableCell>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>
                    <Button 
                      onClick={() => handleEdit(transaction)} 
                      variant="contained" 
                      color="secondary" 
                      style={{ marginRight: '8px' }}
                    >
                      Modifier
                    </Button>
                    <Button 
                      onClick={() => handleDeleteConfirmation(transaction)} 
                      variant="outlined" 
                      color="error"
                    >
                      Supprimer
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={successMessage ? 'success' : 'error'}
          sx={{ width: '100%' }}
        >
          {successMessage || error}
        </Alert>
      </Snackbar>

      {/* Dialog de confirmation de suppression */}
      <Dialog
        open={dialogOpen}
        onClose={handleCancelDelete}
      >
        <DialogTitle>Confirmer la suppression</DialogTitle>
        <DialogContent>
          <Typography>
            Êtes-vous sûr de vouloir supprimer cette transaction ?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Annuler
          </Button>
          <Button onClick={handleDelete} color="error">
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TransactionList;
