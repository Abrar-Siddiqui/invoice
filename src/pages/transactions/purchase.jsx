import { Link } from "react-router-dom";
import DropDown from "../../components/Form/DropDown.jsx";
import AddIcon from "../../components/Icons/AddIcon.jsx";
import PrintIcon from "../../components/Icons/PrintIcon.jsx";
import ShareIcon from "../../components/Icons/ShareIcon.jsx";
import Pagination from "../../components/Layout/Pagination.jsx";
import { recentInvoices } from "../../data.js";
import { datetimeFormatter } from "../../lib/formatter.js";
import { useIndexedDB } from "react-indexed-db";
import { NoData } from "../../styles/customerStyle";
import { useEffect, useState, useContext, useCallback } from "react";
import { StoreContext } from "../../store/store-context.js";
import { PDF_DOC } from "../../store/actions.js";
import { useNavigate } from "react-router-dom";

export default function Purchase() {
  const [data, setData] = useState();
  const [_, dispatch] = useContext(StoreContext);
  const [sorting, setSorting] = useState("name");
  const navigate = useNavigate();

  useEffect(() => {
    const { indexId } = JSON.parse(localStorage.getItem("authUser"));
    const { getByID } = useIndexedDB("userData");
    getByID(indexId).then((userFromDB) => {
      setData(userFromDB);
    });
  }, []);

  const printHandler = (id) => {
    try {
      const { selectedItem } = data.purchase.filter(
        (item) => item.id === id
      )[0];
      const genData = data.purchase.filter((item) => item.id === id)[0];
      const dataArray = selectedItem.map((item, i) => {
        return {
          S_No: `${i + 1}`,
          Item: `${item.itemName}`,
          Quantity: `${item.quantity}`,
          Unit_Rate: `${item.rate}`,
          Amount: `${item.amount}`,
          HSN: `${item.hsnCode}`,
        };
      });

      dispatch({
        type: PDF_DOC,
        payload: {
          title: "Purchase Detail",
          column: ["S_No", "Item", "HSN", "Quantity", "Unit_Rate", "Amount"],
          data: dataArray,
          generalData: genData,
        },
      });

      navigate("/pdfViewer");
    } catch (error) {
      console.log(error);
    }
  };

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

      if (sorting === "oldest") {
        return a.dateCreated - b.dateCreated;
      }

      if (sorting === "newest") {
        return b.dateCreated - a.dateCreated;
      }

      // if (sorting === 'last_transaction') {
      //     return a.last_transaction - b.last_transaction;
      // }
    },
    [sorting]
  );

  return (
    <div className="bg-slate-300 h-[100vh] rounded-lg shadow-lg  shadow-slate-500 ">
      <div className="flex mx-auto justify-between items-center px-5 text-xl md:text-[2.2rem]  py-6">
        <h4 className="text-xl md:text-[2.2rem] font-bold md:font-normal">
          Purchase
        </h4>
        <Link
          to="/transactions/create/purchase"
          className="button is-small has-icon is-primary w-max-content hover:bg-slate-500"
        >
          <AddIcon />
          Add Purchase
        </Link>
      </div>
      <div className="flex   justify-center place-content-center ">
        <div className="my-4 bg-white mt-[27px] shadow-2xl shadow-slate-400 border-[2px]  border-dashed border-black rounded-lg w-[90%] ">
          {data && data.purchase.length > 0 ? (
            <>
              <div className="card w-100pc p-0 g-0">
                <div className="flex jc-between ai-center p-1rem">
                  <h3 className="section-title">Purchase</h3>
                  <DropDown
                    defaultValue="name"
                    onChange={(value) => setSorting(value)}
                    options={[
                      { text: "name", value: "name" },
                      { text: "Newest", value: "newest" },
                      { text: "Oldest", value: "oldest" },
                    ]}
                  />
                </div>
                <div className="table-container">
                  <table>
                    <thead>
                      <tr>
                        <th>Invoice no</th>
                        <th>Party Name</th>
                        <th>Total Amount</th>
                        <th>Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.purchase.sort(sortParties).map((invoice) => {
                        return (
                          <tr key={invoice.id}>
                            <td>{invoice.invoiceNumber}</td>
                            <td>{invoice.name}</td>
                            <td>
                              {invoice.selectedItem.reduce(
                                (acc, curr) => acc + +curr.amount,
                                0
                              )}
                            </td>
                            <td>
                              {datetimeFormatter.format(invoice.dateCreated)}
                            </td>
                            <td>
                              <div className="flex g-0_5rem">
                                <button
                                  className="button is-small is-primary has-icon"
                                  onClick={() => {
                                    printHandler(invoice.id);
                                  }}
                                >
                                  <PrintIcon />
                                  Print
                                </button>
                                <button className="button is-small is-secondary has-icon">
                                  <ShareIcon />
                                  Share
                                </button>
                              </div>
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
              You have no Purchases...
              <Link
                to="/transactions/create/purchase"
                className="button is-small has-icon is-primary w-max-content hover:bg-slate-500 hover:shadow-2xl hover:shadow-black"
              >
                <AddIcon />
                Add Purchase
              </Link>
            </NoData>
          )}
        </div>
      </div>
    </div>
  );
}
