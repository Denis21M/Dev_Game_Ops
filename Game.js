async function fetchQuestion() {
    const res = await fetch('/.netlify/functions/getQuestions');
    const data = await res.json();
    displayQuestion(data);
}

function displayQuestion(data) {
    document.getElementById('question').innerText = data.question;
    data.choices.forEach((choice, index) => {
        const btn = document.getElementById(`choice${index+1}`);
        btn.innerText = choice;
        btn.value = choice;
        btn.onclick = () => checkAnswer(btn, data.answer);
    });
}

function checkAnswer(btn, correctAnswer) {
    const result = document.getElementById('result');
    if (btn.value === correctAnswer) {
        result.innerText = '✅ Correct!';
    } else {
        result.innerText = `❌ Wrong! Correct: ${correctAnswer}`;
    }
    setTimeout(fetchQuestion, 3000); // Load next after 3 seconds
}

fetchQuestion();
