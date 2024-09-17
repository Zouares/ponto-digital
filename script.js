const diaSemana = document.getElementById("diasem");
const dataAtual = document.getElementById("dia");
const horaAtual = document.getElementById("hora");
const greetingElement = document.getElementById("greeting");
const botaoregistrar = document.getElementById("register-button");
const dialogPonto = document.getElementById("dialog-ponto");
const btnDialogFechar = document.getElementById("dialog-fechar");
const dialogData = document.getElementById("dialog-Data");
const dialogHora = document.getElementById("dialog-Hora");
const checkbox = document.getElementById("checkbox");
const history = document.querySelector(".history");
const historyList = document.getElementById("history-list");
const registerTypeSelect = document.getElementById("register-type");
const registerButtonSelect = document.getElementById("register-button-select");
const clearHistoryButton = document.getElementById("clear-history");

let historyData = loadHistoryFromLocalStorage();
let hasEnteredToday = false;
let notificationCount = 0;
const maxNotifications = 5;
let notificationTimeouts = [];

function PositionObt(geolocalizao){
    console.log(geolocalizao)
}

function Positionfailed(geolocalizao){
    console.error(erro)
}

function saveHistoryToLocalStorage() {
    localStorage.setItem("historyData", JSON.stringify(historyData));
}

function loadHistoryFromLocalStorage() {
    const storedHistory = localStorage.getItem("historyData");
    return storedHistory ? JSON.parse(storedHistory) : {};
}

function register() {
    dialogData.textContent = `Data: ${getCurrentDate()}`;
    dialogHora.textContent = `Hora: ${getCurrentTime()}`;
    dialogPonto.showModal();
}

function updateContentHour() {
    horaAtual.textContent = getCurrentTime();
    dataAtual.textContent = getCurrentDate();
    diaSemana.textContent = getWeekDay();
    greetingElement.textContent = getGreeting("Fulano de Tal");
}

function getGreeting(name) {
    const hours = new Date().getHours();
    if (hours < 12) {
        return `Bom dia, ${name}`;
    } else if (hours < 18) {
        return `Boa tarde, ${name}`;
    } else {
        return `Boa noite, ${name}`;
    }
}

function getCurrentTime() {
    const date = new Date();
    const horas = String(date.getHours()).padStart(2, '0');
    const minutos = String(date.getMinutes()).padStart(2, '0');
    const segundos = String(date.getSeconds()).padStart(2, '0');
    return `${horas}:${minutos}:${segundos}`;
}

function getCurrentTimehistory() {
    const date = new Date();
    const horas = String(date.getHours()).padStart(2, '0');
    const minutos = String(date.getMinutes()).padStart(2, '0');
    return `${horas}:${minutos}`;
}

function getCurrentDate() {
    const date = new Date();
    const dia = String(date.getDate()).padStart(2, '0');
    const mes = String(date.getMonth() + 1).padStart(2, '0');
    const ano = date.getFullYear();
    return `${dia}/${mes}/${ano}`;
}

function getWeekDay() {
    const daysOfWeek = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
    return daysOfWeek[new Date().getDay()];
}

function closeDialog() {
    dialogPonto.close();
}

function toggleHistory() {
    history.classList.toggle("show");
}

function addHistoryEntry(date, type, time) {
    if (!historyData[date]) {
        historyData[date] = [];
        
        const historyHeader = document.createElement("div");
        historyHeader.className = "history-header";
        historyHeader.textContent = `${getDayLabel(date)} ${date}`;
        historyList.appendChild(historyHeader);
    }
    
    historyData[date].push({ type, time });
    saveHistoryToLocalStorage();  
    updateHistoryList();
}

function getDayLabel(date) {
    const today = getCurrentDate();
    if (date === today) {
        return "HOJE";
    }
    const yesterday = getYesterdayDate();
    if (date === yesterday) {
        return "ONTEM";
    }
    return date;
}

function getYesterdayDate() {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    return getCurrentDate();
}

function updateHistoryList() {
    historyList.innerHTML = "";
    Object.keys(historyData).forEach(date => {
        const entries = historyData[date];
        
        const historyHeader = document.createElement("div");
        historyHeader.className = "history-header";
        historyHeader.textContent = `${getDayLabel(date)} ${date}`;
        historyList.appendChild(historyHeader);
        
        entries.forEach(entry => {
            addHistoryEntryToList(entry.type, entry.time);
        });
    });
}

function addHistoryEntryToList(type, time) {
    const historyItem = document.createElement("div");
    historyItem.className = "history-item";
    
    const statusDot = document.createElement("div");
    statusDot.className = "status-dot";
    
    if (type === "ENTRADA") {
        statusDot.style.backgroundColor = "#28a745";
    } else if (type === "SAÍDA") {
        statusDot.style.backgroundColor = "#dc3545";
    } else if (type === "INTERVALO" || type === "SAÍDA INTERVALO") {
        statusDot.style.backgroundColor = "#ffc107";
    }
    
    historyItem.appendChild(statusDot);
    
    const timeElement = document.createElement("div");
    timeElement.className = "time";
    timeElement.textContent = time;
    historyItem.appendChild(timeElement);
    
    const entryElement = document.createElement("div");
    entryElement.className = "entry";
    entryElement.textContent = type;
    historyItem.appendChild(entryElement);
    
    historyList.appendChild(historyItem);
}

function handleRegister() {
    const type = registerTypeSelect.value;
    const currentDate = getCurrentDate();
    const currentTime = getCurrentTimehistory();
    
    if (type === "SAÍDA" && !hasEnteredToday) {
        alert("Entre primeiro.");
        return;
    }

    if (type === "ENTRADA" && !hasEnteredToday) {
        hasEnteredToday = true;
    } else if (type === "SAÍDA") {
        hasEnteredToday = true;
    } else if (type === "INTERVALO" && hasEnteredToday) {
        
    } else if (type === "SAÍDA INTERVALO" && hasEnteredToday) {
        
    }

    addHistoryEntry(currentDate, type, currentTime);
    closeDialog();
    showNotification(`${type} confirmada com sucesso`);
}

function showNotification(message) {
    const notificationContainer = document.getElementById('notification-container');
    
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.textContent = message;

    notificationContainer.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    const timeoutId = setTimeout(() => {
        notification.classList.add('hide');
    }, 3000);

    const removeTimeoutId = setTimeout(() => {
        notification.remove();
        notificationCount--;
        notificationTimeouts.shift();
    }, 4000);

    notificationCount++;
    if (notificationCount > maxNotifications) {
        const firstNotification = notificationContainer.querySelector('.notification');
        if (firstNotification) {
            clearTimeout(notificationTimeouts[0]);
            firstNotification.remove();
            notificationCount--;
        }
    }

    notificationTimeouts.push(timeoutId);
    notificationTimeouts.push(removeTimeoutId);
}

window.addEventListener('load', () => {
    checkbox.checked = false;
});

botaoregistrar.addEventListener("click", register);
btnDialogFechar.addEventListener("click", closeDialog);
checkbox.addEventListener("change", toggleHistory);
registerButtonSelect.addEventListener("click", handleRegister);

setInterval(updateContentHour, 1000);
updateContentHour();
updateHistoryList();

function clearHistory() {
    historyData = {};
    saveHistoryToLocalStorage();
    updateHistoryList();
}

clearHistoryButton.addEventListener("click", () => {
    if (confirm("Você realmente deseja limpar o histórico?")) {
        clearHistory();
    }
});
