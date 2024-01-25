import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Button, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { itemPost } from '../redux/New/action';
const input = {
  mt: "10px",
  mb: "10px",
};
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
};

const New = ({ handleNew, handleNewClose, modalNew }) => {
 const [item_code, setItemCode] = useState("");
 const [item_name, setItemName] = useState("");  
 const dispatch=useDispatch()

  const handleSubmit = () => {
   
    if (item_code.trim() === "" || item_name.trim() === "") {
      alert("Please fill in both item code and item name.");
      return; 
    }
    let data = { item_code, item_name };
    dispatch(itemPost(data))
      .then((res) => alert("Data saved successfully!"))
      .catch((err) => alert("Something went wrong! Please check again."));

    handleNewClose()
    setItemCode("")
    setItemName("")
    console.log("Submitted Item", data);
  }
  return (
    <div>
      <Modal
        open={modalNew}
        onClose={handleNewClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField
            sx={input}
            id="standard-basic"
            variant="standard"
            label="item_code"
            value={item_code}
            onChange={(e) => setItemCode(e.target.value)}
          />
          <TextField
            sx={input}
            id="standard-basic"
            variant="standard"
            label="item_name"
            value={item_name}
            onChange={(e) => setItemName(e.target.value)}
          />
          <Button
            onClick={handleSubmit}
            sx={{
              fontWeight: "500",

              background: "lightblue",
              color: "#fff",
              "&:hover": {
                background: "darkblue",
              },
            }}
          >
            Submit
          </Button>
        </Box>
      </Modal>
    </div>
  );
};
export default New;