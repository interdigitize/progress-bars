# Sequential Progress Bars

### Requirements:

* Create a button that adds multiple progress bars that advance from 0-100% over the course of 3 seconds
* Allow any number of progress bars, but only allow 1 progress bar to run at a time
* Verify that after adding a bunch of progress bars and having them all filled, new ones added will still fill accordingly
* Solve using: HTML, CSS, jQuery, JavaScript

### First Solution:
This solution uses CSS to create progress bars, jQuery to update values and set event listeners, and JavaScript to define functions and logic. A queue is used to keep track of bars as they are added to the page and a promise is implemented to start the next bar after the current bar finishes. Technically, since we know the progress should take 3 seconds, setInterval or setTimeout could have been used, but in real world scenarios, when a progress bar is needed, the load-time duration is unknown, so I opted for a Promise. 
[Check it out on JSFiddle](https://jsfiddle.net/yvpnur6u/2/)


### Second Solution:
This refactored solution uses the HTML progress element instead of pure CSS to create progress bars.
[Check it out on JSFiddle](https://jsfiddle.net/yvpnur6u/4/)
