import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import StoreProvider from "./store/StoreProvider.jsx";
import { Provider } from "react-redux";

import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  LineController,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import { CategoryScale } from "chart.js";
import { store } from "./store/redux-toolkit/store";

ChartJS.register(
  LineController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <StoreProvider>
        <App />
      </StoreProvider>
    </Provider>
  </React.StrictMode>
);
