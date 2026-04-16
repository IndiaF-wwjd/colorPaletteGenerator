const generateButton = document.getElementById("generateButton");
const paletteContainer = document.querySelector(".paletteContainer");

generateButton.addEventListener("click", generatePalette);
paletteContainer.addEventListener("click", function(e) {
	if (e.target.classList.contains("copyButton")) {
		const hexValue = e.target.previousElementSibling.textContent;
		navigator.clipboard
		.writeText(hexValue)
		.then(() => showCopySuccess(e.target))
		.catch((err) => alert(err));
	} else if (e.target.classList.contains("color")) {
		const hexValue = e.target.nextElementSibling.querySelector(".hexValue").textContent;
		navigator.clipboard
		.writeText(hexValue)
		.then(() => showCopySuccess(e.target.nextElementSibling.querySelector(".copyButton")))
		.catch((err) => alert(err));
	}
});

function showCopySuccess(element) {
	element.classList.remove("far","fa-copy");
	element.classList.add("fas","fa-check");
	element.style.color = "#48BB78";
	setTimeout(() => {
		element.classList.remove("fas","fa-check");
		element.classList.add("far","fa-copy");
		element.style.color = "";
	}, 1500)
}

function generatePalette() {
	const colors = []
	
	for (let i = 0; i<5; i++) {
		colors.push(generateRandomColor());
	}
	
	updatePaletteDisplay(colors);
}

function generateRandomColor() {
	const letters = "0123456789ABCDEF";
	let color = "#";
	
	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}

function updatePaletteDisplay(colors) {
	const colorBoxes = document.querySelectorAll(".colorBox");
	
	colorBoxes.forEach((box,index) => {
		const color = colors [index];
		const colorDiv = box.querySelector(".color");
		const hexDiv = box.querySelector(".hexValue");
		
		colorDiv.style.backgroundColor = color;
		hexDiv.textContent = color;
	});
}
