const parallax = document.querySelector(".parallax");
const layers = [...document.querySelectorAll(".parallax__layer")];

function throttle(f, ms) {
  let isThrottled = false;

  return function() {
    if (isThrottled) return;

    f.apply(this, arguments);
    isThrottled = true;

    setTimeout(() => (isThrottled = false), ms);
  };
}

function moveLayers(wScroll) {
  layers.forEach(layer => {
    const divider = layer.dataset.speed;
    const strafe = (wScroll * divider) / 20;

    layer.style.transform = `translateY(-${strafe}%) translateZ(0)`;
  });
}

let trottledMoveLayers = throttle(moveLayers, 5);

window.addEventListener("scroll", e => {
  const wScroll = window.pageYOffset;
  trottledMoveLayers(wScroll);
});
