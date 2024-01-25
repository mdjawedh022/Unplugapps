import React, { useEffect, useState } from "react";
import "../style/Details.css";
import { useDispatch, useSelector } from "react-redux";
import { TableDataGet, deleteTableData, postDetailData } from "../redux/Details/action";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import Header from "./Header";
import Insert from "./Insert";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "10px",
  p: 4,
  display: "flex",
  flexDirection: "column",
};

const input = {
  mt: "10px",
  mb: "10px",
};
const Details = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [vrNo, setVrNo] = useState(null);
  const [srNo, setSrNo] = useState(null);
  const [itemCode, setItemCode] = useState("");
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [qty, setQty] = useState(null);
  const [rate, setRate] = useState(null);

  const dispatch = useDispatch();
  const dataTable = useSelector((state) => state.detailReducer);

 
  const sumtotal = dataTable?.dataTable?.data?.reduce((prv, current) => {
    const itemAmount = current.rate * current.qty;
    return prv + itemAmount;
  }, 0);

 let sum = Math.floor(sumtotal);

  const hnadleDelete = (i) => {
    dispatch(deleteTableData(i));
  };
  
  useEffect(() => {
    dispatch(TableDataGet());
  }, [dispatch]);
 const handleAdd = () => {
   
   if (!srNo || !vrNo || !itemCode || !itemName || !qty || !rate) {
     alert("Please fill in all fields");
     return;
   }

   
   if (isNaN(qty) || isNaN(rate) || isNaN(srNo) ||isNaN(vrNo)) {
     alert("Quantity and rate must be numbers");
     return;
   }

const formData = {
  vr_no: parseInt(vrNo),
  sr_no: parseInt(srNo),
  item_code: itemCode,
  item_name: itemName,
  description: description,
  qty: parseInt(qty),
  rate: parseFloat(rate),
};
dispatch(postDetailData(formData));
  //  console.log(formData);
   setVrNo(null)
   setRate(null)
   setDescription("")
   setItemCode("")
   setItemName("")
   setQty(null)
   setSrNo(null)
   handleClose();
  
 };

  return (
    <>
      <Header sum={sum} />
      <div className="detail-wrapper">
        <div className="detail-heading">
          <h1>Details</h1>
        </div>
        <div className="Add-btn">
          <button onClick={handleOpen}>Add</button>
        </div>
        <div className="detail-data-table">
          <table>
            <thead>
              <tr>
                <th>Sr No</th>
                <th>Item Code</th>
                <th>Item Name</th>
                <th>Qty</th>
                <th>Rate</th>
                <th>Amount</th>
                <th></th>
              </tr>
            </thead>

            {dataTable?.isLoading ? (
              <div>
                <h1>Loading....</h1>
              </div>
            ) : (
              <tbody>
                {dataTable?.dataTable?.data?.map((elem, i) => {
                  return (
                    <tr key={i}>
                      <td>{elem.sr_no}</td>
                      <td>{elem.item_code}</td>
                      <td>{elem.item_name}</td>
                      <td>{elem.qty}</td>
                      <td>{elem.rate}</td>
                      <td>{elem.rate * elem.qty}</td>
                      <td
                        onClick={() => hnadleDelete(i)}
                        className="btn-delete"
                      >
                        Delete
                      </td>
                    </tr>
                  );
                })}{" "}
                <tr>
                  {" "}
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>Total :-</td>
                  <td>{sum}</td>
                </tr>
              </tbody>
            )}
          </table>
        </div>
      </div>
      <Insert sum={sumtotal} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h4">Details</Typography>
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
            onChange={(e) => setVrNo(e.target.value)}
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
    </>
  );
};

export default Details;
