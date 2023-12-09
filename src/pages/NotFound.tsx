import { Link } from "react-router-dom";

const NotFoung = () => {

    return (
        <div className="not-found">
            <div className="container">
                <h1>Page not found</h1>
                <Link to={"/"} className="come-back-btn">
                    <svg viewBox="0 0 8 14" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 13L1 6.93015L6.86175 1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Go Home
                </Link>
            </div>
        </div>
    )
}

export default NotFoung;