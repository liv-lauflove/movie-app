import { useMovieContext } from "../contexts/MovieContext";
import "../css/Toast.css";

function Toast() {
    const { toastMessage } = useMovieContext();

    if (!toastMessage) return null;

    return (
        <div className="toast-container">
            <div className="toast-message">
                {toastMessage}
            </div>
        </div>
    );
}

export default Toast;
