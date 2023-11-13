const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function binarniNaDesitkovou(binarniCislo) {
  //Validace vstupů
  const platneZnaky = /^[01]+$/;
  if (!platneZnaky.test(binarniCislo)) {
    throw new Error("Neplatný vstup. Použijte pouze 0 a 1.");
  }

  //Proměnná pro výsledek
  let desitkoveCislo = 0;

  //Převrácení čísla
  binarniCislo = binarniCislo.split("").reverse();

  //Iterace a převod
  for (let i = 0; i < binarniCislo.length; i++) {
    if (binarniCislo[i] === "1") {
      desitkoveCislo += Math.pow(2, i);
    }
  }

  return desitkoveCislo;
}

rl.question("Zadejte binární číslo bez mezer: ", (binarniCislo) => {
  try {
    //Volání funkce pro převod s parametrem binární číslo
    const desitkoveCislo = binarniNaDesitkovou(binarniCislo);
    //Výpis
    console.log(`Binární: ${binarniCislo} -> Desítková: ${desitkoveCislo}`);
  } catch (error) {
    console.error(error.message);
  }

  rl.close();
});
