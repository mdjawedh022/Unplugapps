import React, { useEffect, useState } from "react";
import "../style/Header.css";
import { useDispatch, useSelector } from "react-redux";
import { HeaderDataPost } from "../redux/Header/action";
import New from "./New";
import Insert from "./Insert";
import { TableDataGet } from "../redux/Details/action";

const Header = () => {
  const dispatch = useDispatch();
  const [vr_no, setVrNo] = useState(null);
  const [vr_date, setVrDate] = useState("");
  const [status, setStatus] = useState("A");
  const [ac_name, setAcName] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const [modalNew, setNew] = useState(false);
  const handleNew = () => setNew(true);
  const handleNewClose = () => setNew(false);
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


  const handleHeaderForm = () => {
    if (
      vr_no === null ||
      vr_date === "" ||
      status === "" ||
      ac_name === "" 
      // ac_amt === sum
    ) {
      alert("Please fill in all required fields!");
    } else if (isNaN(vr_no) || isNaN(sum)) {
      alert("Vr No and Ac Amt must be numeric values!");
    } else {
      // Format the date to the desired format
      const formattedDate = new Date(vr_date).toISOString();
        
      // Create the formData object
      const formData = {
        vr_no: Number(vr_no),
        vr_date: formattedDate,
        status,
        ac_name,
        ac_amt: Number(sum),
      };
     console.log(formData);
      // Dispatch the action
      dispatch(HeaderDataPost(formData))
        .then((res) => alert("Data saved successfully!"))
        .catch((err) => alert("Something went wrong! Please check again."));

      // Reset form fields after successful submission
      setAcAmt(sum);
      setAcName("");
      setStatus("A");
      setVrDate("");
      setVrNo("");
    }
  };
  // ---------------------print-------------------

  const handlePrint = () => {
    // Check if any of the required fields are empty
    if (vr_no === null || vr_date === "" || status === "" || ac_name === "") {
      alert("Please fill in all required fields before printing!");
      return;
    }

    // Create a printable version of the bill content
    const printableContent = `
      VR No: ${vr_no}
      VR Date: ${vr_date}
      Status: ${status}
      AC Name: ${ac_name}
      AC Amt: ${sum}
  `;

    // Open a new window for printing
    const printWindow = window.open("", "_blank");

    // Write the printable content to the new window
    printWindow.document.write(`
      <html>
        <head>
          <title>Printable Bill</title>
        </head>
        <body>
          <pre>${printableContent}</pre>
        </body>
      </html>
  `);

    // Close the document after writing
    printWindow.document.close();

    // Trigger the print dialog
    printWindow.print();

    // Reset form fields after successful printing
    setAcName("");
    setStatus("A");
    setVrDate("");
    setVrNo("");
  };

  return (
    <>
      <New
        handleNew={handleNew}
        handleNewClose={handleNewClose}
        modalNew={modalNew}
      />
      <div className="header-wrapper">
        {/* ----------------navbar-section-------- */}
        <div className="navbar-wrapper">
          <h1>Unplugapps</h1>
        </div>
        <div className="form-Wrapper">
          {/*------------------- header form----------------------------- */}
          <form>
            <div>
              <label htmlFor="vrNo">Vr No:- </label>
              <input
                type="number"
                id="vr_no"
                name="vr_no"
                value={vr_no}
                onChange={(e) => setVrNo(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="vrDate">Vr Date </label>
              <input
                type="date"
                id="vr_date"
                name="vr_date"
                value={vr_date}
                onChange={(e) => setVrDate(e.target.value)}
                required
              />
            </div>
            <div className="status-wrapper">
              <label htmlFor="status">Status</label>
              <input
                type="text"
                id="status"
                name="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
              />
            </div>
            <div className="ac-name">
              <label htmlFor="acName">Ac Name </label>
              <input
                type="text"
                id="ac_name"
                name="ac_name"
                value={ac_name}
                onChange={(e) => setAcName(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="acAmt">Ac Amt </label>
              <input
                type="number"
                id="ac_amt"
                name="ac_amt"
                value={sum}
                onChange={(e) => setAcAmt(e.target.value)}
                required
              />
            </div>
          </form>
          <div className="grid">
            <button onClick={handleNew}>New</button>
            <button onClick={handleOpen}>Insert</button>
            <button onClick={handleHeaderForm}>Save</button>
            <button onClick={handlePrint}>Print</button>
          </div>
        </div>
      </div>
      {/* ------------------------modal------------------------- */}
      <Insert open={open} setOpen={setOpen}  />
    </>
  );
};

export default Header;
