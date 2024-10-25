import { help } from './script.js';
import { intro } from './script.js';
import { history } from './script.js';
import { type } from './script.js';
import { detection } from './script.js';
import { safety } from './script.js';
import { protect } from './script.js';
import { removal } from './script.js';
import { install } from './script.js';
import { banner } from './script.js';
import { citation } from './script.js';
import { about } from './script.js';
import { hello } from './script.js';

let helloCommandUsed = false;

let inputCommand = document.querySelector('.input-command');
function focusOnInput() {
  inputCommand.focus();
}
document.addEventListener('keypress', focusOnInput);
document.addEventListener('click', focusOnInput);
window.onload = function() {
  focusOnInput();
  executeCommand('hello');
}

function enterListener(e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    const command = this.value.trim();
    this.value = '';
    executeCommand(command);
  }
}

document.querySelector('.input-command').addEventListener('keypress', enterListener);

function executeCommand(command) {
  const outputDiv = document.querySelector('.output');

  if (!(command.toLowerCase() === 'hello' && !helloCommandUsed)) {
    outputDiv.innerHTML += `<div class="green">> ${command}<div>`;
  }

  if (!command) {
    return;
  }

  switch (command.toLowerCase()) {
    case 'help':
      typeText(help.join('<br>'), outputDiv);
      break;
    case 'intro':
      typeText(intro.join('<br>'), outputDiv);
      break;
    case 'type':
      typeText(type.join('<br>'), outputDiv);
      break;
    case 'history':
      typeText(history.join('<br>'), outputDiv);
      break;
    case 'detection':
      typeText(detection.join('<br>'), outputDiv);
      break;
    case 'safety':
      typeText(safety.join('<br>'), outputDiv);
      break;
    case 'protect':
      typeText(protect.join('<br>'), outputDiv);
      break;
    case 'removal':
      typeText(removal.join('<br>'), outputDiv);
      break;
    case 'install':
      typeText(install.join('<br>'), outputDiv);
      startQuiz();
      break;
    case 'about':
      typeText(about.join('<br>'), outputDiv);
      break;
    case 'banner':
      typeText(banner.join('<br>'), outputDiv);
      break;
    case 'citation':
      typeText(citation.join('<br>'), outputDiv);
      break;
    case 'clear':
      outputDiv.innerHTML = '';
      break;
    case 'hello':
      if (!helloCommandUsed) {
        typeText(hello.join('<br>'), outputDiv);
        helloCommandUsed = true;
      } else {
        executeCommand('hi!');
      }
      break;
    default:
      typeText(`Unknown command, type '<span>help</span>' to navigate through the commands`, outputDiv);
      break;
  }
  window.scrollTo(0, document.body.scrollHeight);

}

function typeText(text, element, delay = 2) {
  const parts = text.split(/(<\/?[a-z]+>|<br>|<br\/>|\s+)/);
  let i = 0;

  function typeWriter() {
    if (i < parts.length) {

      if (parts[i] === '<br>') {
        element.innerHTML += parts[i];
        window.scrollTo(0, document.body.scrollHeight);
      } else if (parts[i] === '<span>') {
        let span = document.createElement('span');
        element.appendChild(span);

        i++;

        while (i < parts.length && parts[i] !== '</span>') {
          span.appendChild(document.createTextNode(parts[i]));
          window.scrollTo(0, document.body.scrollHeight);
          i++;
        }
      }
      else {
        element.appendChild(document.createTextNode(parts[i]));
        window.scrollTo(0, document.body.scrollHeight);
      }

      i++;

      setTimeout(typeWriter, delay);
    }
  }
  typeWriter();
}

let questions = [
  {
    question: "<br>What does the term 'malware' stand for?",
    options: ["1) Malicious Software",
      "2) Mobile Software",
      "3) Malfunctioning Software",
      "4) Management Software"],
    correctAnswer: 0
  },
  {
    question: "<br>Which of the following is NOT a common action performed by malware?",
    options: ["1) Displaying advertisements",
      "2) Enhancing system security",
      "3) Gathering sensitive information",
      "4) Disrupting computer system functioning"],
    correctAnswer: 1
  },
  {
    question: "<br>Which malware is known for spreading without any user interaction?",
    options: ["1) Virus",
      "2) Worm",
      "3) Trojan",
      "4) Ransomware"],
    correctAnswer: 1
  },
  {
    question: "<br>What was the purpose of the Creeper malware in the early years of computing?",
    options: ["1) Data theft", "2) Network connection experiment", "3) Displaying advertisements", "4) Erasing files"],
    correctAnswer: 1
  },
  {
    question: "<br>What distinguishes a Trojan from other malware types?",
    options: ["1) Spreading without user interaction", "2) Hiding inside legitimate programs", "3) Encrypting data for ransom", "4) Displaying warning messages"],
    correctAnswer: 1
  },
  {
    question: "<br>How does ransomware encrypt the target's data?",
    options: ["1) Using a private key", "2) Disabling security", "3) Deleting files", "4) Corrupting files directly"],
    correctAnswer: 0
  },
  {
    question: "<br>Which method of malware detection scans files for suspicious behavior?",
    options: ["1) Signature-based detection", "2) Heuristic-based detection", "3) Behavior-based detection", "4) Rootkit detection"],
    correctAnswer: 2
  },
  {
    question: "<br>What is the purpose of logic bombs in the context of malware?",
    options: ["1) Gathering sensitive information", "2) Encrypting data", "3) Remaining undetected", "4) Harming the victim under specific conditions"],
    correctAnswer: 3
  },
  {
    question: "<br>Which stage of the Software Development Lifecycle involves rigorous testing for the final detection of bugs?",
    options: ["1) Planning", "2) Development", "3) Testing", "4) Release and Deployment"],
    correctAnswer: 2
  },
  {
    question: "<br>What is a recommended best practice for preventing malware infections according to the provided information?",
    options: ["1) Using the same password for multiple accounts", "2) Downloading from untrustworthy sources", "3) Avoiding software updates", "4) Using a well-trusted antivirus software"],
    correctAnswer: 3
  }
];

let timeRemaining = 120;
let currentQuestion = 0;
let correctAnswers = 0;

function displayQuestion(index) {
  const outputDiv = document.querySelector('.output');
  if (timeRemaining <= 0) {
    return;
  }
  if (index < questions.length) {
    let currentElement = questions[index];
    let combinedString = currentElement.question + "<br><br>";
    combinedString += currentElement.options.join("<br>") + "<br>";

    typeText(combinedString, outputDiv);
  }
  else {
    endQuiz();
  }
}

function checkAnswer(answer) {
  if (timeRemaining <= 0) {
    return;
  }
  if (answer - 1 == questions[currentQuestion].correctAnswer) {
    correctAnswers++
    typeText("Correct! Score: " + correctAnswers + "\n", document.querySelector('.output'));
  } else {
    timeRemaining -= 10;
    typeText("Incorrect! Score: " + correctAnswers + "\n", document.querySelector('.output'));
  }
  currentQuestion++;
  let timeout = setTimeout(() => { typeText("Time Remaining: " + timeRemaining + "\n", document.querySelector('.output')) }, 250);
  timeout = setTimeout(() => { displayQuestion(currentQuestion) }, 500);
}

let timer = null;

function quizListener(e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    const inputStr = this.value.trim();
    this.value = '';
    let answer = parseInt(inputStr);
    // Check if the parsed value is an integer
    if (Number.isInteger(answer)) {
      checkAnswer(answer);
    } else {
      // Handle the case where the input is not an integer
      // For example, you can display an error message or just ignore the input
      console.log("Please enter a valid integer");
    }
  }
}

function startQuiz() {
  // Find the input element with class 'input-command'
  document.querySelector('.input-command').removeEventListener('keypress', enterListener);
  var inputElement = document.querySelector('.input-command');
  // Replace the class name
  inputElement.className = 'input-quiz';
  document.querySelector('.input-quiz').addEventListener('keypress', quizListener);
  currentQuestion = 0;
  correctAnswers = 0;
  timeRemaining = 120;
  let timeout = setTimeout(() => { displayQuestion(currentQuestion) }, 250);
  timer = setInterval(countdown, 1000);
}

function endQuiz() {
  let text = "";
  switch (correctAnswers) {
    case 0:
      text = "Uh-oh, it looks like the virus is still in control. Your device remains locked. But don't worry, you can always try again to outsmart it! Learn more about malware first before downloading anything suspicious next time..." + "\n";
      break;
    case 1:
      text = "Uh-oh, it looks like the virus is still in control. Your device remains locked. But don't worry, you can always try again to outsmart it! Learn more about malware first before downloading anything suspicious next time..." + "\n";
      break;
    case 2:
      text = "Uh-oh, it looks like the virus is still in control. Your device remains locked. But don't worry, you can always try again to outsmart it! Learn more about malware first before downloading anything suspicious next time..." + "\n";
      break;
    case 3:
      text = "Uh-oh, it looks like the virus is still in control. Your device remains locked. But don't worry, you can always try again to outsmart it! Learn more about malware first before downloading anything suspicious next time..." + "\n";
      break;
    case 4:
      text = "Not bad! You've managed to weaken the virus's grip, but your device isn't fully secure yet. A little more effort, and you'll reclaim full control. Learn more about malware first before downloading anything suspicious next time..." + "\n";
      break;
    case 5:
      text = "Not bad! You've managed to weaken the virus's grip, but your device isn't fully secure yet. A little more effort, and you'll reclaim full control. Learn more about malware first before downloading anything suspicious next time..." + "\n";
      break;
    case 6:
      text = "Not bad! You've managed to weaken the virus's grip, but your device isn't fully secure yet. A little more effort, and you'll reclaim full control. Learn more about malware first before downloading anything suspicious next time..." + "\n";
      break;
    case 7:
      text = "Not bad! You've managed to weaken the virus's grip, but your device isn't fully secure yet. A little more effort, and you'll reclaim full control. Learn more about malware first before downloading anything suspicious next time..." + "\n";
      break;
    default:
      text = "Congratulations! You've successfully outsmarted the virus and reclaimed control of your device. Your cybersecurity knowledge is impressive. Stay vigilant and keep your digital world safe!" + "\n";
      break;
  }
  let timeout = setTimeout(() => { typeText("Your score is: " + correctAnswers + "/10" + "\n" + text + "\n", document.querySelector('.output')) }, 250);
  clearInterval(timer);
  document.querySelector('.input-quiz').removeEventListener('keypress', quizListener);

  document.querySelector('.input-quiz').className = 'input-command';
  document.querySelector('.input-command').addEventListener('keypress', enterListener);
  let virusElement = document.querySelector('.virus');
  let timerElement = document.querySelector('.timer');

  timerElement.innerHTML = '';
  virusElement.innerHTML = '';

}

function displayTime() {
  let timerElement = document.querySelector('.timer');
  timerElement.textContent = timeRemaining > 0 ? "Time remaining: " + timeRemaining : "";;
}

function countdown() {
  timeRemaining--;
  if (timeRemaining <= 10 && timeRemaining > 0) {
    displayTime();
  }
  else if (timeRemaining % 5 == 0 && timeRemaining != 0) {
    displayTime();
  }
  if (timeRemaining <= 0) {
    document.querySelector('.timer').textContent = "Time's up!";
    endQuiz();
  }
}