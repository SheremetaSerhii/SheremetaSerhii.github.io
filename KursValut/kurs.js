//var todayDate = new Date();
var XHR = [];

function waitForResults() {
    this.daysCounter = 0;
    this.totalDaysQuantity = 0;
    this.timer = null;
    this.funcToRun = null;
    var curObj = this;

    var timerFunc = function () {
        if (curObj.daysCounter >= curObj.totalDaysQuantity) {
            clearInterval(curObj.timer);
            if (curObj.funcToRun != null) {
                curObj.funcToRun();
            }
        }
    }

    this.incDaysQuantity = function () {
        curObj.daysCounter++;
    }

    this.startTimerForDaysQuantity = function (daysQuantity, func = null) {
        curObj.daysCounter = 0;
        curObj.totalDaysQuantity = daysQuantity;
        curObj.funcToRun = func;
        curObj.timer = setInterval(timerFunc, 100);
    }
}

var waitForResultsTimer = new waitForResults();

function transformDate(curDate) {
    return Number(curDate.split("-").join(""));
}

function getCurrencyForTheDay(index, currency, day) {
    result = new XMLHttpRequest();
    result.index = index;
    result.day = day;
    result.currency = currency;
    result.addEventListener("readystatechange", function (e) {
        if ((e.target.readyState === 4) && (e.target.status === 200)) {
            var data = JSON.parse(e.target.responseText);
            e.target.currencyVal = (data.length > 0) ? data[0].rate.toFixed(2) : 0;
            waitForResultsTimer.incDaysQuantity();
        }
    }, false);
    var currentDate = transformDate(day);
    var URI = `https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=${currency}&date=${currentDate}&json`;
    result.open("GET", URI);
    result.send();
    return result;
}

function getNextDate(curDate) {
    const DD = 2, MM = 1, YY = 0;
    const DAYS_IN_MONTH = [
        [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    ];
    var dateArr = curDate.split("-");
    dateArr = dateArr.map(function (item) {
        return Number(item)
    });
    leapYear = Number((dateArr[YY] & 3) == 0);
    //console.log(leapYear);
    dateArr[DD]++;
    if (dateArr[DD] > DAYS_IN_MONTH[leapYear][dateArr[MM] - 1]) {
        dateArr[DD] = 1;
        dateArr[MM]++;
        if (dateArr[MM] > 12) {
            dateArr[MM] = 1;
            dateArr[YY]++;
        }
    }
    dateArr = dateArr.map(function (item) {
        var result = (item < 10) ? "0" + String(item) : String(item);
        return result;
    })
    return dateArr.join("-");
}

var startDate = document.getElementById("startDate");
var endDate = document.getElementById("endDate");
var currency = document.getElementById("currency");

function changeEvent(e) {
    XHR = [];
    var sdate = startDate.value;
    var edate = endDate.value;
    var crc = currency.value;
    if (!((sdate == "") || (edate == "") || (crc == ""))) {
        //console.log(sdate, edate, crc);
        var finalDate = transformDate(edate);
        for (var i = 0, cdate = sdate; transformDate(cdate) <= finalDate; i++ , cdate = getNextDate(cdate)) {
            XHR[i] = getCurrencyForTheDay(i, crc, cdate);
            console.log(i, cdate);
        }
        console.log(i);
        var timerFunc = function () {
            XHR.map(function (item) {
                console.log(/*"final data = ",*/ item.index, item.day, item.currencyVal);
            });
        }
        waitForResultsTimer.startTimerForDaysQuantity(i, timerFunc);
    }
}

startDate.addEventListener("change", changeEvent, false);
endDate.addEventListener("change", changeEvent, false);
currency.addEventListener("change", changeEvent, false);