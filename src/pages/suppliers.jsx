import { useCallback, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DropDown from "../components/Form/DropDown.jsx";
import DropDownButton from "../components/Form/DropDownButton.jsx";
import AddIcon from "../components/Icons/AddIcon.jsx";
import DeleteIcon from "../components/Icons/DeleteIcon.jsx";
import PencilIcon from "../components/Icons/PencilIcon.jsx";
import Pagination from "../components/Layout/Pagination.jsx";
import { datetimeFormatter } from "../lib/formatter.js";
import { useIndexedDB } from "react-indexed-db";
import { NoData } from "../styles/customerStyle.jsx";

import { useGetALlSuplierQuery } from "../store/redux-toolkit/Slices/GetDataSlice.js";

export default function Suppliers() {
  const [sorting, setSorting] = useState("name");
  // const [data, setData] = useState();
  const { data, isLoading } = useGetALlSuplierQuery();

  useEffect(() => {
    const { indexId } = JSON.parse(localStorage.getItem("authUser"));
    const { getByID } = useIndexedDB("userData");
    getByID(indexId).then((userFromDB) => {
      // setData(userFromDB);
    });
  }, []);

  const sortParties = useCallback(
    (a, b) => {
      if (sorting === "name") {
        if (a.name < b.name) {
          return -1;
        }

        if (a.name > b.name) {
          return 1;
        }

        return 0;
      }

      if (sorting === "date_added") {
        return a.date - b.date;
      }

      // if (sorting === 'last_transaction') {
      //     return a.last_transaction - b.last_transaction;
      // }
    },
    [sorting]
  );

  return (
    <div className="bg-slate-300 h-[100vh] rounded-lg shadow-lg  shadow-slate-500 ">
      <div className="flex mx-auto justify-between items-center px-5  py-6 text-xl md:text-[2.2rem]">
        <h4 className="text-xl md:text-[2.2rem]">Suppliers</h4>
        <Link
          to="/add-party/supplier"
          className="button is-small has-icon is-primary w-max-content hover:bg-slate-500"
        >
          <AddIcon />
          Add Supplier
        </Link>
      </div>

      <div className="flex   justify-center place-content-center ">
        <div className="my-4 mt-[27px] bg-white shadow-2xl shadow-slate-400 border-[2px]  border-dashed border-black rounded-lg w-[90%] ">
          {data && data.result.length > 0 ? (
            <>
              <div className="elevated">
                <div className="flex ai-center p-1rem">
                  <DropDown
                    onChange={(value) => setSorting(value)}
                    defaultValue="name"
                    options={[
                      { text: "Name", value: "name" },
                      { text: "Date Added", value: "date_added" },
                      { text: "Last Transaction", value: "last_transaction" },
                    ]}
                  />
                </div>
                <div className="scrollable">
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Date Added</th>
                        <th>Last Transaction</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data &&
                        data.result.map((supplier) => {
                          return (
                            <tr key={supplier.id}>
                              <td>{supplier.name}</td>
                              <td>{supplier.phone}</td>
                              <td>{datetimeFormatter.format(supplier.date)}</td>
                              <td>{datetimeFormatter.format(supplier.date)}</td>
                              <td>
                                <DropDownButton text="Actions">
                                  <button className="button block-button is-small has-icon text-danger">
                                    <DeleteIcon />
                                    Delete
                                  </button>
                                  <button className="button block-button is-small has-icon">
                                    <PencilIcon />
                                    Edit
                                  </button>
                                </DropDownButton>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
              <Pagination />
            </>
          ) : (
            <NoData transform="translate(0,-50%)">
              Looks like you have no Supplier...
              <Link
                to="/add-party/supplier"
                className="button is-small has-icon is-primary w-max-content hover:bg-slate-500 hover:shadow-2xl hover:shadow-black"
              >
                <AddIcon />
                Add Supplier
              </Link>
            </NoData>
          )}
        </div>
      </div>
    </div>
  );
}
