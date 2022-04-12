const red = document.getElementById('.panelR');
const yellow = document.getElementById('.panelY');
const green = document.getElementById('.panelG');

const sequence = [red, yellow, green];

const flash = panel => {
	return new Promise((resolve, reject) => {
		panel.className += ' active';
		setTimeout(() =>{
			panel.className = panel.className.replace(
			' active', 
			'');
			resolve();
		}, 1000);
	});
};

const main = async() => {
	for (const panel of sequence) {
		await flash(panel);
	}
};

main();