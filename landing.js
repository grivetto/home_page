/**
 * Script per gestire l'animazione di ingresso "lanciata".
 * Si attiva al caricamento del DOM.
 */

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('mainContainer');

    // Piccolo ritardo per assicurare che il browser abbia renderizzato il frame iniziale
    // e per rendere l'ingresso più percepibile dall'utente.
    setTimeout(() => {
        if (container) {
            container.classList.add('animate-in');
        }
    }, 100); // 100ms di ritardo
});
