const red = document.querySelector('.pRed');
const yellow = document.querySelector('.pYellow');
const green = document.querySelector('.pGreen');

const getRandomPanel = () => {
	const panels = [red, yellow, green];
	return panels[parseInt(Math.random() * panels.length)]
}

const sequence = [getRandomPanel(),getRandomPanel(),getRandomPanel(),getRandomPanel(),];

const flash = panel => {
	return new Promise((resolve, reject) => {
		panel.className += ' active';
		setTimeout(() =>{
			panel.className = panel.className.replace(
			' active', 
			'');
			setTimeout(() => {
				resolve();
			}, 250);
		}, 750);
	});
};

const main = async() => {
	for (const panel of sequence) {
		await flash(panel);
	}
};

main();
