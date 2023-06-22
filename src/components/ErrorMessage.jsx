import WarningIcon from "./Icons/WarningIcon.jsx";

export default function ErrorMessage({ message }) {
    return (
        <div className="error-message">
            <span className="icon">
                <WarningIcon />
            </span>
            {message}
        </div>
    )
}