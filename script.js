document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("demo-button");
  const feedback = document.getElementById("demo-feedback");

  if (!button || !feedback) return;

  let clickCount = 0;

  button.addEventListener("click", () => {
    clickCount += 1;

    feedback.textContent = clickCount === 1
      ? "Interaction détectée ! Tu peux maintenant brancher ta propre logique ici."
      : `Tu as cliqué ${clickCount} fois. Le JS fonctionne, tu peux continuer.`;

    feedback.classList.remove("text-slate-400");
    feedback.classList.add("text-emerald-300");
  });
});
