import { useContext } from "react";
import { CLOSE_DRAWER, OPEN_DRAWER } from "../store/actions.js";
import { StoreContext } from "../store/store-context.js";

export default function useDrawer() {
    const [state, dispatch] = useContext(StoreContext);

    const open = () => dispatch({ type: OPEN_DRAWER });

    const close = () => dispatch({ type: CLOSE_DRAWER });
    
    return {
        open,
        close,
        isOpen: state.drawerOpen
    };
}