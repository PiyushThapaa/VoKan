import { kanjiBlocks } from "./kanjiData.js";

const params = new URLSearchParams(window.location.search);

// if (type == "kanji") {
    let kanNum = Object.keys(kanjiBlocks).length;
    for (let i = 0; i < kanNum; i++) {
        document.getElementById("list").innerHTML += `<button onclick="navigateToQuiz(${i+1})" class="num-button">${i+1}</button>`;
    }   

    document.getElementById("loading").style.display = "none";