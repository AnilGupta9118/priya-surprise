const screens = [...document.querySelectorAll(".screen")];
const progressWrap = document.getElementById("progressWrap");
const progressBar = document.getElementById("progressBar");
const stepCount = document.getElementById("stepCount");
let currentStep = 0;

function showStep(step) {
  currentStep = Math.max(0, Math.min(step, screens.length - 1));
  screens.forEach((screen, index) => {
    screen.classList.toggle("active", index === currentStep);
  });

  progressWrap.hidden = currentStep === 0;
  if (currentStep > 0) {
    stepCount.textContent = `${currentStep} / ${screens.length - 1}`;
    progressBar.style.width = `${(currentStep / (screens.length - 1)) * 100}%`;
  }

  if (currentStep === screens.length - 1) launchConfetti();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.querySelectorAll("[data-next]").forEach((button) => {
  button.addEventListener("click", () => showStep(currentStep + 1));
});

const envelopeButton = document.getElementById("envelope");
const envelope = envelopeButton.querySelector(".envelope");
const envelopeHint = document.getElementById("envelopeHint");
const readLetter = document.getElementById("readLetter");

envelopeButton.addEventListener("click", () => {
  const isOpen = envelope.classList.toggle("open");
  envelopeButton.setAttribute("aria-expanded", String(isOpen));
  envelopeHint.textContent = isOpen
    ? "Aww, letter mil gaya. 🥹"
    : "Tap the envelope to open";
  readLetter.disabled = !isOpen;
});

readLetter.addEventListener("click", () => showStep(4));

const secretButton = document.getElementById("secretButton");
const secretMessage = document.getElementById("secretMessage");
secretButton.addEventListener("click", () => {
  secretMessage.hidden = false;
  secretButton.textContent = "SECRET UNLOCKED 😂";
  secretButton.disabled = true;
});

document.getElementById("replay").addEventListener("click", () => {
  secretMessage.hidden = true;
  secretButton.disabled = false;
  secretButton.textContent = "DON'T CLICK 👀";
  envelope.classList.remove("open");
  envelopeButton.setAttribute("aria-expanded", "false");
  envelopeHint.textContent = "Tap the envelope to open";
  readLetter.disabled = true;
  showStep(0);
});

const stars = document.getElementById("stars");
for (let i = 0; i < 30; i++) {
  const star = document.createElement("span");
  star.className = "star";
  star.textContent = i % 3 === 0 ? "✦" : "·";
  star.style.left = `${(i * 43 + 7) % 100}%`;
  star.style.top = `${(i * 61 + 13) % 100}%`;
  star.style.fontSize = `${8 + (i % 4) * 3}px`;
  star.style.animationDelay = `${(i % 9) * 0.7}s`;
  stars.appendChild(star);
}

let confettiStarted = false;
function launchConfetti() {
  if (confettiStarted) return;
  confettiStarted = true;
  const container = document.getElementById("confetti");
  const symbols = ["✦", "♥", "✧", "✿", "♡"];
  for (let i = 0; i < 48; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.textContent = symbols[i % symbols.length];
    piece.style.left = `${(i * 37 + 11) % 100}%`;
    piece.style.animationDelay = `${(i % 12) * 0.13}s`;
    piece.style.animationDuration = `${2.5 + (i % 7) * 0.35}s`;
    container.appendChild(piece);
  }
}

showStep(0);
