import React from "react";

function BlockAccess() {

    const style = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "1.75rem",
        height: "100vh",
        border: "1px solid brown",
        textAlign: "center",
    }
    const brown = {
        color: "brown",
        fontWeight: "bold"
    }

    return (
        <div style={style}>
            <span>
                For the best experience with the <span style={brown}>Classical Library</span>, please switch to landscape mode on your device or use a larger screen.
            </span>
        </div>
    )
}

export default BlockAccess;