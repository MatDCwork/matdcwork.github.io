/* -----------------------------------------
   Name: Matthew Cagulada
   File: main.js
   Date: 12 December 2025
   Description: JS for accessible Show/Hide transcript.
----------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('toggle-transcript');
  const transcript = document.getElementById('welcome-transcript');

  if (!toggleBtn || !transcript) return;

  toggleBtn.addEventListener('click', () => {
    const isHiddenNow = transcript.classList.toggle('hidden');
    const expanded = !isHiddenNow;

    toggleBtn.setAttribute('aria-expanded', String(expanded));
    toggleBtn.textContent = expanded ? 'Hide transcript' : 'Show transcript';
  });
});
