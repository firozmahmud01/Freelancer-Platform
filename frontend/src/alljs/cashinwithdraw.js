import { cashin, withdraw } from "./AllApi";

const { Button, Dialog, DialogTitle, DialogContent, DialogContentText, Typography, TextField } = require("@mui/material");
const { useState } = require("react");

export default function CashInOut({open,setOpen}) {
  
  const [amount, setAmount] = useState('');
  const [txnNumber, setTxnNumber] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawAccountNumber, setWithdrawAccountNumber] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCashIn = () => {
    // submit cash in data to backend
    cashin(amount,txnNumber);

  };

  const handleWithdraw = () => {
    // submit withdraw data to backend
    withdraw(withdrawAmount,withdrawAccountNumber);
  };

  return (
    
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Cash In / Withdraw</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To perform cash in or withdraw, please enter the required information
            below:
          </DialogContentText>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Typography variant="subtitle1">Cash In</Typography>
            <TextField
              label="Amount"
              variant="outlined"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <TextField
              label="Transaction Number"
              variant="outlined"
              value={txnNumber}
              onChange={(e) => setTxnNumber(e.target.value)}
            />
            <Button sx={{backgroundColor:'yellow',color:'black'}} variant="contained" color="primary" onClick={handleCashIn}>
              Submit Cash In
            </Button>
            <Typography variant="subtitle1">Withdraw</Typography>
            <TextField
              label="Withdraw Amount"
              variant="outlined"
              type="number"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
            />
            <TextField
              label="Withdraw Account Number"
              variant="outlined"
              value={withdrawAccountNumber}
              onChange={(e) => setWithdrawAccountNumber(e.target.value)}
            />
            <Button variant="contained" sx={{backgroundColor:'yellow',color:'black'}} onClick={handleWithdraw}>
              Submit Withdraw
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    
  );
}
