import React, { useState } from "react";
import "../style/Header.css";
import { useDispatch } from "react-redux";
import { HeaderDataPost } from "../redux/Header/action";

const Header = () => {
  const dispatch = useDispatch();
  const [vr_no, setVrNo] = useState(null);
  const [vr_date, setVrDate] = useState("");
  const [status, setStatus] = useState("A");
  const [ac_name, setAcName] = useState("");
  const [ac_amt, setAcAmt] = useState(null);
  // const [formData, setFormData] = useState({
  //   vr_no: null,
  //   vr_date: "",
  //   status: "A",
  //   ac_name: "",
  //   ac_amt: null,
  // });

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };

  // const handleHeaderForm = () => {
  //   if (
  //     vr_no === null ||
  //     vr_date === "" ||
  //     status === "" ||
  //     ac_name === "" ||
  //     ac_amt === null
  //   ) {
  //     alert("Please fill in all required fields!");
  //   } else if (isNaN(vr_no) || isNaN(ac_amt)) {
  //     alert("Vr No and Ac Amt must be numeric values!");
  //   } else {
  //     let formData = { vr_no, vr_date, status, ac_name, ac_amt };
  //     dispatch(HeaderDataPost(formData))
  //       .then((res) => alert("Data saved successfully!"))
  //       .catch((err) => alert("Something went wrong! Please check again."));
  //     console.log(formData);
  //     // Reset form fields after successful submission
  //     setAcAmt(null);
  //     setAcName("");
  //     setStatus("A");
  //     setVrDate("");
  //     setVrNo(null);
  //   }
  // };


  const handleHeaderForm = () => {
    if (
      vr_no === null ||
      vr_date === "" ||
      status === "" ||
      ac_name === "" ||
      ac_amt === null
    ) {
      alert("Please fill in all required fields!");
    } else if (isNaN(vr_no) || isNaN(ac_amt)) {
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
        ac_amt: Number(ac_amt),
      };

      // Dispatch the action
      dispatch(HeaderDataPost(formData))
        .then((res) => alert("Data saved successfully!"))
        .catch((err) => alert("Something went wrong! Please check again."));

      // Reset form fields after successful submission
      setAcAmt(null);
      setAcName("");
      setStatus("A");
      setVrDate("");
      setVrNo(null);
    }
  };
  return (
    <div className="header-wrapper">
      {/* ----------------navbar-section-------- */}
      <div className="navbar-wrapper">
        <h1>Unplugapps</h1>
      </div>
      <div className="form-Wrapper">
        <form>
          <div>
            <label htmlFor="vrNo">Vr No:-</label>
            <input
              type="number"
              id="vr_no"
              name="vr_no"
              value={vr_no}
              onChange={(e)=>setVrNo(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="vrDate">Vr Date</label>
            <input
              type="date"
              id="vr_date"
              name="vr_date"
              value={vr_date}
              onChange={(e)=>setVrDate(e.target.value)}
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
              onChange={(e)=>setStatus(e.target.value)}
              required
            />
          </div>
          <div className="ac-name">
            <label htmlFor="acName">Ac Name</label>
            <input
              type="text"
              id="ac_name"
              name="ac_name"
              value={ac_name}
              onChange={(e)=>setAcName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="acAmt">Ac Amt</label>
            <input
              type="number"
              id="ac_amt"
              name="ac_amt"
              value={ac_amt}
              onChange={(e)=>setAcAmt(e.target.value)}
              required
            />
          </div>
        </form>
        <div className="grid">
          <button>New</button>
          <button>Insert</button>
          <button onClick={handleHeaderForm}>Save</button>
          <button>Print</button>
        </div>
      </div>
    </div>
  );
};

export default Header;
