import { useEffect, useRef, useState } from "react";
import AccountIcon from "../Icons/AccountIcon.jsx";

export const ProfileMenuItem = ({ children }) => {
    return (
        <li className="profile-menu__item">
            {children}
        </li>
    )
};

export default function ProfileMenu({ children }) {
    const [open, setOpen] = useState(false);
    
    const menuRef = useRef();

    const handleClose = e => {
        if(menuRef.current && menuRef.current.contains(e.target)) {
            return;
        }

        setOpen(false);
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClose);

        return () => document.removeEventListener('mousedown', handleClose);
    }, [menuRef]);

    return (
        <div className="profile-menu__wrapper">
            <button 
                onClick={() => setOpen(true)} 
                className="button icon-button profile-menu__trigger"
            >
                <AccountIcon />
            </button>
            <div ref={menuRef} className={`profile-menu${open ? ' open' : ''}`}>
                <ul className="profile-menu__items">
                    {children}
                </ul>
            </div>
        </div>
    )
}