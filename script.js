let value = 25; // minutes
let timerInterval;
let endTime;
let pauseTime;
let remaining;
let totalLength;

$(document).ready(function () {
  $('#display').html(value + ':00');
});

// update display
function display() {
  $('#display').html(value + ':00');
}

// plus button
$('#plus').on('click', function () {
  value++;
  display();
});

// minus button
$('#minus').on('click', function () {
  if (value > 1) {
    value--;
    display();
  }
});

// countdown updater
function updateCount() {
  timerInterval = setInterval(function () {
    let now = $.now();
    remaining = endTime - now;

    if (remaining <= 0) {
      clearInterval(timerInterval);
      $('#display').html("Time Up");
      $('#timer').css({
        'background-image': 'linear-gradient(-90deg, #ff4b4b 50%, transparent 50%)'
      });
      return;
    }

    let minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((remaining % (1000 * 60)) / 1000);

    if (seconds < 10) {
      $('#display').html(minutes + ":0" + seconds);
    } else {
      $('#display').html(minutes + ":" + seconds);
    }

    // animate circle
    let passed = totalLength - remaining;
    let angle = (360 * passed) / totalLength;
    let line;

    if (angle <= 180) {
      line = [
        'linear-gradient(' + (angle - 90) + 'deg, #dd0fd3ff 50%, transparent 50%)',
        'linear-gradient(-90deg, #c5e874 50%, transparent 50%)'
      ];
    } else {
      line = [
        'linear-gradient(' + (angle - 90) + 'deg, #53dd0fff 50%, transparent 50%)',
        'linear-gradient(-90deg, #06c018ff 50%, transparent 50%)'
      ];
    }

    $('#timer').css({
      'background-image': line.join(',')
    });

  }, 1000);
}

// start / resume
$('#start').on('click', function () {
  clearInterval(timerInterval);
  if (!pauseTime) {
    totalLength = value * 60 * 1000;
    endTime = $.now() + totalLength;
  } else {
    endTime = $.now() + remaining;
    pauseTime = null;
  }
  updateCount();
});

// pause
$('#pause').on('click', function () {
  clearInterval(timerInterval);
  pauseTime = $.now();
  remaining = endTime - pauseTime;
});

// reset
$('#reset').on('click', function () {
  clearInterval(timerInterval);
  $('#timer').css({
    'background-image': 'linear-gradient(-90deg, #e89774 50%, transparent 50%)'
  });
  value = 25;
  display();
  pauseTime = null;
});
