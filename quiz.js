import { kanjiBlocks } from "./kanjiData.js";

const params = new URLSearchParams(window.location.search);
const chap = params.get("chapter");


    const kanji = kanjiBlocks[chap].slice(); // 1. Copy the original array
    for (let i = kanji.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [kanji[i], kanji[j]] = [kanji[j], kanji[i]];
    }
    let currentIndex = 0;
    let score = 0
    function showKanji() {
        const current = kanji[currentIndex];
        document.getElementById("sno").textContent = `${currentIndex + 1}`;
        document.getElementById("kanji").innerText = `${current.kanji}`;
        document.getElementById("input").value = "";
        document.getElementById("result").innerText = "";
        document.getElementById("reading").style.display = "none";
        document.getElementById("meaning").style.display = "none";
        document.getElementById("move-forward").style.display = "none";
        document.getElementById("check").style.display = "inline-block";
        document.getElementById("kanjiContainer").innerHTML = "";
    }
    function checkAnswer() {
        const userInput = document.getElementById("input").value.trim().toLowerCase();
        document.getElementById("check").style.display = "none";

        const current = kanji[currentIndex];

        const isCorrect = current.romaji.includes(userInput) || current.hiragana.includes(userInput)

        if (isCorrect) {
            document.getElementById("result").innerText = "✅ Correct!";
            score++;

        } else {
            document.getElementById("result").textContent = "❌ Incorrect";
        }

        document.getElementById("meaning").innerHTML = "<b>Meaning : </b>";
        document.getElementById("reading").innerHTML = "<b>Reading : </b>";
        document.getElementById("reading").style.display = "block";
        document.getElementById("meaning").style.display = "block";
        document.getElementById("move-forward").style.display = "inline";
        document.getElementById("meaning").innerHTML += `${current.meaning}`;
        document.getElementById("reading").innerHTML += `${current.reading}`;

        if (current.kanjiArray) {
            for (let i = 0; i < current.kanjiArray.length; i++) {
                const kanjiContainer = document.getElementById("kanjiContainer");
                const p = document.createElement("p");
                p.textContent = `${current.kanjiArray[i].kanji} : ${current.kanjiArray[i].meaning}`;
                kanjiContainer.appendChild(p);
            }
        }

        currentIndex++;
        if (currentIndex < kanji.length) {
            document.getElementById("move-forward").addEventListener('click', showKanji);
        } else {
            document.getElementById("move-forward").style.display = "none";
            document.getElementById("quiz-container").style.display = "none";
            document.getElementById("resultContainer").style.display = "block";
            document.getElementById("score").textContent = `Score: ${score} / ${kanji.length}`;
        }
    }
    showKanji();
    document.getElementById("quiz-box").style.display = "block";
    document.getElementById("loading").style.display = "none";
    document.getElementById("check").addEventListener('click', checkAnswer);