import React, { useEffect } from "react";
import "../style/Details.css";
import { useDispatch, useSelector } from "react-redux";
import { TableDataGet, deleteTableData } from "../redux/Details/action";
const Details = () => {
  const dispatch = useDispatch();
  const dataTable = useSelector((state) => state.detailReducer);
  console.log(dataTable);
  const sum = dataTable?.dataTable?.data?.reduce((prv, current) => {
    const itemAmount = current.rate * current.qty;
    return prv + itemAmount;
  }, 0);
  console.log(sum);
  const hnadleDelete=(i)=>{
    dispatch(deleteTableData(i));
  }
  useEffect(() => {
    dispatch(TableDataGet());
  }, [dispatch]);
  return (
    <div className="detail-wrapper">
      <div className="detail-heading">
        <h1>Details</h1>
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
                    <td onClick={() => hnadleDelete(i)}>Delete</td>
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
                <td>{Math.floor(sum)}</td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default Details;
