const red = document.querySelector('.pRed');
const yellow = document.querySelector('.pYellow');
const green = document.querySelector('.pGreen');

const urlFlash = "https://api.particle.io/v1/devices/e00fce68821377268633456f/flash"
const urlRead = "https://api.particle.io/v1/devices/e00fce68821377268633456f/userInput?access_token=b931540712b146533cdf56b59ec833f57508cee9"

const particleId = "e00fce68821377268633456f";
const particleToken = "b931540712b146533cdf56b59ec833f57508cee9";

const getRandomPanel = () => {
	const panels = [red, yellow, green];
	return panels[parseInt(Math.random() * panels.length)]
}

const sequence = [getRandomPanel()];
let sequenceToGuess = [...sequence];

const flash = panel => {
	return new Promise((resolve, reject) => {
		if (panel.className == 'panel pRed'){
			const data ={
				access_token:"b931540712b146533cdf56b59ec833f57508cee9",
				arg: "red"
			}
				$.post(urlFlash, data, function(data, status){
					console.log("red");
				})
		} else if (panel.className == 'panel pYellow'){
			const data ={
				access_token:"b931540712b146533cdf56b59ec833f57508cee9",
				arg:"yellow"
			}
			$.post(urlFlash, data, function(data, status){
				console.log("yellow");
			})
		} else if (panel.className == 'panel pGreen'){
			const data ={
				access_token:"b931540712b146533cdf56b59ec833f57508cee9",
				arg:"green"
			}
				$.post(urlFlash, data, function(data, status){
					console.log("green");
				})
		}
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

const panelClicked = panelClicked => {
	const expectedPanel = sequenceToGuess.shift();
	if (expectedPanel === panelClicked){
		if (sequenceToGuess.length === 0){
			// Start new round
			sequence.push(getRandomPanel());
			sequenceToGuess = [...sequence];
			startFlash();
		}
	}else{
		//end game
		alert(
		"GAME OVER! Press reset to start again"
		);
	}
}
/*
const inputRead = () => {
	const command = $.get(urlRead);
	if(command == 'red'){
		sequenceInput.push('red');
		console.log("input red");
	}else if(command == 'yellow'){
		sequenceInput.push('yellow');
		console.log("input yellow");
	}else if(command == 'green'){
		sequenceInput.push('green');
		console.log("input green");
	}
	console.log(command);
}

const inputCheck = () => {
	console.log("Checking input...");
	inputRead();
	const expectedPanel = sequenceInput.shift();
	if (expectedPanel === sequenceToGuess.shift){
		if (sequenceToGuess.length === 0){
			// Start new round
			sequence.push(getRandomPanel());
			sequenceToGuess = [];
			sequenceInput = [];
			startFlash();
		}
	}else{
		//end game
		alert(
		"GAME OVER! Press reset to start again"
		);
	}
}*/

const startFlash = async () => {
	canClick = false;
	for (const panel of sequence) {
		await flash(panel);
	}
	canClick = true;
	//inputCheck();
}

startFlash();
