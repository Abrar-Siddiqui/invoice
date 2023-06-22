import { forwardRef } from "react"

export default forwardRef(function PriceInput(props, ref) {
    return (
        <div className="input-container">
            <span className="input-symbol pos-start">₹</span>
            <input ref={ref} type="text" className="input" {...props} />
        </div>
    )
})