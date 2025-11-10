// azért van minden szabály 2x, hogy hosszabb legyen a szöveg keret
const ENG_RULES = [
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
const HUN_RULES = [
  "EZ AZ EGYES SZABÁLY . ",
  "EZ AZ EGYES SZABÁLY . ",
  "EZ A KETTES SZABÁLY . ",
  "EZ A KETTES SZABÁLY . ",
  "EZ A HARMADIK SZABÁLY . ",
  "EZ A HARMADIK SZABÁLY . ",
  "EZ A NEGYEDIK SZABÁLY . ",
  "EZ A NEGYEDIK SZABÁLY . ",
  "EZ AZ ÖTÖS SZÁMÚ SZABÁLY, EZ IS HOSSZABB . ",
  "EZ AZ ÖTÖS SZÁMÚ SZABÁLY, EZ IS HOSSZABB . ",
  "EZ A HATOS SZÁMÚ SZABÁLY, EZ IS HOSSZABB . ",
  "EZ A HATOS SZÁMÚ SZABÁLY, EZ IS HOSSZABB . ",
  "A SZABÁLY HÉT EZ AZ . ",
  "A SZABÁLY HÉT EZ AZ . ",
  "A SZABÁLY NYOLC EZ AZ . ",
  "A SZABÁLY NYOLC EZ AZ . ",
  "A KILENCES SZÁMÚ SZABÁLY EZ AZ, EZ HOSSZABB . ",
  "A KILENCES SZÁMÚ SZABÁLY EZ AZ, EZ HOSSZABB . ",
  "A TÍZES SZÁMÚ SZABÁLY EZ AZ, EZ HOSSZABB . ",
  "A TÍZES SZÁMÚ SZABÁLY EZ AZ, EZ HOSSZABB . ",
];

let RULES
const FILENAME = window.location.pathname.split("/").pop();
if(FILENAME === "index.html"){
	RULES = ENG_RULES;
}
if(FILENAME === "hun.html"){
	RULES = HUN_RULES;
}


const ENG_QUOTES = [
	`"This is quote number one."`,
	`"This is quote number two."`,
	`"This is quote number three, this one is a bit longer."`,
	`"This is quote number four, this one is a lot longer. Lorem ipsum fingsum bingsum ass ass."`,
];
const HUN_QUOTES = [
	`"Ez az első idézet."`,
	`"Ez a második idézet."`,
	`"Ez a harmadik idézet, ez egy kicsit hosszabb."`,
	`"Ez a negyedik idézet, ez sokkal hosszabb. Lorem ipsum fingsum bingsum segg segg."`,
];

let QUOTES
if(FILENAME === "index.html"){
	QUOTES = ENG_QUOTES;
}
if(FILENAME === "hun.html"){
	QUOTES = HUN_QUOTES;
}









// --- KÓD A SZÖVEG KERETHEZ ---
// a szöveg keret egy SVG (Scalable Vector Graphics),
// ami egy olyan HTML elem, amibe rajzolhatunk vektorokkal
const borderContainer = document.getElementById('border-container');
const svg = document.getElementById('svg-box');
const svgPath = document.getElementById('rectPath');
const svgTextPath = document.querySelector('textPath');
const svgText = document.getElementById('svg-text');

// a szabályokat random összekeverem, és úgy állítom be
for (let i = RULES.length - 1; i > 0; i--) {
	const j = Math.floor(Math.random() * (i + 1));
	[RULES[i], RULES[j]] = [RULES[j], RULES[i]];
}
svgTextPath.innerHTML=RULES.join("");

// az updateSVG() metódus frissíti az SVG-t
function updateSVG() {
	// beállítom az SVG viewBox-át pont akkora méretűre, mint amekkora a tárolója
	// az SVG viewBox-a a kordinátarendszerét jelenti, és nem a méretét
	// tehát a viewBox lehet 10x10-es, a mérete meg lehet 50px X 50px
	// vagy a viewbox lehet 93x93-as, a mérete meg lehet 50px X 50px 
	// ez azért kell, hogy megfelelően tudjak majd számolni a kordinátarendszerben amikor átméreteződik
	const { width, height } = borderContainer.getBoundingClientRect();
	svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
	/*
			PÉLDÁUL:  viewBox="0 0 7 7"

		    0  1  2  3  4  5  6  7
		    X--------------------->
		0 Y
		1 |
		2 |
		3 |
		4 |
		5 |
		6 |
		7 |
		  V
	*/


	// a padding-ot, a font méretet, és a betűközt mind beállítom mérettől függően
	// tehát ha kisebb lesz az SVG, akkor kisebb lesz a szöveg keret is
	const padding = 0.053 * width;
	svgText.setAttribute('font-size', width/19.5);
	svgText.setAttribute('letter-spacing', -width/146);
	/*
		+-------------------------------------------------------------+  <- viewBox
		|             |                                               |
		|             | <- padding                                    |
		|             |                                               |
		|         SZÖVEGSZÖVEGSZÖVEGSZÖVEGSZÖVEGSZÖVEGSZÖVEGS         |
		|         Z                                         Z         |
		|         Ö                                         Ö         |
		|         V                                         V         |
		|         E                                         E         |
		|         G                                         G         |
		|         S                                         S         |
		|         Z                                         Z         |
		|         Ö                                         Ö         |
		|         V                                         V         |
		|         E                                         E         |
		|         G                                         G         |
		|         SZÖVEGSZÖVEGSZÖVEGSZÖVEGSZÖVEGSZÖVEGSZÖVEGS         |
		|                                                             |
		|                                                             |
		|                                                             |
		+-------------------------------------------------------------+
	*/


	// a szöveg útját kiszámolom dinamikusan
	const d = `
	M${padding},${padding}
	H${width - padding}
	V${height - padding}
	H${padding}
	Z
	`;
	svgPath.setAttribute('d', d);
	/*
		mintha egy vonalat rajzolnék,

		1. kezdés bal felül (x,y)
		M${padding},${padding}

		2. vízszintes vonal (x-ig)
		H${width - padding}
		
		3. függőleges vonal (y-ig)
		V${height - padding}

		4. vízszintes vonal (x-ig)
		H${padding}

		5. vissza a kezdőpontra
		Z

		Ez egy 10x10-es kordinátarendszerben 2-es padding-el így nézne ki. (10-8 = 2)

		    0    1    2    3    4    5    6    7    8    9    10
		    X--------------------------------------------------->
		0 Y
		  |
		1 |
		  |   kezdés bal felül (x=2, y=2)               vízszintes vonal (x=8 -ig)
		2 |          1.5.   -------------------->   2.
		  |              vissza a kezdőpontra
		3 |                                         |
		  |           A                             |
		4 |           |                             |
		  |           |                             |
		5 |           |                             |
		  |           |                             |
		6 |           |                             |
		  |           |                             |
		7 |                                         V
		  |   vízszintes vonal (x=2 -ig)                függőleges vonal (y=8 -ig)
		8 |           4.   <--------------------    3.
		  |
		9 |
		  |
		10|
		  V
	*/
}

// meghívom egyszer, hogy inicializáljam a szöveg keretet
updateSVG();
// és meghívom mindig, amikor az SVG tárolója átméreteződik
// tehát mindig amikor átméreteződik:
//    1. beállítom a viewbox (kordinátarendszer) számozását
//    2. beállítom a padding-ot és a szöveg méretét
//    3. kiszámolom a szöveg útját
new ResizeObserver(updateSVG).observe(borderContainer);








// --- KÓD A RANDOM IDÉZETHEZ ---
// kiválasztok egy random elemet a QUOTES tömbből és belerakom a HTML tárolóba
const p = document.createElement("p");
p.textContent = QUOTES[Math.floor(Math.random() * QUOTES.length)];
document.getElementById("quote-container").appendChild(p);








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






