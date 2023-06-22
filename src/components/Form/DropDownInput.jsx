import { forwardRef, useRef, useState } from "react"
import DropDownIcon from "../Icons/DropDownIcon.jsx";
import Spinner from "../Spinner.jsx";

export default forwardRef(function DropDownInput({ list, onSelect, isLoading = false, onInputChange, setValue, ...props }, ref) {
    const [open, setOpen] = useState(false);

    const containerRef = useRef();

    const [selected, setSelected] = useState('');

    const handleSelect = (item) => {
        setSelected(item.id);
        onSelect(item.id);
        setValue(item.text);
        setOpen(false);
    };

    const handleChange = e => {
        const value = e.target.value;

        setValue(value);
        setSelected('');
        onInputChange && onInputChange(value);
    };

    return (
        <div 
            ref={containerRef} 
            className="dropdown-input" 
            tabIndex='-1' 
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
        >
            <div className="input-container">
                <span className="input-symbol pos-end">
                    <DropDownIcon />
                </span>
                <input
                    ref={ref} 
                    type="text" 
                    className="input" 
                    {...props} 
                    autoComplete='off'
                    onChange={handleChange}
                />
            </div>
            <div className={`dropdown-input-list__container${open ? ' open' : ''}`}>
                {
                    isLoading
                        ? (
                            <div className="flex jc-center ai-center p-1rem flex-1">
                                <Spinner />
                            </div>
                        )
                        : (
                            <ul className='dropdown-input__list'>
                                {
                                    list.map(item => {
                                        return (
                                            <li 
                                                onClick={() => handleSelect(item)}
                                                className={`dropdown-input__list-item${selected === item.id ? ' selected' : ''}`}
                                                key={item.id}
                                            >
                                                {item.text}
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        )
                }
            </div>
        </div>
    )
})