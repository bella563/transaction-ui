import React, { useState } from 'react';
import { Container, CssBaseline, Typography, Box, Paper } from '@mui/material';
import TransactionList from './components/TransactionList';
import AddTransactionForm from './components/AddTransactionForm';

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddTransaction = () => {
    setIsAdding(true);
  };

  const handleCloseForm = () => {
    setIsAdding(false);
  };

  const handleTransactionAdded = (newTransaction) => {
    setTransactions([...transactions, newTransaction]);
  };

  return (
    <div style={{ backgroundColor: '#f4f6f9', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <CssBaseline />
      <Container maxWidth="md">
        <Paper style={{ padding: '20px', marginTop: '20px', backgroundColor: '#ffffff' }}>
          <Typography variant="h4" align="center" gutterBottom>
            Gestion des Transactions
          </Typography>

          {isAdding ? (
            <AddTransactionForm
              onClose={handleCloseForm}
              onTransactionAdded={handleTransactionAdded}
            />
          ) : (
            <TransactionList
              transactions={transactions}
              onAddTransaction={handleAddTransaction}
            />
          )}
        </Paper>
      </Container>
    </div>
  );
};

export default App;
