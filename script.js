// Sélection des éléments
const colorCircles = document.querySelectorAll('.color-circle');
const body = document.body;
const birthdayInput = document.getElementById('birthday');
const calculateButton = document.getElementById('calculate');
const countdownDisplay = document.getElementById('countdown');
const ageDisplay = document.getElementById('age');

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

// Calcul du décompte
calculateButton.addEventListener('click', () => {
    const birthday = new Date(birthdayInput.value);
    if (isNaN(birthday.getTime())) {
        alert("Entre une date valide !");
        return;
    }

    // Mettre à jour le décompte en temps réel
    const countdownInterval = setInterval(() => {
        const now = new Date();
        let nextBirthday = new Date(now.getFullYear(), birthday.getMonth(), birthday.getDate());

        if (now > nextBirthday) {
            nextBirthday.setFullYear(now.getFullYear() + 1);
        }

        const timeDiff = nextBirthday - now;
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        // Afficher le décompte
        countdownDisplay.innerHTML = `
            Il reste ${days} jours, ${hours} heures, ${minutes} minutes et ${seconds} secondes avant ta fête !
        `;

        // Calculer l'âge
        const age = nextBirthday.getFullYear() - birthday.getFullYear();
        ageDisplay.innerHTML = `Tu auras ${age} ans à ta prochaine fête !`;
    }, 1000);

    // Réinitialiser tout si on clique à nouveau sur le bouton
    calculateButton.addEventListener('click', () => {
        clearInterval(countdownInterval);
    }, { once: true }); // Ne s'exécute qu'une fois
});
