import { useReducer } from "react";
import reducer from "./reducer.js";
import { StoreContext } from "./store-context.js";

export default function StoreProvider({ children }) {
    const initialState = {
        auth: {
            currentUser: null,
            token: null
        },
        drawerOpen: false,
        pdfDoc: {
            title: "",
            column: [],
            data: [],
            generalData:{}
        }
    };

    return (
        <StoreContext.Provider value={useReducer(reducer, initialState)}>
            {children}
        </StoreContext.Provider>
    )
}