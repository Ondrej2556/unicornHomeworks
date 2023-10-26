const maleNames = [
  { firstName: "Jan", surname: "Kovář" },
  { firstName: "Petr", surname: "Svoboda" },
  { firstName: "Jiří", surname: "Němec" },
  { firstName: "Tomáš", surname: "Procházka" },
  { firstName: "Josef", surname: "Dvořák" },
  { firstName: "Miroslav", surname: "Černý" },
  { firstName: "Milan", surname: "Veselý" },
  { firstName: "František", surname: "Beneš" },
  { firstName: "Václav", surname: "Novotný" },
  { firstName: "David", surname: "Horák" },
  { firstName: "Marek", surname: "Sedláček" },
  { firstName: "Lukáš", surname: "Kučera" },
  { firstName: "Martin", surname: "Růžička" },
  { firstName: "Jaroslav", surname: "Hájek" },
  { firstName: "Michal", surname: "Malý" },
  { firstName: "Radek", surname: "Král" },
  { firstName: "Zdeněk", surname: "Bartoš" },
  { firstName: "Ondřej", surname: "Urban" },
  { firstName: "Jakub", surname: "Pospíšil" },
  { firstName: "Pavel", surname: "Kříž" },
  { firstName: "Robert", surname: "Šimek" },
  { firstName: "Luboš", surname: "Kopecký" },
  { firstName: "Stanislav", surname: "Pavlík" },
  { firstName: "Patrik", surname: "Holub" },
  { firstName: "Filip", surname: "Černý" },
  { firstName: "Marek", surname: "Richter" },
];
const femaleNames = [
  { firstName: "Jana", surname: "Kovářová" },
  { firstName: "Eva", surname: "Svobodová" },
  { firstName: "Marie", surname: "Němcová" },
  { firstName: "Anna", surname: "Procházková" },
  { firstName: "Hana", surname: "Dvořáková" },
  { firstName: "Lenka", surname: "Černá" },
  { firstName: "Lucie", surname: "Veselá" },
  { firstName: "Petra", surname: "Benešová" },
  { firstName: "Alena", surname: "Novotná" },
  { firstName: "Kateřina", surname: "Horáčková" },
  { firstName: "Ivana", surname: "Malá" },
  { firstName: "Markéta", surname: "Kratochvílová" },
  { firstName: "Veronika", surname: "Pospíšilová" },
  { firstName: "Barbora", surname: "Růžičková" },
  { firstName: "Andrea", surname: "Malá" },
  { firstName: "Martina", surname: "Kučerová" },
  { firstName: "Monika", surname: "Hájková" },
  { firstName: "Tereza", surname: "Urbanová" },
  { firstName: "Karolína", surname: "Pavlíková" },
  { firstName: "Simona", surname: "Holubová" },
  { firstName: "Zuzana", surname: "Černá" },
  { firstName: "Nikola", surname: "Richterová" },
  { firstName: "Adéla", surname: "Novotná" },
  { firstName: "Marta", surname: "Nováková" },
];

const dtoIn = {
  count: 50,
  age: {
    min: 18,
    max: 65,
  },
};

const getBirthDate = (min, max) => {
  const currentDate = new Date();

  const minYear = currentDate.getFullYear() - min;
  const maxYear = currentDate.getFullYear() - max;

  const randomYear = Math.floor(Math.random() * (maxYear - minYear + 1)) + minYear;
  const randomMonth = Math.floor(Math.random() * 12);
  const randomDay = Math.floor(Math.random() * 31) + 1;

  return new Date(randomYear, randomMonth, randomDay).toISOString();
};

const getGender = () => {
  const genders = ["male", "female"];
  const randomIndex = Math.floor(Math.random() * genders.length);
  return genders[randomIndex];
};

const getName = (gender, type) => {
  const firstNameIndex =
    gender === "male"
      ? Math.floor(Math.random() * maleNames.length)
      : Math.floor(Math.random() * femaleNames.length);

  return gender === "male"
    ? maleNames[firstNameIndex][type]
    : femaleNames[firstNameIndex][type];
};

const getWorkload = () => {
  const numbers = [10, 20, 30, 40];
  const randomIndex = Math.floor(Math.random() * numbers.length);
  return numbers[randomIndex];
};

const main = (dtoIn) => {
  const dtoOut = [];

  for (let i = 1; i < dtoIn.count + 1; i++) {
    const newEmployee = {
      gender: getGender(),
      birthDate: getBirthDate(dtoIn.age.min, dtoIn.age.max),
      name: "",
      surname: "",
      workload: getWorkload(),
    };
    newEmployee.name = getName(newEmployee.gender, "firstName");
    newEmployee.surname = getName(newEmployee.gender, "surname");
    dtoOut.push(newEmployee);
  } 

  return dtoOut;
};

console.log(main(dtoIn));
