var tempData = [
    { time: "17:10", count: 19.5 },
    { time: "17:11", count: 19.6 },
    { time: "17:12", count: 19.9 },
    { time: "17:13", count: 20.1 },
    { time: "17:14", count: 20.0 },
    { time: "17:15", count: 19.9 },
    { time: "17:16", count: 20.5 },
];

var volData = [
    { time: "17:10", count: 19.5 },
    { time: "17:11", count: 19.6 },
    { time: "17:12", count: 19.9 },
    { time: "17:13", count: 20.1 },
    { time: "17:14", count: 20.0 },
    { time: "17:15", count: 19.9 },
    { time: "17:16", count: 20.5 },
];

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
    maintainAspectRatio : false
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
    maintainAspectRatio : false
};

// Temperature Chart
new Chart(
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
new Chart(
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