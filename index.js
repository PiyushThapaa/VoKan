import { kanjiBlocks } from "./kanjiData.js";
import { vocabChap } from "./vocabData.js";

const params = new URLSearchParams(window.location.search);
const type = params.get("type");

if (type == "kanji") {
    let kanNum = Object.keys(kanjiBlocks).length;
    document.getElementById("practice-header").innerText = "Select Kanji List";
    for (let i = 0; i < kanNum; i++) {
        document.getElementById("list").innerHTML += `<button onclick="navigateToQuiz('${type}',${i+1})"class="num-button">${i+1}</button>`;
    }   
    
}
if (type == "vocab") {
    let vocabNum = Object.keys(vocabChap).length;
    document.getElementById("practice-header").innerText = "Select Vocab List";
    for (let i = 0; i < vocabNum; i++) {
        document.getElementById("list").innerHTML += `<button onclick="navigateToQuiz('${type}',${i+1})"class="num-button">${i+1}</button>`;
    }   
}
