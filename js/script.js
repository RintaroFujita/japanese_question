fetch('questions.json')
  .then(response => response.json())
  .then(questions => {
    const questionText = document.getElementById('question-text');
    const choicesContainer = document.getElementById('choices');
    const submitButton = document.getElementById('submitButton');
    const resultContainer = document.getElementById('result');

    let currentQuestion = 0;
    let correctAnswers = 0;

    function displayQuestion() {
      const questionData = questions[currentQuestion];
      questionText.textContent = questionData.question;
      choicesContainer.innerHTML = '';

      questionData.choices.forEach((choice, index) => {
        const label = document.createElement('label');
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'answer';
        radio.value = choice;
        label.appendChild(radio);
        label.appendChild(document.createTextNode(choice));
        choicesContainer.appendChild(label);
      });
    }

    submitButton.addEventListener('click', () => {
      const selectedChoice = document.querySelector('input[name="answer"]:checked');
      if (!selectedChoice) {
        alert('選択肢を選んでください。');
        return;
      }

      const answer = selectedChoice.value;
      if (answer === questions[currentQuestion].answer) {
        correctAnswers++;
        resultContainer.textContent = '正解！';
      } else {
        resultContainer.textContent = `不正解。正解は ${questions[currentQuestion].answer} です。`;
      }

      currentQuestion++;
      if (currentQuestion < questions.length) {
        displayQuestion();
      } else {
        questionText.textContent = '';
        choicesContainer.innerHTML = '';
        submitButton.style.display = 'none';
        resultContainer.textContent = `終了！${correctAnswers} 問正解です。`;
      }
    });

    displayQuestion();
  });
