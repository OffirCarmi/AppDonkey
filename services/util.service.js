export const utilService = {
    makeId,
    makeLorem,
    getRandomInt,
    getRandomColor,
    debounce,
    padNum,
    getDayName,
    getMonthName,
    getMonthShort,
    getCurrencyIcon,
}

function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}


function getCurrencyIcon(code) {
    let currencyIcon;
    switch (code) {
        case 'EUR':
            currencyIcon = '€';
            break;
        case 'ILS':
            currencyIcon = '₪';
            break;
        case 'USD':
            currencyIcon = '$';
            break;
        default:
            currencyIcon = '¤';
            break;
    }
    return currencyIcon
}

function makeLorem(size = 100) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
    var txt = ''
    while (size > 0) {
        size--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}


function padNum(num) {
    return (num > 9) ? num + '' : '0' + num
}

function getRandomColor() {
    const letters = '0123456789ABCDEF'
    var color = '#'
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}

function debounce(cb, wait) {
    let timeOut
    return function executeFunc(...args) {
        const after = () => {
            clearTimeout(timeOut)
            cb(...args)
        }
        clearTimeout(timeOut)
        timeOut = setTimeout(after, wait)
    }
}

// getDayName('12/25/2021', 'he') ->  'יום שבת'
function getDayName(date, locale) {
    date = new Date(date)
    return date.toLocaleDateString(locale, { weekday: 'long' })
}


function getMonthName(date) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ]
    return monthNames[date.getMonth()]
}

function getMonthShort(date) {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June",
        "July", "Aug", "Sept", "Oct", "Nov", "Dec"
    ]
    return monthNames[date.getMonth()]
}