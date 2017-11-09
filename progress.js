$('.progress-btn').on('click', makeAndAppend);
$('.clear-btn').on('click', clearProgressBars);
var barCount = 0;
var barQueue = [];

function makeAndAppend() {
	//create a unique id based on the progress bar count
	let bar = `bar${++barCount}`;
	$('#progress-bar-area').append(`<progress id="${bar}" value="0" max="100" class="bar"></progress>`)
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
	//get the current progress bar value
	let progressVal = $(`#${bar}`).attr('value')
  //when it reaches 100%
  if (progressVal >= 100) {
		$(`#${bar}`).attr({'value': 100})
  	//stop calling the increase function
    clearInterval(increase);
    //resolve the promise
    resolve(`Progress ${bar} finished!`);
  } else {
  	//until it reaches 100%, continually add 3.3 percent on every iteration
  	progressVal = parseInt(progressVal) + 3.3;
    //update the progressVal percentage
		$(`#${bar}`).attr({'value': progressVal})
  }
}

function clearProgressBars() {
	$('#progress-bar-area').empty();
	barQueue = [];
}
