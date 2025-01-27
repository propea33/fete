// Sélection des éléments
const colorCircles = document.querySelectorAll('.color-circle');
const body = document.body;
const birthdayInput = document.getElementById('birthday');
const calculateButton = document.getElementById('calculate');
const countdownDisplay = document.getElementById('countdown');
const ageDisplay = document.getElementById('age');

// Variables pour gérer l'intervalle
let countdownInterval = null;

// Réinitialiser la couleur de fond
document.getElementById('white').addEventListener('click', () => {
    body.style.backgroundColor = '#f0f0f0'; // Couleur de fond initiale
});

// Changement de couleur du site
colorCircles.forEach(circle => {
    if (circle.id !== 'white') { // Ne pas appliquer au cercle blanc
        circle.addEventListener('click', () => {
            body.style.backgroundColor = circle.id;
        });
    }
});

// Fonction pour calculer le décompte
function startCountdown(birthday) {
    // Effacer l'intervalle précédent s'il existe
    if (countdownInterval) {
        clearInterval(countdownInterval);
    }

    // Mettre à jour le décompte en temps réel
    countdownInterval = setInterval(() => {
        const now = new Date();
        let nextBirthday = new Date(now.getFullYear(), birthday.getMonth(), birthday.getDate());

        if (now > nextBirthday) {
            nextBirthday.setFullYear(now.getFullYear() + 1);
        }

        const timeDiff = nextBirthday - now;

        // Calcul des mois
        let months = nextBirthday.getMonth() - now.getMonth();
        if (months < 0) {
            months += 12;
        }

        // Calcul des jours
        const tempDate = new Date(now);
        tempDate.setMonth(now.getMonth() + months);
        let days = Math.floor((nextBirthday - tempDate) / (1000 * 60 * 60 * 24));

        // Si les jours sont négatifs, ajuster les mois et les jours
        if (days < 0) {
            months--;
            tempDate.setMonth(now.getMonth() + months);
            days = Math.floor((nextBirthday - tempDate) / (1000 * 60 * 60 * 24));
        }

        // Calcul des heures, minutes et secondes
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        // Afficher le décompte
        countdownDisplay.innerHTML = `
            Il reste ${months} mois, ${days} jours, ${hours} heures, ${minutes} minutes et ${seconds} secondes avant ta fête !
        `;

        // Calculer l'âge
        const age = nextBirthday.getFullYear() - birthday.getFullYear();
        ageDisplay.innerHTML = `Tu auras ${age} ans !`;
    }, 1000);
}

// Gestion du clic sur le bouton
calculateButton.addEventListener('click', () => {
    const birthday = new Date(birthdayInput.value);
    if (isNaN(birthday.getTime())) {
        alert("Entre une date valide !");
        return;
    }

    // Réinitialiser l'affichage
    countdownDisplay.innerHTML = "";
    ageDisplay.innerHTML = "";

    // Démarrer le décompte
    startCountdown(birthday);
});
