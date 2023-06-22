import { forwardRef, useState } from "react"

export default forwardRef(function Switch({ name, label, ...props }, ref) {
    return (
        <label className="switch-label">
            {label}
            <input
                ref={ref} 
                type="checkbox"
                {...props}
                hidden 
            />
            <span className="switch">
                <span className="switch-circle"></span>
            </span>
        </label>
    )
})