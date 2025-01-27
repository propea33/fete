// Sélection des éléments
const colorCircles = document.querySelectorAll('.color-circle');
const body = document.body;
const birthdayInput = document.getElementById('birthday');
const calculateButton = document.getElementById('calculate');
const countdownDisplay = document.getElementById('countdown');

// Changement de couleur du site
colorCircles.forEach(circle => {
    circle.addEventListener('click', () => {
        body.style.backgroundColor = circle.id;
    });
});

// Calcul du décompte
calculateButton.addEventListener('click', () => {
    const birthday = new Date(birthdayInput.value);
    if (isNaN(birthday.getTime())) {
        alert("Entre une date valide !");
        return;
    }

    // Définir la saison pour l'arrière-plan
    const month = birthday.getMonth() + 1; // Les mois vont de 0 à 11
    if (month >= 3 && month <= 5) {
        body.className = 'spring';
    } else if (month >= 6 && month <= 8) {
        body.className = 'summer';
    } else if (month >= 9 && month <= 11) {
        body.className = 'autumn';
    } else {
        body.className = 'winter';
    }

    // Mettre à jour le décompte en temps réel
    setInterval(() => {
        const now = new Date();
        let nextBirthday = new Date(now.getFullYear(), birthday.getMonth(), birthday.getDate());

        if (now > nextBirthday) {
            nextBirthday.setFullYear(now.getFullYear() + 1);
        }

        const timeDiff = nextBirthday - now;
        const months = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 30));
        const days = Math.floor((timeDiff % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        countdownDisplay.innerHTML = `
            Il reste ${months} mois, ${days} jours, ${hours} heures, ${minutes} minutes et ${seconds} secondes avant ta fête !
        `;
    }, 1000);
});
