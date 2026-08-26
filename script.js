const micButton = document.getElementById("micButton");
const statusText = document.getElementById("status");

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
  statusText.textContent =
    "Voice recognition is not supported in this browser.";
} else {

  const recognition = new SpeechRecognition();

  recognition.lang = "en-IN";
  recognition.continuous = false;
  recognition.interimResults = false;

  micButton.addEventListener("click", () => {
    recognition.start();
    statusText.textContent = "🎤 Listening... Speak now!";
  });

  recognition.onresult = (event) => {

    const question =
      event.results[0][0].transcript.toLowerCase();

    statusText.textContent = "You said: " + question;

    let answer = "";

    if (
      question.includes("skill") ||
      question.includes("skills")
    ) {
      answer =
        "My skills are C, Java, Python and Web Development.";
    }

    else if (
      question.includes("project") ||
      question.includes("projects")
    ) {
      answer =
        "I have Python and Web Development projects. You can explore them on my portfolio.";
    }

    else if (
      question.includes("who are you") ||
      question.includes("about you")
    ) {
      answer =
        "Hi! I am Venkata Satya, a student and Python developer.";
    }

    else if (
      question.includes("contact") ||
      question.includes("email")
    ) {
      answer =
        "You can contact me using the Contact button on my portfolio.";
    }

    else if (
      question.includes("hello") ||
      question.includes("hi")
    ) {
      answer =
        "Hi there! Welcome to my portfolio. How can I help you?";
    }

    else {
      answer =
        "Sorry, I didn't understand. You can ask me about my skills, projects, or contact details.";
    }

    statusText.textContent = answer;

    const speech =
      new SpeechSynthesisUtterance(answer);

    speech.lang = "en-IN";
    speech.rate = 0.9;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speech);
  };

  recognition.onerror = () => {
    statusText.textContent =
      "I couldn't hear you. Please try again.";
  };
}
