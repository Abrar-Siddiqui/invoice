import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetSingleDataQuery,
  useUpdateDataMutation,
} from "../../../store/redux-toolkit/Slices/GetDataSlice";

const UpdatePage = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [bank, setBank] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [acname, setAcname] = useState("");
  const [addess, setAddress] = useState("");
  const [data1, setData1] = useState("");
  const params = useParams();
  const { id } = params;
  const { data, isLoading, isFetching } = useGetSingleDataQuery(id);
  const [updateData, response] = useUpdateDataMutation();
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoading || isFetching) {
      console.log("Lodding data ?");
    } else {
      setData1(data.result);
      setName(data.result.party_name);
      setPhone(data.result.phone_no);
      setAcname(data.result.ac_holder_name);
      setBank(data.result.account_no);
      setIfsc(data.result.ifsc_code);
      setAddress(data.result.address);
    }
  }, [data]);
  const values = {
    id: id,
    party_name: name,
    phone_no: phone,
    address: addess,
    ifsc_code: ifsc,
    ac_holder_name: acname,
    account_no: bank,
  };

  const SubmitHandler = (e) => {
    e.preventDefault();
    updateData(values)
      .then(() => {
        navigate("/customers");
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(values);
  };
  return (
    <div className="flex dir-col g-1rem">
      {/* <h4>Add {partyType === "customer" ? "Customer" : "Supplier"}</h4> */}
      <div className="cards">
        <div className="card">
          <form onSubmit={SubmitHandler}>
            <div className="flex ai-top g-1rem">
              <div className="field flex-1 required">
                <label htmlFor="name">Party name</label>
                <input
                  className="input"
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="field flex-1 required">
                <label htmlFor="phone">Phone no</label>
                <input
                  className="input"
                  type="text"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>
            <div className="md:flex ai-top g-1rem">
              <div className="field flex-1 required">
                <label htmlFor="name">Bank A/C Number</label>
                <input
                  className="input"
                  type="text"
                  id="account"
                  value={bank}
                  onChange={(e) => setBank(e.target.value)}
                />
              </div>
              <div className="field flex-1 required">
                <label htmlFor="phone">IFSC No.</label>
                <input
                  className="input"
                  type="text"
                  id="ifsc"
                  value={ifsc}
                  onChange={(e) => setIfsc(e.target.value)}
                />
              </div>
              <div className="field flex-1 required">
                <label htmlFor="phone">Ac Holder Name</label>
                <input
                  className="input"
                  type="text"
                  id="acholname"
                  value={acname}
                  onChange={(e) => setAcname(e.target.value)}
                />
              </div>
            </div>
            <div className="field required">
              <label htmlFor="address">Address</label>
              <textarea
                type="text"
                id="address"
                value={addess}
                onChange={(e) => setAddress(e.target.value)}
              ></textarea>
            </div>
            <button className="button block-button is-small is-primary">
              Update
            </button>
          </form>
        </div>
      </div>
      {/* <ToastContainer /> */}
    </div>
  );
};

export default UpdatePage;
