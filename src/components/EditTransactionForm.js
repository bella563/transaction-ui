import React, { useState, useEffect } from 'react';
import { Button, TextField, MenuItem, Box, Typography } from '@mui/material';

const EditTransactionForm = ({ transaction, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    type: 'REVENUE',
    date: ''
  });

  // Effectuer une mise à jour des champs lorsque la transaction est passée en prop
  useEffect(() => {
    if (transaction) {
      setFormData({
        description: transaction.description || '',
        amount: transaction.amount || '',
        type: transaction.type || 'REVENUE',
        date: transaction.date || ''
      });
    }
  }, [transaction]);

  // Gérer la mise à jour des champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Gérer la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) {
      onSave(formData);  // Appeler la fonction de sauvegarde en passant les données du formulaire
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, margin: '0 auto' }}>
      <Typography variant="h6" gutterBottom>
        Modifier la transaction
      </Typography>

      <TextField
        fullWidth
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        required
        margin="normal"
      />

      <TextField
        fullWidth
        label="Montant"
        name="amount"
        type="number"
        value={formData.amount}
        onChange={handleChange}
        required
        margin="normal"
      />

      <TextField
        fullWidth
        label="Type"
        name="type"
        select
        value={formData.type}
        onChange={handleChange}
        margin="normal"
      >
        <MenuItem value="REVENUE">Revenu</MenuItem>
        <MenuItem value="EXPENSE">Dépense</MenuItem>
      </TextField>

      <TextField
        fullWidth
        label="Date"
        name="date"
        type="date"
        value={formData.date}
        onChange={handleChange}
        required
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
      />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
        <Button variant="contained" color="primary" type="submit">
          Sauvegarder
        </Button>
        <Button variant="outlined" color="secondary" onClick={onCancel}>
          Annuler
        </Button>
      </Box>
    </Box>
  );
};

export default EditTransactionForm;
