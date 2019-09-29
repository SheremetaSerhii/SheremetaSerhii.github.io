const DD = 2, MM = 1, YY = 0;

var chartData = {
    title: {
        text: 'NBU Currency'
    },
    xAxis: {
        type: 'datetime'
    },
    yAxis: {
        title: {
            text: 'Exchange rate'
        }
    },
    legend: {
        enabled: false
    },
    plotOptions: {
        series: {
            label: {
                connectorAllowed: false
            },
        }
    },
    series: [{
        name: '',
        data:[]
    }],
    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            }
        }]
    }
}

Highcharts.chart('chartContainer', chartData);

function waitForResults() {
    this.daysCounter = 0;
    this.totalDaysQuantity = 0;
    this.timer = null;
    this.funcToRun = null;
    var curObj = this;

    var timerFunc = function () {
        if (curObj.daysCounter >= curObj.totalDaysQuantity) {
            clearInterval(curObj.timer);
            curObj.timer = null;
            if (curObj.funcToRun != null) {
                curObj.funcToRun();
            }
        }
    }

    this.incCounter = function () {
        curObj.daysCounter++;
    }

    this.startTimerForDaysQuantity = function (daysQuantity, func = null) {
        curObj.daysCounter = 0;
        curObj.totalDaysQuantity = daysQuantity;
        curObj.funcToRun = func;
        if (curObj.timer != null) {
            clearInterval(curObj.timer);
        } 
        curObj.timer = setInterval(timerFunc, 100);
    }
}

var waitForResultsTimer = new waitForResults();

function transformDate(curDate) {
    return Number(curDate.split("-").join(""));
}

function getCurrencyForTheDay(index, currency, day) {
    var result = new XMLHttpRequest();
    result.index = index;
    result.day = day;
    result.addEventListener("readystatechange", function (e) {
        if ((e.target.readyState === 4) && (e.target.status === 200)) {
            var data = JSON.parse(e.target.responseText);
            e.target.currencyVal = (data.length > 0) ? data[0].rate.toFixed(2) : 0;
            waitForResultsTimer.incCounter();
        }
    }, false);
    var currentDate = transformDate(day);
    var URI = `https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=${currency}&date=${currentDate}&json`;
    result.open("GET", URI);
    result.send();
    return result;
}

function getDateArr(dateStr) {
    var dateArr = dateStr.split("-");
    dateArr = dateArr.map(function (item) {
        return Number(item)
    });
    return dateArr;
}

function getNextDate(curDate) {
    const DAYS_IN_MONTH = [
        [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    ];
    var dateArr = getDateArr(curDate);
    var leapYear = Number((dateArr[YY] & 3) == 0);
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
    var XHR = [];
    var sdate = startDate.value;
    var edate = endDate.value;
    var crc = currency.value;
    if (!((sdate == "") || (edate == "") || (crc == ""))) {
        var finalDate = transformDate(edate);
        for (var i = 0, cdate = sdate; transformDate(cdate) <= finalDate; i++ , cdate = getNextDate(cdate)) {
            XHR[i] = getCurrencyForTheDay(i, crc, cdate);
        }
        var timerEndFunc = function () {
            chartData.series[0].name = crc;
            chartData.series[0].data = [];
            XHR.map(function (item) {
                var dateArr = getDateArr(item.day);
                var dateUTC = Date.UTC(dateArr[YY], dateArr[MM], dateArr[DD]);
                chartData.series[0].data.push([dateUTC, Number(item.currencyVal)]);
            });
            Highcharts.chart('chartContainer', chartData);
        }
        waitForResultsTimer.startTimerForDaysQuantity(i, timerEndFunc);
    }
}

startDate.addEventListener("change", changeEvent, false);
endDate.addEventListener("change", changeEvent, false);
currency.addEventListener("change", changeEvent, false);