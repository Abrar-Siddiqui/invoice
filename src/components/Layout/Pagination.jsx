import ArrowLeftSIcon from "../Icons/ArrowLeftS.jsx";
import ArrowRightSIcon from "../Icons/ArrowRightS.jsx";

export default function Pagination() {
    return (
        <div className="pagination">
            <button className="button is-small has-icon is-outlined" disabled>
                <ArrowLeftSIcon />
            </button>
            <span>
                1 / 10
            </span>
            <button className="button is-small has-icon is-outlined">
                <ArrowRightSIcon />
            </button>
        </div>
    )
}