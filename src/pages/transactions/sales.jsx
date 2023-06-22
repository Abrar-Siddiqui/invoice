import { useEffect, useState, useContext, useCallback } from "react";
import { Link } from "react-router-dom";
import DropDown from "../../components/Form/DropDown.jsx";
import AddIcon from "../../components/Icons/AddIcon.jsx";
import PrintIcon from "../../components/Icons/PrintIcon.jsx";
import ShareIcon from "../../components/Icons/ShareIcon.jsx";
import Pagination from "../../components/Layout/Pagination.jsx";
import { datetimeFormatter } from "../../lib/formatter.js";
import { useIndexedDB } from "react-indexed-db";
import { NoData } from "../../styles/customerStyle";
import { StoreContext } from "../../store/store-context.js";
import { useNavigate } from "react-router-dom";
import { PDF_DOC } from "../../store/actions.js";

export default function Sales() {
  const [data, setData] = useState();
  const navigate = useNavigate();
  const [_, dispatch] = useContext(StoreContext);
  const [sorting, setSorting] = useState("name");

  useEffect(() => {
    const { indexId } = JSON.parse(localStorage.getItem("authUser"));
    const { getByID } = useIndexedDB("userData");
    getByID(indexId).then((userFromDB) => {
      setData(userFromDB);
    });
  }, []);

  const printHandler = (id) => {
    try {
      const { selectedItem } = data.sale.filter((item) => item.id === id)[0];
      const genData = data.sale.filter((item) => item.id === id)[0];
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
          title: "Sale Detail",
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
        <h4 className="text-xl md:text-[2.2rem]">Sales</h4>
        <Link
          to="/transactions/create/sale"
          className="button is-small has-icon is-primary w-max-content hover:bg-slate-500"
        >
          <AddIcon />
          Add Sale
        </Link>
      </div>
      <div className="flex   justify-center place-content-center  ">
        <div className="my-4 bg-white mt-[27px] shadow-2xl  shadow-slate-400 border-[2px]  border-dashed border-black rounded-lg w-[90%]  ">
          {data && data.sale.length > 0 ? (
            <>
              <div className="card w-100pc p-0 g-0">
                <div className="flex jc-between ai-center p-1rem">
                  <h3 className="section-title">Sales</h3>
                  <DropDown
                    defaultValue="newest"
                    onChange={(value) => setSorting(value)}
                    options={[
                      { text: "Newest", value: "newest" },
                      { text: "Oldest", value: "oldest" },
                      { text: "Name", value: "name" },
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
                      {data.sale.sort(sortParties).map((invoice) => {
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
                                  onClick={() => printHandler(invoice.id)}
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
              You have no Sales...
              <Link
                to="/transactions/create/sale"
                className="button is-small has-icon is-primary w-max-content hover:bg-slate-500 hover:shadow-2xl hover:shadow-black"
              >
                <AddIcon />
                Add Sale
              </Link>
            </NoData>
          )}
        </div>
      </div>
    </div>
  );
}
