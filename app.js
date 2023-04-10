const tlLeave = gsap.timeline({
  defaults: { duration: 0.75, ease: "Power2.easeOut" },
});

const tlEnter = gsap.timeline({
  defaults: { duration: 0.75, ease: "Power2.easeOut" },
});

// Make the functions for the leave and enter animations
const leaveAnimation = (current, done) => {
  const product = current.querySelector(".image-container");
  const text = current.querySelector(".showcase-text");
  const circles = current.querySelectorAll(".circle");
  const arrow = current.querySelector(".showcase-arrow");

  return (
    tlLeave.fromTo(arrow, { opacity: 1, y: 0 }, { opacity: 0, y: 50 }),
    tlLeave.fromTo(
      product,
      { y: 0, opacity: 1 },
      { y: 100, opacity: 0, onComplete: done },
      "<"
    ),
    tlLeave.fromTo(text, { y: 0, opacity: 1 }, { opacity: 0, y: 100 }, "<"),
    tlLeave.fromTo(
      circles,
      { y: 0, opacity: 1 },
      {
        y: -200,
        opacity: 0,
        stagger: 0.15,
        ease: "back.out(1.7)",
        duration: 1,
      },
      "<"
    )
  );
};

const enterAnimation = (current, done, gradient) => {
  const product = current.querySelector(".image-container");
  const text = current.querySelector(".showcase-text");
  const circles = current.querySelectorAll(".circle");
  const arrow = current.querySelector(".showcase-arrow");

  return (
    tlEnter.fromTo(arrow, { opacity: 0, y: 50 }, { opacity: 1, y: 0 }),
    tlEnter.fromTo(
      product,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, onComplete: done },
      "<"
    ),
    tlEnter.to("body", { background: gradient }, "<"),
    tlEnter.fromTo(text, { y: -100, opacity: 0 }, { opacity: 1, y: 0 }, "<"),
    tlEnter.fromTo(
      circles,
      { y: -200, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        ease: "back.out(1.7)",
        duration: 1,
      },
      "<"
    )
  );
};

// Run Animation
barba.init({
  preventRunning: true,
  transitions: [
    // showcase transition
    {
      name: "default",
      leave(data) {
        const done = this.async();
        let current = data.current.container;
        leaveAnimation(current, done);
      },
      enter(data) {
        const done = this.async();
        let next = data.next.container;
        let gradient = getGradient(data.next.namespace);
        enterAnimation(next, done, gradient);
      },
    },
  ],
});

function getGradient(name) {
  switch (name) {
    case "handbag":
      return "linear-gradient(260deg, #b75d62, #754d53)";
    case "boot":
      return "linear-gradient(260deg, #5d89b7, #6a754d)";
    case "hat":
      return "linear-gradient(260deg, #5db772, #2c4b20";
  }
}
