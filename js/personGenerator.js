const personGenerator = {
    surnameJson: `{  
        "count": 16,
        "list": {
            "id_1": "Иванов",
            "id_2": "Смирнов",
            "id_3": "Кузнецов",
            "id_4": "Васильев",
            "id_5": "Петров",
            "id_6": "Михайлов",
            "id_7": "Новиков",
            "id_8": "Федоров",
            "id_9": "Кравцов",
            "id_10": "Николаев",
            "id_11": "Семёнов",
            "id_12": "Славин",
            "id_13": "Степанов",
            "id_14": "Павлов",
            "id_15": "Александров",
            "id_16": "Морозов"
        }
    }`,
    firstNameMaleJson: `{
        "count": 10,
        "list": {     
            "id_1": "Александр",
            "id_2": "Максим",
            "id_3": "Иван",
            "id_4": "Артем",
            "id_5": "Дмитрий",
            "id_6": "Никита",
            "id_7": "Михаил",
            "id_8": "Даниил",
            "id_9": "Егор",
            "id_10": "Андрей"
        }
    }`,
    firstNameFemaleJson: `{
        "count": 10,
        "list": {     
            "id_1": "Анна",
            "id_2": "Мария",
            "id_3": "Елена",
            "id_4": "Дарья",
            "id_5": "Екатерина",
            "id_6": "Ольга",
            "id_7": "Наталья",
            "id_8": "Алина",
            "id_9": "Татьяна",
            "id_10": "Светлана"
        }
    }`,
    professionJson: `{
        "count": 10,
        "list": {
            "id_1": "Инженер",
            "id_2": "Доктор",
            "id_3": "Учитель",
            "id_4": "Программист",
            "id_5": "Дизайнер",
            "id_6": "Менеджер",
            "id_7": "Адвокат",
            "id_8": "Шахтёр",
            "id_9": "Солдат",
            "id_10": "Слесарь"
        }
    }`,
    GENDER_MALE: 'Мужчина',
    GENDER_FEMALE: 'Женщина',
    randomIntNumber: (max = 1, min = 0) => Math.floor(Math.random() * (max - min + 1) + min),
    randomValue: function(json) {
        const obj = JSON.parse(json);
        const keys = Object.keys(obj.list);
        const randomKey = keys[Math.floor(Math.random() * keys.length)];
        return obj.list[randomKey];
    },
    randomFirstName: function(gender) {
        return gender === this.GENDER_MALE ? this.randomValue(this.firstNameMaleJson) : this.randomValue(this.firstNameFemaleJson);
    },
    randomSurname: function(gender) {
        let surname = this.randomValue(this.surnameJson);
        return gender === this.GENDER_FEMALE ? surname + 'а' : surname;
    },
    randomProfession: function(gender) {
        const profession = this.randomValue(this.professionJson);
    
        const maleProfessions = ["Слесарь", "Солдат", "Шахтёр", "Программист"];
    
        if (gender === this.GENDER_FEMALE && maleProfessions.includes(profession)) {
            return this.randomProfession(gender);
        } else {
            return profession;
        }
    },
    randomGender: function() {
        return this.randomIntNumber(1, 0) === 0 ? this.GENDER_MALE : this.GENDER_FEMALE;
    },
    randomBirthYear: function(min, max) {
        return this.randomIntNumber(max, min);
    },
    randomBirthDate: function() {
        const monthDays = {
            "января": 31, "февраля": 28, "марта": 31, "апреля": 30, "мая": 31, "июня": 30,
            "июля": 31, "августа": 31, "сентября": 30, "октября": 31, "ноября": 30, "декабря": 31
        };
        const months = Object.keys(monthDays);
        const month = months[this.randomIntNumber(months.length - 1, 0)];
        const day = this.randomIntNumber(monthDays[month], 1);
        return `${day} ${month}`;
    },
    generatePatronymicFromFirstName: function(firstName) {
        if (firstName.endsWith('й') || firstName.endsWith('ь')) {
            return firstName.slice(0, -1) + 'евич';
        } else if (firstName.endsWith('а') || firstName.endsWith('я')) {
            return firstName.slice(0, -1) + 'ич';
        } else {
            return firstName + 'ович';
        }
    },
    randomPatronymic: function(gender) {
        const firstName = this.randomValue(this.firstNameMaleJson);
        let patronymic = this.generatePatronymicFromFirstName(firstName);
        
        if (gender === this.GENDER_FEMALE) {
            if (this.person.surname.endsWith('ва') || this.person.surname.endsWith('на')) {
                if (patronymic.endsWith('ич')) {
                    return patronymic.slice(0, -2) + 'на';
                } else {
                    return patronymic + 'а';
                }
            } else {
                if (patronymic.endsWith('ич')) {
                    return patronymic.slice(0, -2) + 'а';
                } else {
                    return patronymic;
                }
            }
        } else {
            return patronymic;
        }
    },                     
    getPerson: function() {
        this.person = {};
        this.person.gender = this.randomGender();
        this.person.firstName = this.randomFirstName(this.person.gender);
        this.person.surname = this.randomSurname(this.person.gender);
        this.person.birthYear = this.randomBirthYear(1950, 2000);
        this.person.birthDate = this.randomBirthDate();
        this.person.profession = this.randomProfession(this.person.gender);
        this.person.patronymic = this.randomPatronymic(this.person.gender);
        return this.person;
    },
    resetPerson: function() {
        return this.getPerson();
    }
};                  