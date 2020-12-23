function solve() {
  let allAnswersElements = document.getElementsByClassName('answer-wrap');
  let resultHeaderElement = document.querySelector('.results-inner h1');
  
  allAnswersElements = Array.from(allAnswersElements);

  for (let button of allAnswersElements) {
    button.addEventListener('click', answers);
  }

  let correctAnswers = ['onclick', 'JSON.stringify()', 'A programming API for HTML and XML documents'];
  let correctAnswersCounter = 0;

  function answers(event) {
    let currentAnswer = event.target;
    let currentSection = event.target.parentElement.parentElement.parentElement.parentElement;
    let nextSection = currentSection.nextElementSibling;
    let answer = currentAnswer.innerHTML;

    if (correctAnswers.includes(answer)) {
      correctAnswersCounter++;
    }

    if (correctAnswersCounter < 3) {
      resultHeaderElement.textContent = `You have ${correctAnswersCounter} right answers`;
    } else {
      resultHeaderElement.textContent = `You are recognized as top JavaScript fan!`;
    }

    currentSection.setAttribute('style', 'display: none');
    nextSection.setAttribute('style', 'display: block');
  }
}