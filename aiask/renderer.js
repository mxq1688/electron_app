const getControlsHeight = () => {
  const controls = document.querySelector("#controls");
  if (controls) {
    return controls.offsetHeight;
  }
  return 0;
};

const calculateLayoutSize = () => {
  const webview = document.querySelector("webview");
  const windowWidth = document.documentElement.clientWidth;
  const windowHeight = document.documentElement.clientHeight;
  // const controlsHeight = getControlsHeight();
  // const webviewHeight = windowHeight - controlsHeight -8;
  // webview.style.width = windowWidth + "px";
  // webview.style.height = windowHeight + "px";
};

window.addEventListener("DOMContentLoaded", () => {
  calculateLayoutSize();

  // Dynamic resize function (responsive)
  window.onresize = calculateLayoutSize;

  // Home button exists
  if (document.querySelector("#home")) {
    document.querySelector("#home").onclick = () => {
      const home = document.getElementById("webview").getAttribute("data-home");
      document.querySelector("webview").src = home;
    };
  }

});
