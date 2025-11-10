//    CODE FOR THE BORDER
// grabbing the needed html elements
const borderContainer = document.getElementById('border-container');
const svg = document.getElementById('svg-box');
const svgPath = document.getElementById('rectPath');
const svgTextPath = document.querySelector('textPath');
const svgText = document.getElementById('svg-text');

// setting the text content of the border, to the rules in random order.
const RULES = [
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
  "ÖÜÓŐÚÉÁŰ . ",
  "ÖÜÓŐÚÉÁŰ . ",
];
// Fisher–Yates shuffle
for (let i = RULES.length - 1; i > 0; i--) {
	const j = Math.floor(Math.random() * (i + 1));
	[RULES[i], RULES[j]] = [RULES[j], RULES[i]];
}
svgTextPath.innerHTML=RULES.join("");

function updateSVG() {
	const { width, height } = borderContainer.getBoundingClientRect();
	const padding = 0.053 * width; // padding between edge and border text

	// Update viewBox so coordinates(viewBox) of the svg match the container size
	svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

	// update the font size of the text, according to the size of the container
	svgText.setAttribute('font-size', width/19.5);
	svgText.setAttribute('letter-spacing', -width/146);
	
	// Compute the text path dynamically
	const d = `
	M${padding},${padding}
	H${width - padding}
	V${height - padding}
	H${padding}
	Z
	`;
	svgPath.setAttribute('d', d);
}

updateSVG();
// updateSVG() gets called every time the borderContainer is resized.
new ResizeObserver(updateSVG).observe(borderContainer);






//    CODE FOR THE RANDOM QUOTE
const QUOTES = [
	`"This is quote number one."`,
	`"This is quote number two."`,
	`"This is quote number three, this one is a bit longer."`,
	`"This is quote number four, this one is a lot longer. Lorem ipsum fingsum bingsum ass ass."`,
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






