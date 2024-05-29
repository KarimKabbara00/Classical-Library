import React from "react"
import "../../css/homepage.css"

function QueryError(props) {
    return (
        <div className="errorMessage">
            <span className="query">{props.errorMessage}</span>
        </div>
    )
}

export default QueryError