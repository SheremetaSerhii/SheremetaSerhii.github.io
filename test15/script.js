var timestamp = 1569857406626;

function showClock () {
    var d = new Date(timestamp);

    var hours = d.getHours();
    var minutes = d.getMinutes();
    var seconds = d.getSeconds();

    hours = (hours.toString().length != 2) ? `0${hours}` : hours;
    minutes = (minutes.toString().length != 2) ? `0${minutes}` : minutes;
    seconds = (seconds.toString().length != 2) ? `0${seconds}` : seconds;

    //console.log(`${hours}:${minutes}:${seconds}`);

    var clock = document.getElementById("clock");
    clock.innerHTML = `<h1>${hours}:${minutes}:${seconds}</h1>`;
    timestamp = d.getTime();
    timestamp = Number(timestamp - 1000);
};

setInterval(showClock, 1000);
