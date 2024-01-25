import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { TableDataGet } from '../redux/Details/action';
import { PostMultiple } from '../redux/Insert/action';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "10px",
  p: 4,
  display:"flex",
  flexDirection:"column"
};

const input = {
  mt: "10px",
  mb: "10px",
};

const Insert = ({ setOpen ,open}) => {
    const dispatch=useDispatch();
  const handleClose = () => setOpen(false);
  const [vrNo, setvrNo] = useState(null);
  const [srNo, setSrNo] = useState(null);
  const [itemCode, setItemCode] = useState("");
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [qty, setQty] = useState(null);
  const [rate, setRate] = useState(null);
const [vr_date, setVrDate] = useState("");
const [status, setStatus] = useState("A");
const [ac_name, setAcName] = useState("");
  const dataTable = useSelector((state) => state.detailReducer);


   useEffect(() => {
     dispatch(TableDataGet());
   }, [dispatch]);
  const sumtotal = dataTable?.dataTable?.data?.reduce((prv, current) => {
    const itemAmount = current.rate * current.qty;
    return prv + itemAmount;
  }, 0);

  let sum = Math.floor(sumtotal);
const [ac_amt, setAcAmt] = useState(sum);
  // ------------------insert------------------
 const handleAdd = () => {
   // Check if any required field is empty or not a valid number
   if (
     isNaN(parseFloat(vrNo)) ||
     isNaN(parseFloat(srNo)) ||
     !itemCode ||
     !itemName ||
     !description ||
     isNaN(parseFloat(qty)) ||
     isNaN(parseFloat(rate)) ||
     !vr_date ||
     !ac_name
   ) {
     // Display an alert if any required field is empty or not a valid number
     alert(
       "Please fill in all required fields and ensure numeric fields are valid."
     );
     return;
   }
//  const formattedDate = new Date(vr_date).toISOString();
   // Perform actions to handle the data, for example, send it to a backend API
   const formData = {
     Vr_no: parseFloat(vrNo),
     Sr_no: parseFloat(srNo),
     itemCode,
     itemName,
     description,
     qty: parseFloat(qty),
     rate: parseFloat(rate),
     vr_date,
     status,
     ac_name,
    //  ac_amt: sum,
   };
   dispatch(PostMultiple(formData));
   // Display the form data (you can replace this with your desired logic)
   console.log("Form Data:", formData);

   // Reset the form fields
   setvrNo(null);
   setSrNo(null);
   setItemCode("");
   setItemName("");
   setDescription("");
   setQty(null);
   setRate(null);
   setVrDate("");
   setStatus("A");
   setAcName("");
  //  setAcAmt(sum);

   // Close the modal
   handleClose();
 };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h4">Insert</Typography>
          <Box sx={{ display: "flex", flexDirection: "row", gap: "10px" }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <TextField
                sx={input}
                id="standard-basic"
                label="Sr_no"
                variant="standard"
                value={srNo}
                onChange={(e) => setSrNo(e.target.value)}
              />
              <TextField
                sx={input}
                id="standard-basic"
                label="Vr_no"
                variant="standard"
                value={vrNo}
                onChange={(e) => setvrNo(e.target.value)}
              />
              <TextField
                sx={input}
                id="standard-basic"
                label="item_code"
                variant="standard"
                value={itemCode}
                onChange={(e) => setItemCode(e.target.value)}
              />
              <TextField
                sx={input}
                id="standard-basic"
                label="item_name"
                variant="standard"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              />
              <TextField
                sx={input}
                id="standard-basic"
                label="description"
                variant="standard"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <TextField
                sx={input}
                id="standard-basic"
                label="qty"
                variant="standard"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
              />
              <TextField
                sx={input}
                id="standard-basic"
                label="rate"
                variant="standard"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
              />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <TextField
                sx={input}
                type='date'
                id="standard-basic"
                // label="vr_date"
                variant="standard"
                value={vr_date}
                onChange={(e) => setVrDate(e.target.value)}
              />

              <TextField
                sx={input}
                id="standard-basic"
                label="status"
                variant="standard"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              />

              <TextField
                sx={input}
                id="standard-basic"
                label="ac_name"
                variant="standard"
                value={ac_name}
                onChange={(e) => setAcName(e.target.value)}
              />

              <TextField
                sx={input}
                id="standard-basic"
                label="ac_amt"
                variant="standard"
                value={sum}
                onChange={(e) => setAcAmt(e.target.value)}
              />
            </Box>
          </Box>
          <Button
            sx={{
              mt: "10px",
              background: "lightblue",
              color: "#fff",
              "&:hover": {
                background: "darkblue",
              },
              cursor: "pointer",
            }}
            onClick={handleAdd}
          >
            Add
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default Insert
