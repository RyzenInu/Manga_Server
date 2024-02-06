var tempData = [
    // { time: "17:10", count: 19.5 },
    // { time: "17:11", count: 19.6 },
    // { time: "17:12", count: 19.9 },
    // { time: "17:13", count: 20.1 },
    // { time: "17:14", count: 20.0 },
    // { time: "17:15", count: 19.9 },
    // { time: "17:16", count: 20.5 },
];

var volData = [
    // { time: "17:10", count: 19.5 },
    // { time: "17:11", count: 19.6 },
    // { time: "17:12", count: 19.9 },
    // { time: "17:13", count: 20.1 },
    // { time: "17:14", count: 20.0 },
    // { time: "17:15", count: 19.9 },
    // { time: "17:16", count: 20.5 },
];

loadDropdownmenu();

function loadDropdownmenu() {
    let dropdown = document.getElementById("deviceDropdown");
    let deviceList = dropdown.getElementsByClassName("dropdownOptionList")[0];
    fetch(url + "equipment/all/").then(response => response.json()).then(json => {
        json.forEach(device => {
            let dropdownOption = document.createElement("div");
            dropdownOption.classList.add("dropdownOption");
            dropdownOption.id = device.id;
            dropdownOption.innerText = device.name;
            dropdownOption.addEventListener("click", (event) => { selectDropdownOption(event.target) });
            deviceList.appendChild(dropdownOption);
        });
    })
}

function selectDropdownOption(option) {
    let dropdownMenuSelected = document.getElementsByClassName("dropdownMenuSelectedOption")[0]
    dropdownMenuSelected.innerText = option.innerText;
    loadValues(option.id)
}

async function loadValues(id) {
    await fetch(url + "equipment/" + id + "/sensors/" + 10)
        .then(response => response.json())
        .then(async json => {
            tempChart.data.labels = [];
            tempChart.data.datasets[0].data = [];
            volChart.data.labels = [];
            volChart.data.datasets[0].data = [];

            if (json.error) {
                return;
            }

            let values = {
                temp: [],
                vol: []
            }

            await json.temp.forEach(reading => {
                values.temp.push(parseFloat(reading.valor))
                var dt = new Date(reading.time_logged)
                addData(tempChart, formatDate(dt), reading.valor);
            });
            await json.volume.forEach(reading => {
                values.vol.push(parseFloat(reading.valor))
                var dt = new Date(reading.time_logged)
                addData(volChart, formatDate(dt), reading.valor);
            });

            console.log(values);
            console.log(Math.max(...values.temp));
            let tempStats = document.getElementsByClassName("deviceStatsTemp");
            let volStats = document.getElementsByClassName("deviceStatsVol");

            tempStats[0].innerText = ss.mean(values.temp).toPrecision(4);
            tempStats[1].innerText = Math.max(...values.temp);
            tempStats[2].innerText = Math.min(...values.temp);
            tempStats[3].innerText = ss.quantile(values.temp, 0.75);
            tempStats[4].innerText = ss.quantile(values.temp, 0.25);

            volStats[0].innerText = ss.mean(values.vol).toPrecision(3);
            volStats[1].innerText = Math.max(...values.vol);
            volStats[2].innerText = Math.min(...values.vol);
            volStats[3].innerText = ss.quantile(values.vol, 0.75);
            volStats[4].innerText = ss.quantile(values.vol, 0.25);
        })
}

function formatDate(date) {
    let d = new Date(date);
    let hours;
    let minutes;
    let seconds;

    if (d.getHours() < 10) {
        hours = "0" + d.getHours();
    } else {
        hours = d.getHours();
    }

    if (d.getMinutes() < 10) {
        minutes = "0" + d.getMinutes();
    } else {
        minutes = d.getMinutes();
    }

    if (d.getSeconds() < 10) {
        seconds = "0" + d.getSeconds();
    } else {
        seconds = d.getSeconds();
    }

    return `${hours}:${minutes}:${seconds}`;
}

function addData(chart, label, newData) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(newData);
    });
    chart.update();
}

const cssColors = {
    manga: {
        redish: getComputedStyle(document.documentElement).getPropertyValue('--color-manga-redish'),
        orangy: getComputedStyle(document.documentElement).getPropertyValue('--color-manga-orangy'),
    },
    primary: getComputedStyle(document.documentElement).getPropertyValue('--color-primary'),
    primary30: getComputedStyle(document.documentElement).getPropertyValue('--color-primary-30')
}

Chart.defaults.font.family = "Poppins";

const tempChartOptions = {
    scales: {
        title: "test",
        x: {
            grid: {
                color: cssColors.primary30,
            },
            title: {
                display: true,
                text: 'Time',
                color: cssColors.manga.redish,
                font: {
                    size: "14pt",
                    weight: "bold"
                }
            },
            ticks: {
                color: cssColors.primary
            }
        },
        y: {
            grid: {
                color: cssColors.primary30,
            },
            title: {
                display: true,
                text: "Temperature (Cº)",
                color: cssColors.manga.redish,
                font: {
                    size: "14pt",
                    weight: "bold"
                }
            },
            ticks: {
                color: cssColors.primary,
            }
        },
    },
    animation: {
        duration: 750, // Set duration to 0 to disable animations
    },
    plugins: {
        legend: {
            display: false,
            position: 'bottom',
            labels: {
                color: cssColors.primary,
            }
        }
    },
    tension: 0.2,
    elements: {
        point: {
            radius: 4,
            hoverRadius: 6,
            borderWidth: 2,
            hoverBorderWidth: 2,
            hitRadius: 3,
            backgroundColor: cssColors.primary,
        }
    },
    responsive: true,
    maintainAspectRatio: false
};

const volChartOptions = {
    scales: {
        title: "test",
        x: {
            grid: {
                color: cssColors.primary30,
            },
            title: {
                display: true,
                text: 'Time',
                color: cssColors.manga.redish,
                font: {
                    size: "14pt",
                    weight: "bold"
                }
            },
            ticks: {
                color: cssColors.primary
            }
        },
        y: {
            grid: {
                color: cssColors.primary30,
            },
            title: {
                display: true,
                text: "Volume (L)",
                color: cssColors.manga.redish,
                font: {
                    size: "14pt",
                    weight: "bold"
                }
            },
            ticks: {
                color: cssColors.primary,
            }
        },
    },
    animation: {
        duration: 750, // Set duration to 0 to disable animations
    },
    plugins: {
        legend: {
            display: false,
            position: 'bottom',
            labels: {
                color: cssColors.primary,
            }
        }
    },
    tension: 0.2,
    elements: {
        point: {
            radius: 4,
            hoverRadius: 6,
            borderWidth: 2,
            hoverBorderWidth: 2,
            hitRadius: 3,
            backgroundColor: cssColors.primary,
        }
    },
    responsive: true,
    maintainAspectRatio: false
};

// Temperature Chart
var tempChart = new Chart(
    document.getElementById('statsTempChart'),
    {
        type: 'line',
        data: {
            labels: tempData.map(row => row.time),
            datasets: [
                {
                    borderColor: cssColors.manga.redish,
                    label: 'Temperature',
                    data: tempData.map(row => row.count)
                }
            ]
        },
        options: tempChartOptions
    }
);

// Volume Chart
var volChart = new Chart(
    document.getElementById('statsVolChart'),
    {
        type: 'line',
        data: {
            labels: volData.map(row => row.time),
            datasets: [
                {
                    borderColor: cssColors.manga.redish,
                    label: 'Volume',
                    data: volData.map(row => row.count)
                }
            ]
        },
        options: volChartOptions
    }
);