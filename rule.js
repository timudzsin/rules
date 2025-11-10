// --- KÓD AZ OLDAL VÁLTÁSHOZ ---
document.querySelectorAll("a").forEach(link => {
	link.addEventListener("click", function (e) {
		const HREF = this.href;

		// csak az azonos ablakban történő navigációt kezeljük (anchor-ok, új fülek stb. kihagyása)
		if (HREF && this.target !== "_blank" && !HREF.startsWith("#")) {
			e.preventDefault();

			// elhalványítás indítása CSS "transition" segítségével
			document.body.classList.remove("loaded-body");

			// megvárjuk a "transition" végét, aztán navigálunk
			setTimeout(() => {
				window.location.href = HREF;
			}, 300); // ugyanannyi, mint a CSS "transition" időtartama
		}
	});
});









// --- KÓD AZ OLDAL BETÖLTÉSEKOR VALÓ HALVÁNYULÓ MEGJELENÉSHEZ ---
// Amint az egész oldal teljesen betöltődött,
window.addEventListener("load", () => {
	// a body be halványul egy CSS class segítségével
	document.body.classList.add("loaded-body");
});
