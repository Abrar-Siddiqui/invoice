import { Link } from "react-router-dom";
import DropDown from "../components/Form/DropDown.jsx";
import AddIcon from "../components/Icons/AddIcon.jsx";
import Pagination from "../components/Layout/Pagination.jsx";
import { useIndexedDB } from "react-indexed-db";
import { NoData } from "../styles/customerStyle.jsx";
import { useCallback, useEffect, useState } from "react";

export default function Inventory() {
  const [data, setData] = useState();
  const [sorting, setSorting] = useState("name");

  useEffect(() => {
    const { indexId } = JSON.parse(localStorage.getItem("authUser"));
    const { getByID } = useIndexedDB("userData");
    getByID(indexId).then((userFromDB) => {
      setData(userFromDB);
    });
  }, []);

  const sortItems = useCallback(
    (a, b) => {
      if (sorting === "itemName") {
        if (a.itemName < b.itemName) {
          return -1;
        }

        if (a.itemName > b.itemName) {
          return 1;
        }

        return 0;
      }

      if (sorting === "added") {
        return a.date_added - b.date_added;
      }

      if (sorting === "price_low") {
        return a.price_low - b.price_low;
      }
      if (sorting === "price_high") {
        return a.price_low - b.price_high;
      }
    },
    [sorting]
  );

  return (
    <div className="bg-slate-300 h-[100vh] rounded-lg shadow-lg  shadow-slate-500 ">
      <div className="flex mx-auto justify-between items-center px-5  py-6 text-xl md:text-[2.2rem]">
        <h4 className="text-xl md:text-[2.2rem]">Items</h4>
        <Link
          to="/add-item"
          className="button is-small has-icon is-primary w-max-content hover:bg-slate-500"
        >
          <AddIcon />
          Add Item
        </Link>
      </div>
      <div className="flex   justify-center place-content-center ">
        <div className="my-4 mt-[27px] bg-white shadow-2xl shadow-slate-400 border-[2px]  border-dashed border-black rounded-lg w-[90%] ">
          {data && data.items.length > 0 ? (
            <>
              <div className="card w-100pc p-0 g-0">
                <div className="flex jc-between ai-center p-1rem">
                  <h3 className="section-title">Inventory</h3>
                  <DropDown
                    options={[
                      { text: "Name", value: "itemName" },
                      { text: "Newest", value: "date_added" },
                      { text: "Price Low", value: "price_low" },
                      { text: "Price High", value: "price_high" },
                    ]}
                  />
                </div>
                <div className="table-container">
                  <table>
                    <thead>
                      <tr>
                        <th>Item Name</th>
                        <th>Selling Price</th>
                        <th>Stock Qty</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.items.sort(sortItems).map((item) => {
                        return (
                          <tr key={item.id}>
                            <td>{item.itemName}</td>
                            <td>{item.sellingPrice}</td>
                            <td>{item.openingStock}</td>
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
              No Items Available add some items...
              <Link
                to="/add-item"
                className="button is-small has-icon is-primary w-max-content hover:bg-slate-500 hover:shadow-2xl hover:shadow-black"
              >
                <AddIcon />
                Add Item
              </Link>
            </NoData>
          )}
        </div>
      </div>
    </div>
  );
}
