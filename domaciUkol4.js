// počet zaměstnanců
// počet zaměstnanců podle výše úvazku (10, 20, 30 a 40h/týdně)
// ----
// průměrný věk (zaokrouhleno na jedno desetinné místo)
// minimální věk (nejmladší zaměstnanec)
// maximální věk (nejstarší zaměstnanec)
// medián věku
//-------------
// medián výše úvazku
// průměrnou výši úvazku v rámci žen
// seznam zaměstanců setříděných dle výše úvazku od nejmenšího po největší
//--------
// Váš program bude obsahovat funkci main s jedním argumentem, který bude obsahovat vstupní data dtoIn.
// V rámci funkce main byste měli volat funkci generateEmployeeData s dtoIn, která zajistí vygenerování seznamu a pak funkci getEmployeeStatistics, která zajistí zjištění potřebných hodnot ze seznamu zaměstnanců. Funkce main bude vracet výstupní data dtoOut.

//Sample data
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

//Vstupní data
const dtoIn = {
  count: 50,
  age: {
    min: 18,
    max: 65,
  },
};
const currentDate = new Date();

//Funkce pro výpočet data narození
const getBirthDate = (min, max) => {
  const minYear = currentDate.getFullYear() - min;
  const maxYear = currentDate.getFullYear() - max;

  const randomYear =
    Math.floor(Math.random() * (maxYear - minYear - 1)) + minYear + 1;
  const randomMonth = Math.floor(Math.random() * 12);
  const randomDay = Math.floor(Math.random() * 31) + 1;

  return new Date(randomYear, randomMonth, randomDay).toISOString();
};

//Funkce pro generování náhodného pohlaví
const getGender = () => {
  const genders = ["male", "female"];
  const randomIndex = Math.floor(Math.random() * genders.length);
  return genders[randomIndex];
};

//Funkce pro generování jména podle pohlaví
const getName = (gender, type) => {
  const firstNameIndex =
    gender === "male"
      ? Math.floor(Math.random() * maleNames.length)
      : Math.floor(Math.random() * femaleNames.length);

  return gender === "male"
    ? maleNames[firstNameIndex][type]
    : femaleNames[firstNameIndex][type];
};

//Funkce pro generování náhodného pracovního úvazku
const getWorkload = () => {
  const numbers = [10, 20, 30, 40];
  const randomIndex = Math.floor(Math.random() * numbers.length);
  return numbers[randomIndex];
};

const getMedian = (array) => {
  array.sort((a, b) => a - b);
  const midValue = Math.floor(array.length / 2);

  return array.length % 2 !== 0
    ? array[midValue]
    : (array[midValue - 1] + array[midValue]) / 2;
};

const generateEmployeeData = (dtoIn) => {
  const employeeList = [];

  for (let i = 1; i < dtoIn.count + 1; i++) {
    const newEmployee = {
      gender: getGender(),
      birthDate: getBirthDate(dtoIn.age.min, dtoIn.age.max),
      name: "",
      surname: "",
      workload: getWorkload(),
    };
    //Zjištění jména podle pohlaví
    newEmployee.name = getName(newEmployee.gender, "firstName");
    newEmployee.surname = getName(newEmployee.gender, "surname");
    employeeList.push(newEmployee);
  }
  return employeeList;
};

const getEmployeeStatistics = (data) => {
  let minAge = 0,
    maxAge = 0,
    averageAge = 0,
    medianAge = 0,
    medianWorkload = 0,
    averageWomenWorkload = 0,
    ageSum = 0,
    workloadWomanSum = 0,
    womanCount = 0,
    workloadsCount = { 10: 0, 20: 0, 30: 0, 40: 0 };

  const medianAgeArray = [],
    medianWorkloadArray = [];

    data.forEach((employee, i) => {
    const employeeAge = currentDate.getFullYear() - Number(employee.birthDate.substring(0, 4));

    medianAgeArray.push(employeeAge);
    medianWorkloadArray.push(employee.workload);

    if (employee.gender === "female") {
      workloadWomanSum += employee.workload;
      womanCount += 1;
    }

    if (i === 0 || minAge > employeeAge) minAge = employeeAge;
    if (i === 0 || maxAge < employeeAge) maxAge = employeeAge;

    ageSum += employeeAge;

    if (i === data.length - 1) {
      averageAge = Math.floor((ageSum / data.length) * 10) / 10;
      averageWomenWorkload = Math.floor(workloadWomanSum / womanCount);
    }

    workloadsCount[employee.workload] += 1;
  });

  medianAge = getMedian(medianAgeArray);
  medianWorkload = getMedian(medianWorkloadArray);

  //Sum up age of every employee in the array. Then get average, min and max.
  return {
    workload10: workloadsCount[10],
    workload20: workloadsCount[20],
    workload30: workloadsCount[30],
    workload40: workloadsCount[40],
    averageAge,
    minAge,
    maxAge,
    medianAge,
    medianWorkload,
    averageWomenWorkload,
    sortedByWorkload: data.sort((a,b)=> a.workload - b.workload)
  };
};

//Hlavni funkce, která přijímá vstupní data dtoIn a vrací pole zaměstnanců dtoOut
const main = () => {
  const dtoOut = {
    total: dtoIn.count,
    workload10: null,
    workload20: null,
    workload30: null,
    workload40: null,
    averageAge: null,
    minAge: null,
    maxAge: null,
    medianAge: null,
    medianWorkload: null,
    averageWomenWorkload: null,
    sortedByWorkload: null,
  };

  const data = generateEmployeeData(dtoIn);

  const employeeStatistics = getEmployeeStatistics(data);

 Object.assign(dtoOut, employeeStatistics)

  return dtoOut;
};

//Zavolání a vylogování výsledků
console.log(main(dtoIn));
