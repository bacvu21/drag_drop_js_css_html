let counter = 0;
let dragEnabled = true; // Flag to track drag state
function duplicate(id) {
    var original = document.getElementById(id);
    var clone = original.cloneNode(true); // "deep" clone
    clone.id = "duplicator" + ++counter; // there can only be one element with an ID
    clone.style.position = 'absolute'; // Ensure clones are positioned absolutely
    clone.style.top = (parseInt(original.style.top) + 20) + "px"; // Position clones offset from the original
    clone.style.left = (parseInt(original.style.left) + 20) + "px"; // Position clones offset from the original
    original.parentNode.appendChild(clone);
    if (dragEnabled) {
        enableDrag(clone); // Enable drag for the new clone if drag is enabled
    }
}

function enableDrag(element) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    element.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}
function toggleLock() {
    dragEnabled = !dragEnabled; // Toggle dragEnabled flag

    var containers = document.getElementsByClassName('container');
    if (dragEnabled) {
        for (let i = 0; i < containers.length; i++) {
            enableDrag(containers[i]); // Re-enable drag for all containers
        }
    } else {
        for (let i = 0; i < containers.length; i++) {
            containers[i].onmousedown = null; // Disable drag for all containers
        }
    }
}

function toggleResize() {
    var containers = document.getElementsByClassName('container');
    for (let i = 0; i < containers.length; i++) {
        containers[i].classList.toggle('no-resize');
    }
    resizingEnabled = !resizingEnabled; // Toggle the resizing flag
}


// Ensure initial div is draggable
document.addEventListener('DOMContentLoaded', function() {
    enableDrag(document.getElementById('div0'));
});
