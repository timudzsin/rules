//    CODE FOR THE BORDER
// grabbing the needed html elements
const borderContainer = document.getElementById('border-container');
const svg = document.getElementById('svg-box');
const path = document.getElementById('rectPath');
const textPath = document.querySelector('textPath');

// setting the text content of the border, to the rules in random order.
const rules = [
  "THIS IS RULE ONE . ",
  "THIS IS RULE ONE . ",
  "THIS IS RULE TWO . ",
  "THIS IS RULE TWO . ",
  "THIS IS THE THIRD RULE . ",
  "THIS IS THE THIRD RULE . ",
  "THIS IS THE FOURTH RULE . ",
  "THIS IS THE FOURTH RULE . ",
  "THIS IS RULE NUMBER FIVE, THIS IS ALSO LONGER . ",
  "THIS IS RULE NUMBER FIVE, THIS IS ALSO LONGER . ",
  "THIS IS RULE NUMBER SIX, THIS IS ALSO LONGER . ",
  "THIS IS RULE NUMBER SIX, THIS IS ALSO LONGER . ",
  "RULE SEVEN IS THIS ONE . ",
  "RULE SEVEN IS THIS ONE . ",
  "RULE EIGHT IS THIS ONE . ",
  "RULE EIGHT IS THIS ONE . ",
  "RULE NUMBER NINE IS THIS ONE, THIS IS LONGER . ",
  "RULE NUMBER NINE IS THIS ONE, THIS IS LONGER . ",
  "RULE NUMBER TEN IS THIS ONE, THIS IS LONGER . ",
  "RULE NUMBER TEN IS THIS ONE, THIS IS LONGER . ",
];
// Fisher–Yates shuffle
for (let i = rules.length - 1; i > 0; i--) {
	const j = Math.floor(Math.random() * (i + 1));
	[rules[i], rules[j]] = [rules[j], rules[i]];
}
textPath.innerHTML=rules.join("");

function updateSVG() {
	const { width, height } = borderContainer.getBoundingClientRect();
	const margin = width/29; // padding between edge and border text

	// Update viewBox so coordinates(viewBox) of the svg match the container size
	svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

	// Compute path dynamically
	const d = `
	M${margin},${margin}
	H${width - margin}
	V${height - margin}
	H${margin}
	Z
	`;
	path.setAttribute('d', d);
}

updateSVG();
// updateSVG() gets called every time the borderContainer is resized.
new ResizeObserver(updateSVG).observe(borderContainer);





//    CODE FOR THE RANDOM QUOTE
const QUOTES = [
	`"This is quote number one."`,
	`"This is quote number two."`,
	`"This is quote number three, this one is a bit longer."`,
	`"This is quote number four, this one is a lot longer. Lorem ipsum fingsum binsum ingus bungus bangus."`,
];
// pick a random quote and put it inside the quote container
const p = document.createElement("p");
p.textContent = QUOTES[Math.floor(Math.random() * QUOTES.length)];
document.getElementById("quote-container").appendChild(p);





//    CODE FOR SITE SWITCHING
// Intercept link clicks
document.querySelectorAll("a").forEach(link => {
	link.addEventListener("click", function (e) {
		const href = this.href;

		// only handle same-window navigation (ignore anchors, new tabs, etc.)
		if (href && this.target !== "_blank" && !href.startsWith("#")) {
			e.preventDefault();

			// trigger fade out
			document.body.classList.remove("loaded-body");

			// wait for the transition to finish, then navigate
			setTimeout(() => {
				window.location.href = href;
			}, 300); // match CSS transition duration
		}
	});
});





//    CODE FOR THE FADE IN EFFECT WHEN THE PAGE IS LOADED
// As soon as the entire page is completely loaded,
window.addEventListener("load", () => {
	// fade in the body
	document.body.classList.add("loaded-body");
});


