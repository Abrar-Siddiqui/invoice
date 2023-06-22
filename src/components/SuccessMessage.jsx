import CheckIcon from "./Icons/CheckIcon.jsx";

export default function SuccessMessage({ message }) {
    return (
        <div className="success-message">
            <span className="icon">
                <CheckIcon />
            </span>
            {message}
        </div>
    )
}