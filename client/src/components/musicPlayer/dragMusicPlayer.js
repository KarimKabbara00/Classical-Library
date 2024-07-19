function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";

        let rawTopVal = parseInt(elmnt.style.top.slice(0, elmnt.style.top.length - 2));
        let rawLeftVal = parseInt(elmnt.style.left.slice(0, elmnt.style.left.length - 2));

        console.log(rawTopVal, rawLeftVal)

        // y-axis boundary
        if (rawTopVal < 55)
            elmnt.style.top = "55px";
        if (rawTopVal >= 470)
            elmnt.style.top = "470px";

        // x-axis boundary
        if (rawLeftVal < -15)
            elmnt.style.left = "-15px";
        if (rawLeftVal >= 695)
            elmnt.style.left = "695px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

export default dragElement;