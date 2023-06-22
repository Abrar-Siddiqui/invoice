import { useContext } from "react";
import { LOGOUT } from "../store/actions.js";
import { StoreContext } from "../store/store-context.js";

export default function useAuth() {
    const [state, dispatch] = useContext(StoreContext);

    const logout = () => {
        dispatch({ type: LOGOUT });
    };

    return {
        ...state.auth,
        logout
    };
}