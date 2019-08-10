const main = document.getElementById('main');
const button = document.getElementById('button');

let j = 0;
let arrayOfColors = ['blue', 'red', 'green'];

const figureState = {
	square: 4,
	circle: 100,
	isSquare: true,
	getState: function() {
		this.isSquare = !this.isSquare;

		if(this.isSquare) {
			return(this.square)
		} else {
			return(this.circle);
		}
	}
};

//change shape
button.addEventListener('click', () => {
	createFigure(figureState.getState());
});


function createFigure(numberOfSides = 4) {
	main.innerHTML = '';

//prepare data
	let r = 300; // figure radius 
	let maxAngle = 2*Math.PI;
	let step = 0.15; // point step
	let scale = 1; //scale of figure
	let shiftX = 300; //shift by X
	let shiftY = 300; //shift by Y

	let PIonN = Math.PI / numberOfSides;

// for describing figure shape, using the expression in the polar system of coordinate
	for(let i = 0; i < maxAngle; i=i+step){
		let circle = document.createElement('div');

// colors counter
		j === 2 ? j = 0 : j++;

		circle.className = 'blinkElement';
		circle.style.position = "absolute";
		circle.style.backgroundColor = arrayOfColors[j];
		
//expresition
		let angle = 2*PIonN*(((Math.floor(i/PIonN))/2) - Math.floor((Math.floor(i/PIonN))/2)) - (i - PIonN*Math.floor(i/PIonN) );
		let R = r/Math.cos(angle);

//the setpoint of the coordinate
		circle.style.left = `${ R*Math.cos(i)*scale+shiftX }px`
		circle.style.top = `${ R*Math.sin(i)*scale+shiftY }px`;

		main.appendChild(circle);
	}
}

//Start application
(function() {
	createFigure();

	setInterval(function() {
		let elements = document.getElementsByClassName('blinkElement');

	//change color animation
		for(let i = 0; i < elements.length; i++){
		if(elements[i].style.backgroundColor === 'blue'){
			 elements[i].style.backgroundColor = 'green';
		} else if (elements[i].style.backgroundColor === 'red'){
			elements[i].style.backgroundColor = 'blue';
		} else if (elements[i].style.backgroundColor === 'green') {
			 elements[i].style.backgroundColor = 'red';
		}
	}
	}, 500);
})();