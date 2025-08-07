import { kanjiBlocks } from "./kanjiData.js";
import { vocabChap } from "./vocabData.js";

const params = new URLSearchParams(window.location.search);
const type = params.get("type");
const chap = params.get("chapter");






if (type == "kanji") {
    const kanji = kanjiBlocks[chap].slice(); // 1. Copy the original array
    for (let i = kanji.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [kanji[i], kanji[j]] = [kanji[j], kanji[i]];
    }
    document.getElementById("type").innerText = "Kanji : ";
    let currentIndex = 0;
    let score = 0
    function showKanji() {
        const current = kanji[currentIndex];
        document.getElementById("sno").textContent = `${currentIndex + 1}`;
        document.getElementById("kanji-vocab").innerText = `${current.kanji}`;
        document.getElementById("input1").value = "";
        document.getElementById("input2").value = "";
        document.getElementById("result").innerText = "";
        document.getElementById("hiragana").style.display = "none";
        document.getElementById("meaning").style.display = "none";
        document.getElementById("move-forward").style.display = "none";
        document.getElementById("check").style.display = "inline-block";
    }
    function checkAnswer() {
        const userInput1 = document.getElementById("input1").value.trim().toLowerCase();
        const userInput2 = document.getElementById("input2").value.trim().toLowerCase();
        document.getElementById("check").style.display = "none";

        const current = kanji[currentIndex];

        const isCorrect1 = current.romaji.includes(userInput1) || current.hiragana.includes(userInput1)
        const isCorrect2 = current.meaning.includes(userInput2);

        if (isCorrect1 && isCorrect2) {
            document.getElementById("result").innerText = "✅ Correct!";
            score++;

        } else {
            document.getElementById("meaning").innerHTML = "<b>Meaning : </b>";
            document.getElementById("hiragana").innerHTML = "<b>Hiragana/Romaji : </b>";
            document.getElementById("hiragana").style.display = "block";
            document.getElementById("meaning").style.display = "block";
            document.getElementById("move-forward").style.display = "inline";
            current.meaning.forEach((element, index) => {
                if (index == current.meaning.length - 1) {
                    document.getElementById("meaning").innerHTML += `${element}`
                } else {
                    document.getElementById("meaning").innerHTML += `${element}, `
                }
            });
            current.hiragana.forEach((element, index) => {
                if (index == current.meaning.length - 1) {
                    document.getElementById("hiragana").innerHTML += `${element}/${current.romaji[index]}`;
                } else {
                    document.getElementById("hiragana").innerHTML += `${element}/${current.romaji[index]}, `;
                }
            });
            document.getElementById("result").textContent = "❌ Incorrect";
        }
        currentIndex++;
        if (currentIndex < kanji.length) {
            if (isCorrect1 && isCorrect2) {
                setTimeout(showKanji,800)
            } else{
                document.getElementById("move-forward").addEventListener('click', showKanji);
            }

        } else {
            document.getElementById("move-forward").style.display = "none";
            setTimeout(() => {
                document.getElementById("quiz-container").style.display = "none";
                document.getElementById("resultContainer").style.display = "block";
                document.getElementById("score").textContent = `Score: ${score} / ${kanji.length}`;
            }, 1000);
        }
    }
    showKanji();
    document.getElementById("quiz-box").style.display = "block";

    document.getElementById("check").addEventListener('click', checkAnswer)
}

if (type == "vocab") {
    const vocab = vocabChap[chap].slice(); // 1. Copy the original array
    for (let i = vocab.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [vocab[i], vocab[j]] = [vocab[j], vocab[i]];
    }
    document.getElementById("input1").style.display = "none";
    document.getElementById("hiragana").style.display = "none";
    document.getElementById("meaning").style.display = "none";
    document.getElementById("type").innerText = "Vocab : ";
    let currentIndex = 0;
    let score = 0
    function showVocab() {
        const current = vocab[currentIndex];
        document.getElementById("move-forward").style.display = "none";
        document.getElementById("sno").textContent = `${currentIndex + 1}`;
        document.getElementById("kanji-vocab").innerText = `${current.vocab}`;
        document.getElementById("input2").value = "";
        document.getElementById("result").innerText = ""
        document.getElementById("meaning").style.display = "none"
        document.getElementById("check").style.display = "inline-block";
    }
    function checkAnswer() {
        const userInput2 = document.getElementById("input2").value.trim().toLowerCase();
        const current = vocab[currentIndex];
        const isCorrect2 = current.meaning.includes(userInput2);
        document.getElementById("check").style.display = "none";

        if (isCorrect2) {
            document.getElementById("result").innerText = "✅ Correct!";
            score++;

        } else {
            document.getElementById("meaning").innerHTML = "<b>Meaning : </b>";
            document.getElementById("meaning").style.display = "block";
            document.getElementById("move-forward").style.display = "inline";
            document.getElementById("result").textContent = "❌ Incorrect";
            current.meaning.forEach((element, index) => {
                if (index == current.meaning.length - 1) {
                    document.getElementById("meaning").innerHTML += `${element}`
                } else {
                    document.getElementById("meaning").innerHTML += `${element},`
                }
            });
        }
        currentIndex++;
        if (currentIndex < vocab.length) {
            if (isCorrect2) {
                setTimeout(showVocab,800)
            } else{
                document.getElementById("move-forward").addEventListener('click', showVocab);
            }
        } else {
            document.getElementById("move-forward").style.display = "none";
            setTimeout(() => {
                document.getElementById("quiz-container").style.display = "none";
                document.getElementById("resultContainer").style.display = "block";
                document.getElementById("score").textContent = `Score: ${score} / ${vocab.length}`;
            }, 1000);
        }
    }
    showVocab();
    document.getElementById("quiz-box").style.display = "block";

    document.getElementById("check").addEventListener('click', checkAnswer)
}