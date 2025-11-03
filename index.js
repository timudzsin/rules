// code for the border
const borderContainer = document.getElementById('border-container');
const svg = document.getElementById('svg-box');
const path = document.getElementById('rectPath');

function updateSVG() {
	const { width, height } = borderContainer.getBoundingClientRect();
	const margin = width/31; // padding between edge and border text

	// Update viewBox so coordinates match container size
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
new ResizeObserver(updateSVG).observe(borderContainer);




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




// As soon as the entire page is completely loaded,
window.addEventListener("load", () => {
	// fade in the body
	document.body.classList.add("loaded-body");
});


