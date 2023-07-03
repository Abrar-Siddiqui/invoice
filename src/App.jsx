import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/home.jsx";
import Login from "./pages/login.jsx";
import PrivateRoute from "./components/Router/PrivateRoute.jsx";
import AppLayout from "./layouts/AppLayout.jsx";
import Sales from "./pages/transactions/sales.jsx";
import Purchase from "./pages/transactions/purchase.jsx";
import Inventory from "./pages/inventory.jsx";
import Suppliers from "./pages/suppliers.jsx";
import Customers from "./pages/customers.jsx";
import AddParty from "./pages/add-party.jsx";
import AddItem from "./pages/add-item.jsx";
import CreateInvoice from "./pages/transactions/create.jsx";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "./store/store-context";
import { DBConfig } from "./DBConfig";
import { initDB } from "react-indexed-db";
import PdfViewer from "./pages/pdfViewer";
import { BILLSHILL_URL } from "./constants.js";
import SingleViewData from "./pages/Containers/SingleViewData/SingleViewData/";
import UpdatePage from "./pages/Containers/UpdatePage/UpdatePage";
import InvoiceForm from "./invoiceGenrator/components/InvoiceForm";

initDB(DBConfig);

function App() {
  const [authUser, setAuthUser] = useState("");
  const [state, dispatch] = useContext(StoreContext);

  const doAuthUser = (data) => {
    try {
      if (data) {
        localStorage.setItem("authUser", JSON.stringify(data));
        setAuthUser(data);
      } else {
        const token = localStorage.getItem("authUser");
        setAuthUser(token);
      }
    } catch (error) {
      setAuthUser("");
    }
  };

  useEffect(() => {
    doAuthUser();
  }, [state.auth]);

  const messageHandler = (e) => {
    if (e.origin === BILLSHILL_URL) {
      if (!e.data) {
        return;
      }

      console.log(e.data);

      const { data } = e.data;

      console.log("RECIEVED TOKEN");

      doAuthUser(data);
    }
  };

  const handleOnLoad = () => {
    window.opener?.postMessage("loaded", "*");
  };

  useEffect(() => {
    if (!window.opener) {
      return;
    }

    window.addEventListener("message", messageHandler);

    return () => window.removeEventListener("message", messageHandler);
  }, []);

  useEffect(() => {
    window.addEventListener("load", handleOnLoad);

    return () => window.removeEventListener("load", handleOnLoad);
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <AppLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="add-party/:partyType" element={<AddParty />} />
          <Route path="add-item" element={<AddItem />} />
          <Route path="transactions">
            <Route path="sales" element={<Sales />} />
            <Route path="purchase" element={<Purchase />} />
            <Route path="create/:invoiceType" element={<CreateInvoice />} />
          </Route>
          <Route path="inventory" element={<Inventory />} />
          <Route path="suppliers" element={<Suppliers />} />
          <Route path="customers" element={<Customers />} />
          <Route path="invoicegenrator" element={<InvoiceForm />} />

          <Route path="viewsingledata/:id" element={<SingleViewData />} />
          <Route path="customerupdate/:id" element={<UpdatePage />} />
        </Route>
        <Route
          path="/pdfViewer"
          element={authUser ? <PdfViewer /> : <Navigate replace to="/login" />}
        />
        <Route
          path="/login"
          element={!authUser ? <Login /> : <Navigate replace to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
