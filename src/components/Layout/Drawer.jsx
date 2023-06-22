import { NavLink } from "react-router-dom";
import useDrawer from "../../hooks/useDrawer.js"
import Home from "../../pages/home.jsx";
import ArrowLeftSIcon from "../Icons/ArrowLeftS.jsx";
import BillIcon from "../Icons/BillIcon.jsx";
import CartIcon from "../Icons/CartIcon.jsx";
import GroupIcon from "../Icons/GroupIcon.jsx";
import HomeIcon from "../Icons/HomeIcon.jsx";
import ItemsIcon from "../Icons/ItemsIcon.jsx";
import TruckIcon from "../Icons/TruckIcon.jsx";

const DrawerLink = ({ to, icon, text, className }) => {
    return (
        <NavLink to={to} className={`drawer-link ${className}`}>
            <span className="icon">
                {icon}
            </span>
            {text}
        </NavLink>
    )
};

export default function Drawer() {
    const drawer = useDrawer();

    return (
        <aside className={`app-drawer${drawer.isOpen ? ' open' :  ''}`}>
            <button className="button icon-button close-drawer-button" onClick={drawer.close}>
                <ArrowLeftSIcon />
            </button>
            <DrawerLink to="/" icon={<HomeIcon />} text="Home" />
            <div className="drawer-section">
                <h6 className="section-title">Parties</h6>
                <div className="drawer-items">
                    <DrawerLink to="/customers" icon={<GroupIcon />} text="Customers" />
                    <DrawerLink to="/suppliers" icon={<TruckIcon />} text="Suppliers" />
                </div>
            </div>
            <div className="drawer-section">
                <h6 className="section-title">Inventory</h6>
                <div className="drawer-items">
                    <DrawerLink to="/inventory" icon={<ItemsIcon />} text="Items" />
                </div>
            </div>
            <div className="drawer-section">
                <h6 className="section-title">Transactions</h6>
                <div className="drawer-items">
                    <DrawerLink to="/transactions/sales" icon={<BillIcon />} text="Sales" />
                    <DrawerLink className="text-danger" to="/transactions/purchase" icon={<CartIcon />} text="Purchase" />
                </div>
            </div>
        </aside>
    )
}