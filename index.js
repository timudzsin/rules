// As soon as the entire page is completely loaded,
window.addEventListener("load", () => {
	// fade in the body
	document.body.classList.add("loaded-body");
});


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