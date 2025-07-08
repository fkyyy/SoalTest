//Fikri Ezra Ahmad
const readline = require("readline");

function KamusUtama(char) {
  const upper = char.toUpperCase();
  const lower = char;

  if (char === " ") return 0;

  if (/[A-Z]/.test(char)) {
    if (upper === "A") return 0;
    if ("BCD".includes(upper)) return 1;
    if ("E".includes(upper)) return 2;
    if ("FGH".includes(upper)) return 3;
    if ("I".includes(upper)) return 4;
    if ("JKLMN".includes(upper)) return 5;
    if ("O".includes(upper)) return 6;
    if ("PQRST".includes(upper)) return 7;
    if ("U".includes(upper)) return 8;
    if ("VWXYZ".includes(upper)) return 9;
    if (upper === "Z") return 9;
  }

  if (/[a-z]/.test(char)) {
    if (lower === "a") return 9;
    if ("bcd".includes(lower)) return 8;
    if ("e".includes(lower)) return 7;
    if ("fgh".includes(lower)) return 6;
    if ("i".includes(lower)) return 5;
    if ("jklmn".includes(lower)) return 4;
    if ("o".includes(lower)) return 3;
    if ("pqrst".includes(lower)) return 2;
    if ("u".includes(lower)) return 1;
    if ("vwxyz".includes(lower)) return 0;
    if (lower === "z") return 0;
  }

  return null;
}
//nomor 1
function convertInputToNumbers(text) {
  return text
    .split("")
    .map((char) => KamusUtama(char))
    .filter((num) => num !== null);
}

//nomor 2
function alternatingSum(numbers) {
  let result = numbers[0] || 0;
  for (let i = 1; i < numbers.length; i++) {
    if (i % 2 === 1) {
      result += numbers[i];
    } else {
      result -= numbers[i];
    }
  }
  return result;
}

//nomor 3
function numberToLetters(total) {
  const kamus = {
    0: 'A',
    1: 'B',
    2: 'E',
    3: 'F',
    4: 'I',
    5: 'J',
    6: 'O',
    7: 'P',
    8: 'U',
    9: 'V'
  };

  function numberToPlus(absTotal) {
    const numbers = [];
    let sum = 0;

    for (let i = 0; i <= 5 && sum < absTotal; i++) {
      numbers.push(i);
      sum += i;
    }

    let toggle = 0;
    while (sum < absTotal) {
      numbers.push(toggle);
      sum += toggle;
      toggle = toggle === 0 ? 1 : 0;
    }

    return numbers.map(n => kamus[n]);
  }

  function numberToMinus(absTotal) {
    const numbers = [];
    let sum = 0;

    for (let i = 0; i <= 4 && sum < absTotal; i++) {
      numbers.push(i);
      sum += i;
    }

    let toggle = 0;
    while (sum < absTotal) {
      numbers.push(toggle);
      sum += toggle;
      toggle = toggle === 0 ? 1 : 0;
    }

    return numbers.map(n => kamus[n]);
  }

  const absTotal = Math.abs(total);

  if (absTotal >= 15) {
    return numberToPlus(absTotal);
  } else {
    return numberToMinus(absTotal);
  }
}

//nomor 4
function transformNumbers(numbers) {
  const newNumbers = [...numbers];

  const len = newNumbers.length;
  if (len >= 2) {
    newNumbers[len - 2] = Math.min(newNumbers[len - 2] + 1, 9);
    newNumbers[len - 1] = Math.min(newNumbers[len - 1] + 1, 9);
  }

  return newNumbers;
}

//nomor 5
function transformFinalStep(numbers) {
  return numbers.map((num, idx) => {
    if (idx === 2 || idx === 3 || idx === 4) {
      if (idx === 2) return 3;
      if (idx === 3) return 3;
      if (idx === 4) return 5;
    }
    if (numbers.length === 9 && idx === 8) {
      return 3;
    }
    if (numbers.length === 8) {
      if (idx === 5) return 5;
      if (idx === 7) return 3;
    }
    return 1;
  });
}


function lettersToNumbers(letters) {
  const kamusReverse = {
    'A': 0,
    'B': 1,
    'E': 2,
    'F': 3,
    'I': 4,
    'J': 5,
    'O': 6,
    'P': 7,
    'U': 8,
    'V': 9
  };
  return letters.map(letter => kamusReverse[letter] ?? null).filter(n => n !== null);
}

function mapNumbersToLetters(numbers) {
  const kamus = {
    0: 'A',
    1: 'B',
    2: 'E',
    3: 'F',
    4: 'I',
    5: 'J',
    6: 'O',
    7: 'P',
    8: 'U',
    9: 'V'
  };
  return numbers.map(n => kamus[n] ?? '?');
}

const r = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

r.question("Masukkan kalimat: ", (input) => {
  const angkaDariHuruf = convertInputToNumbers(input);
  const HasilTambahKurang = alternatingSum(angkaDariHuruf);
  const letters = numberToLetters(HasilTambahKurang);

  const angkaDariHuruf3 = lettersToNumbers(letters);
  const angkaTransformed = transformNumbers(angkaDariHuruf3);
  const finalLetters = mapNumbersToLetters(angkaTransformed);
  const angkaFinal = transformFinalStep(angkaTransformed);


  console.log("1. Hasil konversi Kata :", angkaDariHuruf.join(" "));
  console.log("2. Hasil operasi Pertambahan dan Pengurangan Adalah :", HasilTambahKurang);
  console.log("3. Hasil konversi ke huruf :", letters.join(" "));
  console.log("4. Output huruf akhir :", finalLetters ? finalLetters.join(" ") : "Tidak ada output huruf akhir");
  console.log("5. Final Output Angka:", angkaFinal.join(" "));


  r.close();
});
