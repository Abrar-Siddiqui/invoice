import { useEffect, useRef, useState } from "react";
import DropDownIcon from "../Icons/DropDownIcon.jsx";

export default function DropDownButton({ text, isOpen = false, children }) {
    const [open, setOpen] = useState(isOpen);
    const optionsRef = useRef();

    const triggerRef = useRef();

    const toggleMenu = () => setOpen(open => !open);

    const handleClose = e => {
        if(
            (optionsRef.current && optionsRef.current.contains(e.target)) || 
            (triggerRef.current && triggerRef.current.contains(e.target))
        ) {
            return;
        }

        setOpen(false);
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClose);

        return () => document.removeEventListener('mousedown', handleClose);
    }, [optionsRef]);

    return (
        <div className="drop-down">
            <button 
                ref={triggerRef}
                onClick={toggleMenu} 
                className="button drop-down__trigger"
            >
                <DropDownIcon />
                {text}
            </button>
            <ul 
                ref={optionsRef} 
                className={`drop-down__options${open ? ' show' : ''}`}
                style={{ height: open ? `${optionsRef.current.scrollHeight}px` : '0px' }}
            >
                {
                    children.map((child, i) => {
                        return (
                            <li 
                                key={i}
                                className={`drop-down__item p-0`}
                            >
                                {child}
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    );
}