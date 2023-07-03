import { useEffect, useMemo, useState } from "react";
import { Line } from "react-chartjs-2";
import DropDown from "../components/Form/DropDown.jsx";
import { recentInvoices } from "../data.js";
import { datetimeFormatter } from "../lib/formatter.js";
import { NoData } from "../styles/customerStyle.jsx";
import { Flex } from "../styles/globalStyles.jsx";
import { useIndexedDB } from "react-indexed-db";
import HomeContainer from "./Containers/Home/HomeContainers.jsx";
import "../styles/Home.css";
import SideSearchCustomer from "./Containers/Home/SideSearchCustomer.jsx";
import CustomerGraph from "./Containers/Home/CustomerGraph.jsx";
import { useGetUserDataQuery } from "../store/redux-toolkit/Slices/GetDataSlice.js";

// const info = [
//     { amount: 200, date: '01-02-2023' },
//     { amount: 450, date: '08-02-2023' },
//     { amount: 235, date: '12-02-2023' },
//     { amount: 123, date: '18-02-2023' },
//     { amount: 99, date: '26-02-2023' }
// ]

// const datasets = {
//     year: {
//         labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
//         datasets: [{
//             label: 'Sales',
//             data: info.map(item=>item.amount),
//             fill: false,
//             borderColor: '#6750EFff',
//             tension: 0.1
//         }]
//     },
//     month: {
//         // labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
//         labels: info.filter(item => {
//             const now = new Date()
//             const nowMonth = JSON.stringify(now).slice(6, 8)
//             const formattedMonth = (nowMonth - 1).toString().length > 1 ? (nowMonth - 1).toString() : (nowMonth - 1).toString().padStart(2, '0')
//             return item.date.slice(3, 5) === formattedMonth
//         }).map(item => item.date.slice(0,2)),

//         datasets: [{
//             label:[1,6] ,
//             data: info.filter(item => {
//                 const now = new Date()
//                 const nowMonth = JSON.stringify(now).slice(6, 8)
//             const formattedMonth = (nowMonth - 1).toString().length > 1 ? (nowMonth - 1).toString() : (nowMonth - 1).toString().padStart(2, '0')
//                 return item.date.slice(3, 5) === formattedMonth
//             }).map(item=>item.amount),
//             fill: false,
//             borderColor: '#6750EFff',
//             tension: 0.1
//         }]
//     },
//     week: {
//         labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
//         datasets: [{
//             label: 'Sales',
//             data: [65, 40, 50, 61, 46, 55, 40],
//             fill: false,
//             borderColor: '#6750EFff',
//             tension: 0.1
//         }]
//     }
// };

// const purchasesData = {
//     labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
//     datasets: [{
//         label: 'Purchases',
//         data: [50, 80, 80, 50, 30, 55, 80],
//         fill: false,
//         borderColor: '#ff4d4d',
//         tension: 0.1
//     }]
// };

const options = {
  responsive: true,
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        display: false,
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
};

export default function Home() {
  const [selectedSale, setSelectedSale] = useState("month");
  const [selectedPurchase, setSelectedPurchase] = useState("month");
  const [data, setData] = useState();
  const [saleData, setSaleData] = useState("");
  const [purchaseData, setPurchaseData] = useState("");
  const dates = ["2018-09-12", "2018-10-18", "2018-12-30"];

  useEffect(() => {
    const { indexId } = JSON.parse(localStorage.getItem("authUser"));
    const { getByID } = useIndexedDB("userData");
    getByID(indexId).then((userFromDB) => {
      setData(userFromDB);
      console.log(userFromDB);

      setSaleData({
        year: {
          labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          datasets: [
            {
              label: "Sales",
              data: userFromDB.sale.map((item) => item.amount),
              fill: false,
              borderColor: "#6750EFff",
              tension: 0.1,
            },
          ],
        },
        month: {
          // labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
          labels: userFromDB.sale
            .filter((item) => {
              const searchDate = new Date() - 2629800000;
              return (
                new Date(item.invoiceDate).getTime() > searchDate &&
                new Date(item.invoiceDate).getTime() < new Date().getTime()
              );
            })
            .map((item) => item.invoiceDate.slice(8, 10)),

          datasets: [
            {
              label: "sales",
              data: userFromDB.sale
                .filter((item) => {
                  const searchDate = new Date() - 2629800000;
                  return (
                    new Date(item.invoiceDate).getTime() > searchDate &&
                    new Date(item.invoiceDate).getTime() < new Date().getTime()
                  );
                })
                .map((item) =>
                  item.selectedItem.reduce((acc, curr) => acc + +curr.amount, 0)
                ),
              fill: false,
              borderColor: "#6750EFff",
              tension: 0.1,
            },
          ],
        },
        week: {
          labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          datasets: [
            {
              label: "Sales",
              data: [65, 40, 50, 61, 46, 55, 40],
              fill: false,
              borderColor: "#6750EFff",
              tension: 0.1,
            },
          ],
        },
        today: {
          labels: ["2018-09-12", "2018-10-18", "2018-12-30"],
          datasets: [
            {
              label: "today",
              data: dates.filter((d) => new Date(d) - new Date() > 0),
            },
          ],
        },
      });

      setPurchaseData({
        year: {
          labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          datasets: [
            {
              label: "Sales",
              data: userFromDB.purchase.map((item) => item.amount),
              fill: false,
              borderColor: "#6750EFff",
              tension: 0.1,
            },
          ],
        },
        month: {
          labels: userFromDB.purchase
            .filter((item) => {
              const searchDate = new Date() - 2629800000;
              return (
                new Date(item.invoiceDate).getTime() > searchDate &&
                new Date(item.invoiceDate).getTime() < new Date().getTime()
              );
            })
            .map((item) => item.invoiceDate.slice(8, 10)),

          datasets: [
            {
              label: "sales",
              data: userFromDB.purchase
                .filter((item) => {
                  const searchDate = new Date() - 2629800000;
                  return (
                    new Date(item.invoiceDate).getTime() > searchDate &&
                    new Date(item.invoiceDate).getTime() < new Date().getTime()
                  );
                })
                .map((item) =>
                  item.selectedItem.reduce((acc, curr) => acc + +curr.amount, 0)
                ),
              fill: false,
              borderColor: "#ff4d4d",
              tension: 0.1,
            },
          ],
        },
        week: {
          labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          datasets: [
            {
              label: "Sales",
              data: [65, 40, 50, 61, 46, 55, 40],
              fill: false,
              borderColor: "#6750EFff",
              tension: 0.1,
            },
          ],
        },
        today: {
          labels: ["2018-09-12", "2018-10-18", "2018-12-30"],
          datasets: [
            {
              label: "today",

              data: dates.filter((d) => new Date(d) - new Date() > 0),
            },
          ],
        },
      });
    });
  }, []);

  return (
    <div className="h-auto rounded-md bg-slate-300 p-5 shadow-xl  shadow-slate-500 ">
      <div className="w-[100%]">
        <div>
          <HomeContainer />
        </div>
        <div className="justify-between gap-4 md:flex">
          <div className="w-[100%] md:w-[100%]">
            <div
              // style={{ display: "flex", gap: "1rem", paddingBottom: "2px" }}
              className=" mx-auto  gap-3 pb-1 md:flex "
            >
              <div className="mb-3 w-[100%] rounded-lg bg-slate-100 p-5  shadow-sm shadow-slate-600 md:w-[49.5%] md:p-5 ">
                <div className="card__header   ">
                  <h3 className="section-title p-0">Sales</h3>
                  <DropDown
                    onChange={(value) => setSelectedSale(value)}
                    options={useMemo(() => {
                      return [
                        { text: "Today", value: "today" },
                        { text: "Month", value: "month" },
                        { text: "Week", value: "week" },
                        { text: "Year", value: "year" },
                      ];
                    }, [])}
                    defaultValue={selectedSale}
                  />
                </div>
                {saleData && (
                  <Line data={saleData[selectedSale]} options={options} />
                )}
              </div>
              <div className="mb-3 w-[100%] rounded-lg bg-slate-100 p-5  shadow-sm shadow-slate-600 md:w-[49.5%]  md:p-5 ">
                <div className="card__header">
                  <h3 className="section-title p-0">Purchases</h3>
                  <DropDown
                    onChange={(value) => setSelectedPurchase(value)}
                    options={useMemo(() => {
                      return [
                        { text: "Today", value: "today" },
                        { text: "Month", value: "month" },
                        { text: "Week", value: "week" },
                        { text: "Year", value: "year" },
                      ];
                    }, [])}
                    defaultValue={selectedPurchase}
                  />
                </div>
                {purchaseData && (
                  <Line
                    data={purchaseData[selectedPurchase]}
                    options={options}
                  />
                )}
              </div>
            </div>
            {/* </Flex> */}
            {data && data.recent.length > 0 ? (
              <>
                <div className="card w-100pc g-0 p-0">
                  <h3 className="section-title p-1rem">Recent Invoices</h3>
                  <div className="table-container">
                    <table>
                      <thead>
                        <tr>
                          <th>Invoice no</th>
                          <th>Invoice Type</th>
                          <th>Party Name</th>
                          <th>Total Amount</th>
                          <th>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.recent.map((invoice) => {
                          return (
                            <tr key={invoice.id}>
                              <td>{invoice.invoiceNumber}</td>
                              <td>
                                <span
                                  className={`badge${
                                    invoice.type === "purchase" ? " danger" : ""
                                  }`}
                                >
                                  {invoice.type.toUpperCase()}
                                </span>
                              </td>
                              <td>{invoice.name}</td>
                              <td>
                                {invoice.selectedItem.reduce(
                                  (acc, curr) => acc + +curr.amount,
                                  0
                                )}
                              </td>
                              <td>{invoice.invoiceDate}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            ) : (
              <div className="mb-3 rounded-lg border-b-4 border-black bg-white py-3 shadow-xl md:my-0">
                <CustomerGraph />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
