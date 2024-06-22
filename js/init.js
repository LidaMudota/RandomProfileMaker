window.onload = function() {
    generateNewPerson();

    const generateButton = document.querySelector('.generateButton');
    generateButton.addEventListener('click', function() {
        generateNewPerson();
    });

    const resetButton = document.querySelector('.resetButton');
    resetButton.addEventListener('click', function() {
        clearPersonData();
    });
};

function generateNewPerson() {
    const newPerson = personGenerator.getPerson();
    displayPerson(newPerson);
}

function clearPersonData() {
    document.querySelector('.firstNameOutput').innerText = '';
    document.querySelector('.surnameOutput').innerText = '';
    document.querySelector('.patronymicOutput').innerText = '';
    document.querySelector('.genderOutput').innerText = '';
    document.querySelector('.birthYearOutput').innerText = '';
    document.querySelector('.birthDateOutput').innerText = '';
    document.querySelector('.professionOutput').innerText = '';
}

function displayPerson(person) {
    document.querySelector('.firstNameOutput').innerText = person.firstName;
    document.querySelector('.surnameOutput').innerText = person.surname;
    document.querySelector('.patronymicOutput').innerText = person.patronymic;
    document.querySelector('.genderOutput').innerText = person.gender;
    document.querySelector('.birthYearOutput').innerText = person.birthYear;
    document.querySelector('.birthDateOutput').innerText = person.birthDate;
    document.querySelector('.professionOutput').innerText = person.profession;
}