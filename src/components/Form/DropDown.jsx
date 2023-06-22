import { useEffect, useMemo, useRef, useState } from "react";
import DropDownIcon from "../Icons/DropDownIcon.jsx";

export default function DropDown({ text, isOpen = false, defaultValue = '', options = [], onChange }) {
    const [open, setOpen] = useState(isOpen);
    const [selected, setSelected] = useState(
        options.find(option => option.value === defaultValue) ?? options[0]
    );

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

    const handleSelect = option => {
        setOpen(false);

        if(option.value === selected?.value) {
            return;
        }

        setSelected(option);
        if(onChange) {
            onChange(option.value);
        }
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
                {
                    selected
                        ? selected.text
                        : text
                }
            </button>
            <ul 
                ref={optionsRef} 
                className={`drop-down__options${open ? ' show' : ''}`}
                style={{ height: open ? `${optionsRef.current.scrollHeight}px` : '0px' }}
            >
                {
                    options.map((option) => {
                        return (
                            <li 
                                key={option.value}
                                onClick={() => handleSelect(option)} 
                                className={`drop-down__item${selected?.value === option.value ? ' selected' : ''}`}
                            >
                                {option.text}
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    );
}