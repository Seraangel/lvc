const form = document.querySelector("#volume-form");
const factorAInput = document.querySelector("#factor-a");
const factorBInput = document.querySelector("#factor-b");
const factorCInput = document.querySelector("#factor-c");
const result = document.querySelector("#result");

const hintText = "Bitte alle drei Faktoren eingeben.";

function parseFactor(input) {
  const normalizedValue = input.value.trim().replace(",", ".");

  if (normalizedValue === "") {
    input.removeAttribute("aria-invalid");
    return null;
  }

  const value = Number(normalizedValue);
  const isValid = Number.isFinite(value) && value >= 0;

  input.setAttribute("aria-invalid", String(!isValid));

  return isValid ? value : null;
}

function formatMilliliters(value) {
  return new Intl.NumberFormat("de-DE", {
    maximumFractionDigits: 3,
  }).format(value);
}

function updateResult() {
  const factorA = parseFactor(factorAInput);
  const factorB = parseFactor(factorBInput);
  const factorC = parseFactor(factorCInput);

  if (factorA === null || factorB === null || factorC === null) {
    result.textContent = hintText;
    result.classList.add("is-hint");
    return;
  }

  const volumenMl = factorA * factorB * factorC;
  result.textContent = `Volumen: ${formatMilliliters(volumenMl)} ml`;
  result.classList.remove("is-hint");
}

form.addEventListener("input", updateResult);

form.addEventListener("reset", () => {
  window.setTimeout(() => {
    result.textContent = hintText;
    result.classList.add("is-hint");
    factorAInput.focus();
  }, 0);
});

updateResult();
