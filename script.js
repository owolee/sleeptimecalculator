// 기상 시간을 입력하면 추천 취침 시간을 계산하는 함수
function calculateBedtime() {
    let wakeUpTime = document.getElementById("wake-up-time").value;
    if (!wakeUpTime) return;

    let recommendedTimes = getRecommendedTimes(wakeUpTime, -90);
    displayTimes(recommendedTimes, "bedtime-results");
}

// 취침 시간을 입력하면 추천 기상 시간을 계산하는 함수
function calculateWakeUpTime() {
    let bedtime = document.getElementById("bedtime").value;
    if (!bedtime) return;

    let recommendedTimes = getRecommendedTimes(bedtime, 90);
    displayTimes(recommendedTimes, "wake-up-results");
}

// 현재 시간을 취침 시간에 자동 입력하는 함수
function setCurrentTime() {
    let now = new Date();
    let hours = now.getHours().toString().padStart(2, "0");
    let minutes = now.getMinutes().toString().padStart(2, "0");
    document.getElementById("bedtime").value = `${hours}:${minutes}`;
}

// 주어진 시간에서 90분씩 이동하여 추천 시간을 반환하는 함수
function getRecommendedTimes(baseTime, interval) {
    let [hours, minutes] = baseTime.split(":").map(Number);
    let date = new Date();
    date.setHours(hours, minutes, 0);

    let times = [];
    for (let i = 0; i < 6; i++) {
        date.setMinutes(date.getMinutes() + interval);
        let formattedTime = formatTime(date);
        times.push(formattedTime);
    }

    return times.reverse(); // 순서 변경
}

// 시간 포맷을 오전/오후 형태로 변환하는 함수
function formatTime(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes().toString().padStart(2, "0");
    let period = hours < 12 ? "오전" : "오후";
    hours = hours % 12 || 12;
    return `${period} ${hours}:${minutes}`;
}

// 추천 시간들을 화면에 표시하는 함수
function displayTimes(times, containerId) {
    let container = document.getElementById(containerId);
    container.innerHTML = ""; // 기존 내용 지우기

    times.forEach((time, index) => {
        let div = document.createElement("div");
        div.className = "time-box";
        div.textContent = time;

        if (index < 2) {
            div.classList.add("recommended"); // 상위 2개 추천 박스
        }

        container.appendChild(div);
    });
}