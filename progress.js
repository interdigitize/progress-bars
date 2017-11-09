$('.progress-btn').on('click', makeAndAppend);
$('.clear-btn').on('click', clearProgressBars);
var barCount = 0;
var barQueue = [];

function makeAndAppend() {
	//create a unique id based on the progress bar count
	let bar = `bar${++barCount}`;
	$('#progress-bar-area').append(`<div id="${bar}" class="bar"></div>`)
  //start the css at 0%, since this will be constantly changing, I removed it from the css file
  $(`#${bar}`).css({'width': '0%'})
  //call a function to add the bar to a queue
  queue(bar);
}

function queue(bar) {
	//add the bar to the queue
	barQueue.push(bar);
  //if the queue has a bar in it, call a function to start incrementing the first bar
  if (barQueue.length === 1) {
    start(barQueue);
  }
}

function start(queue) {
	//get the first bar in the queue
	let bar = queue[0];
  //use a promise to know when the bar reaches 100%
	let trackProgress = new Promise ((resolve, reject) => {
  	//call increaseBar 10 times a second to take about 3 seconds to reach 100%
  	let increase = setInterval(() => increaseBar(bar, increase, resolve), 100)
    });
  trackProgress
  .then((success) => {
  	//remove the bar from the queue
    queue.shift();
    //check to see if there is anything else in the queue
    if (barQueue.length > 0) {
    	//if there is something else in the queue, start it
      start(barQueue);
    }
  })
  .catch(err => {
    console.log(err);
  });
}

function increaseBar(bar, increase, resolve) {
	//determine and store the width as a percentage
	let width = Math.ceil($(`#${bar}`).width() / $('#progress-bar-area').width() * 100);
  //when it reaches 100%
  if (width >= 100) {
		$(`#${bar}`).width('100%');
  	//stop calling the increase function
    clearInterval(increase);
    //resolve the promise
    resolve(`Progress ${bar} finished!`);
  } else {
  	//until it reaches 100%, continually add 3.5 percent on every iteration
  	width += 3.5;
    //update the width percentage
    $(`#${bar}`).width(`${width}%`);
  }
}

function clearProgressBars() {
	$('#progress-bar-area').empty();
}
