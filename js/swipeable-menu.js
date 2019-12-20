const sidebar = document.querySelector(".sidebar");
const container = document.querySelector(".container");

window.onload = () => {
  if (window.PointerEvent) {
    container.addEventListener("pointerdown", handleGestureStart, true);
    container.addEventListener("pointermove", handleGestureMove, true);
    container.addEventListener("pointerup", handleGestureEnd, true);
    container.addEventListener("pointercancel", handleGestureEnd, true);
  } else {
    container.addEventListener("touchstart", handleGestureStart, true);
    container.addEventListener("touchmove", handleGestureMove, true);
    container.addEventListener("touchend", handleGestureEnd, true);
    container.addEventListener("touchcancel", handleGestureEnd, true);
  }
  container.addEventListener("mousedown", this.handleGestureStart, true);
};

let initialTouchPos = null;
let endTouchPos = null;
function getGesturePointFromEvent(evt) {
  let point = 0;

  if (evt.targetTouches) {
    // Prefer Touch Events
    point = evt.targetTouches[0].clientX;
  } else {
    // Either Mouse event or Pointer Event
    point = evt.clientX;
  }

  return point;
}

const handleGestureStart = evt => {
  evt.preventDefault();

  if (evt.touches && evt.touches.length > 1) {
    return;
  }

  // Add the move and end listeners
  if (window.PointerEvent) {
    evt.target.setPointerCapture(evt.pointerId);
  } else {
    // Add Mouse Listeners
    document.addEventListener("mousemove", handleGestureMove, true);
    document.addEventListener("mouseup", handleGestureEnd, true);
  }

  initialTouchPos = getGesturePointFromEvent(evt);
};

const handleGestureEnd = evt => {
  evt.preventDefault();

  if (evt.touches && evt.touches.length > 0) {
    return;
  }

  // Remove Event Listeners
  if (window.PointerEvent) {
    evt.target.releasePointerCapture(evt.pointerId);
  } else {
    // Remove Mouse Listeners
    document.removeEventListener("mousemove", handleGestureMove, true);
    document.removeEventListener("mouseup", handleGestureEnd, true);
  }

  if (initialTouchPos - endTouchPos < 0) {
    sidebar.classList.add("sidebar--open");
  } else {
    sidebar.classList.remove("sidebar--open");
  }
  initialTouchPos = null;
  endTouchPos = null;
};

const handleGestureMove = evt => {
  evt.preventDefault();

  if (!initialTouchPos) {
    return;
  }

  endTouchPos = getGesturePointFromEvent(evt);
};
