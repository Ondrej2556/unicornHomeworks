/** 
 * Navrhněte a vytvořte v programovacím jazyce JavaScript program, který naváže na Nedostatečné oprávnění - 
 * generování seznam zaměstnanců firmy. Rozšiřte váš program tak, že na základě vygenerovaného seznamu zjistíte nejčastější 
 * křestní jména v rámci: 
 *  všech zaměstnanců
    žen
    mužů
    žen na zkrácený úvazek (tj. 10, 20 či 30h/týdně)
    mužů na plný pracovní úvazek (tj. 40h/týdně)
Váš program bude obsahovat funkci main s jedním argumentem, který bude obsahovat vstupní data dtoIn. 
V rámci funkce main byste měli volat funkci generateEmployeeData, která zajistí vygenerování seznamu a 
pak funkci getEmployeeChartContent, která zajistí zjištění potřebných hodnot ze seznamu zaměstnanců. 
Funkce main bude vracet výstupní data dtoOut.
 */

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
  count: 40,
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
  const nameIndex =
    gender === "male"
      ? Math.floor(Math.random() * maleNames.length)
      : Math.floor(Math.random() * femaleNames.length);

  return gender === "male"
    ? maleNames[nameIndex][type]
    : femaleNames[nameIndex][type];
};

//Funkce pro generování náhodného pracovního úvazku
const getWorkload = () => {
  const numbers = [10, 20, 30, 40];
  const randomIndex = Math.floor(Math.random() * numbers.length);
  return numbers[randomIndex];
};

//Funkce pro setřízení obejktu chartData
const sortChartDataByValue = (chartDataObject) => {
  const sortedChartDataByValue = {};
  Object.keys(chartDataObject).forEach((data) => {
    sortedChartDataByValue[data] = chartDataObject[data].sort(
      (a, b) => Number(b.value) - Number(a.value)
    );
  });
  return sortedChartDataByValue;
};

//Funkce pro generování seznamu zaměstnanců
const generateEmployeeData = (dtoIn) => {
  const employeeList = [];

  for (let i = 1; i < dtoIn.count + 1; i++) {
    const newEmployee = {
      gender: getGender(),
      birthdate: getBirthDate(dtoIn.age.min, dtoIn.age.max),
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

//Funkce pro generování statistik jmen
const getEmployeeChartContent = (data) => {
  const names = {
    all: {},
    male: {},
    female: {},
    femalePartTime: {},
    maleFullTime: {},
  };

  const chartData = {
    all: [],
    male: [],
    female: [],
    femalePartTime: [],
    maleFullTime: [],
  };
  data.forEach((emp) => {
    names.all[emp.name] = (names.all[emp.name] || 0) + 1;

    emp.gender === "male"
      ? (names.male[emp.name] = (names.male[emp.name] || 0) + 1)
      : (names.female[emp.name] = (names.female[emp.name] || 0) + 1);
    emp.gender === "female" && emp.workload !== 40 &&
      (names.femalePartTime[emp.name] = (names.femalePartTime[emp.name] || 0) + 1);
    emp.gender === "male" && emp.workload === 40 &&
      (names.maleFullTime[emp.name] = (names.maleFullTime[emp.name] || 0) + 1);
  });

  for (const [key, value] of Object.entries(names.all)) {
    chartData.all.push({ label: `${key}`, value: `${value}` });
  }
  for (const [key, value] of Object.entries(names.male)) {
    chartData.male.push({ label: `${key}`, value: `${value}` });
  }
  for (const [key, value] of Object.entries(names.female)) {
    chartData.female.push({ label: `${key}`, value: `${value}` });
  }
  for (const [key, value] of Object.entries(names.femalePartTime)) {
    chartData.femalePartTime.push({ label: `${key}`, value: `${value}` });
  }
  for (const [key, value] of Object.entries(names.maleFullTime)) {
    chartData.maleFullTime.push({ label: `${key}`, value: `${value}` });
  }

  Object.keys(chartData).forEach((data) => {
    chartData[data] = chartData[data].sort(
      (a, b) => Number(b.value) - Number(a.value)
    );
  });

  return { names, chartData };
};

//Hlavni funkce, která přijímá vstupní data dtoIn a vrací pole zaměstnanců dtoOut
const main = (dtoIn) => {
  const dtoOut = {
    names: {
      all: {},
      male: {},
      female: {},
      femalePartTime: {},
      maleFullTime: {},
    },
    chartData: {
      all: [],
      male: [],
      female: [],
      femalePartTime: [],
      maleFullTime: [],
    },
  };

  //Generates list of employees
  const data = generateEmployeeData(dtoIn);

  const { names, chartData } = getEmployeeChartContent(data);

  Object.assign(dtoOut.names, names);
  Object.assign(dtoOut.chartData, chartData);
  return dtoOut;
};

//Zavolání a vylogování výsledků
console.log(main(dtoIn));
