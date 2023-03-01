const { Button, Dialog, DialogTitle, DialogContent, DialogContentText, Typography, TextField } = require("@mui/material");
const { useState } = require("react");

function CashInOut() {
  const [open, setOpen] = useState(false);
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
    console.log(`Cash in amount: ${amount}, txn number: ${txnNumber}`);
  };

  const handleWithdraw = () => {
    // submit withdraw data to backend
    console.log(
      `Withdraw amount: ${withdrawAmount}, account number: ${withdrawAccountNumber}`
    );
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Cash In / Withdraw
      </Button>
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
            <Button variant="contained" color="primary" onClick={handleCashIn}>
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
            <Button variant="contained" color="primary" onClick={handleWithdraw}>
              Submit Withdraw
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
