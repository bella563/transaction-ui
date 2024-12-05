import React, { useState } from 'react';
import { addTransaction } from '../api';
import { TextField, Button, Grid, Typography, Paper, Snackbar, Alert } from '@mui/material';

const AddTransactionForm = ({ onClose, onTransactionAdded }) => {
  const [description, setDescription] = useState('');
  const [type, setType] = useState('REVENUE');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Handle form submission
  const handleSubmit = async () => {
    if (!description || !amount || !date) {
      setErrorMessage('Tous les champs sont obligatoires.');
      setOpenSnackbar(true);
      return;
    }

    const newTransaction = {
      description,
      type,
      amount: parseFloat(amount),
      date,
    };

    try {
      const addedTransaction = await addTransaction(newTransaction);  // Assuming addTransaction API is working
      onTransactionAdded(addedTransaction);
      setSuccessMessage('Transaction ajoutée avec succès!');
      setOpenSnackbar(true);
      onClose();  // Close form after success
    } catch (error) {
      setErrorMessage('Erreur lors de l\'ajout de la transaction');
      setOpenSnackbar(true);
    }
  };

  return (
    <Paper className="p-6 my-4 rounded-lg shadow-lg">
      <Typography variant="h6" gutterBottom className="text-center text-xl mb-4">
        Ajouter une Transaction
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            variant="outlined"
            size="small"
            className="mb-4"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            label="Montant"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            fullWidth
            variant="outlined"
            size="small"
            type="number"
            className="mb-4"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            label="Date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            fullWidth
            variant="outlined"
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            className="mb-4"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            select
            label="Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            fullWidth
            variant="outlined"
            size="small"
            className="mb-4"
            SelectProps={{
              native: true,
            }}
          >
            <option value="REVENUE">Revenu</option>
            <option value="EXPENSE">Dépense</option>
          </TextField>
        </Grid>

        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            fullWidth
            className="mt-4"
          >
            Ajouter
          </Button>
        </Grid>
      </Grid>

      {/* Snackbar pour afficher le message de succès ou d'erreur */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={successMessage ? 'success' : 'error'}
          sx={{ width: '100%' }}
        >
          {successMessage || errorMessage}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default AddTransactionForm;
