"use strict";
console.log("start");

//1. Напишите функцию deepEqual для проверки двух обьектов на идентичность. Пример:
console.log("******** task 1:");

console.log(deepEqual({ name: "test" }, { name: "test" })); // output true
console.log(deepEqual({ name: "test" }, { name: "test1" })); // output false
console.log(
  deepEqual(
    { name: "test", data: { value: 1 } },
    { name: "test", data: { value: 2 } }
  )
); // output false
console.log(deepEqual({ name: "test" }, { name: "test", age: 10 })); // false

//********** resolve:

function deepEqual(...objs) {
  // отримуємо всі аргументи за допомогою rest оператора
  const res = () => {
    // ф-ція результат для перебору об'єктів
    return (
      Object.keys({ ...objs[0], ...objs[1] })
        // виконуємо spread оператор для відбору всіх унікальних ключів отриманих об'єктів
        .every((k) => {
          if (typeof objs[0][k] === "object" || typeof objs[1][k] === "object")
            return deepEqual(objs[0][k], objs[1][k]);
          // якщо всередині значення-об'єкт, робимо рекурсію
          else return objs[0][k] === objs[1][k]; // проходимо по всім ключам обох об'єктів та порівнюємо кожне значення
        })
    );
  };
  return res(); // повертаємо результат - виконання ф-ції
}

//2. Напишите функцию генератор chunkArray, которая возвращает итератор возвращающий части массива указанной длинны.

//Пример:
console.log("******** task 2:");

const iterator = chunkArray([1, 2, 3, 4, 5, 6, 7, 8], 3);
console.log(iterator.next()); // { value: [1,2,3], done: false }
console.log(iterator.next()); // { value: [4,5,6], done: false }
console.log(iterator.next()); // { value: [7,8], done: false }
console.log(iterator.next()); // { value: undefined, done: true }

//********** resolve:

function* chunkArray(arr, p) {
  let i = 0; // створюємо змінну-помічника та присвоюємо значення первого індексу
  do {
    yield arr.slice(i, i + p); // повертаємо у поточний запит результат виклику
    i = i + p; // збільшуємо наступний індекс на заданий крок
  } while (i < arr.length); // цикл може продовжуватися поки змінна меньш ніж довжина масиву-аргуманта
}

//3. Напишите функцию обертку, которая на вход принимает массив функций и их параметров, а возвращает массив результатов их выполнения. Количество аргументов исполняемой функции не ограничено!

//Пример:

const f1 = (cb) => {
  cb(1);
};
const f2 = (a, cb) => {
  cb(a);
};
const f3 = (a, b, cb) => {
  setTimeout(() => cb([a, b]), 1000);
};

bulkRun([
  [f1, []],
  [f2, [2]],
  [f3, [3, 4]],
]).then(console.log);
// Output: [1, 2, [3, 4]]

//********** resolve:

async function bulkRun(arrData) {
  // ф-ція буде асинхронна згідно синтаксису завдання, приймає масив
  const res = []; // оголошуємо масив-результат
  function cb(data) {
    // ф-ція-вкладення
    res.push(data); // додаємо аргементи ф-ції, що буде результатом виконання
  }
  await arrData.forEach((f) => f[0](...f[1], cb)); // виконуємо кожну ф-цію із аргументами та вкладенням
  console.log("******** task 3:");
  return res; // повертаємо результат виконання
}

//4. Напишите метод arrayToObject, который превращает массив в объект (использовать рекурсию). Пример:

var arr = [
  ["name", "developer"],
  ["age", 5],
  [
    "skills",
    [
      ["html", 4],
      ["css", 5],
      ["js", 5],
    ],
  ],
];

//arrayToObject(arr); //*********temp */
// Outputs: {
// name: 'developer',
// age: 5,
// skills: {
// 	html: 4,
// 	css: 5,
// 	js: 5
// }

//********** resolve:
console.log("******** task 4:");

function arrayToObject(arr) {
  const ob = {}; // оголошуємо тимчасовий об'єкт-результат
  for (const item of arr) {
    // проходимо по всім елементам масиву
    if (typeof item[1] === "object") ob[item[0]] = arrayToObject(item[1]);
    // якщо другий елемент - масив, то виконуємо рекурсію
    else ob[item[0]] = item[1]; // інакше додаємо у об'єкт ключ та значення
  }
  return ob;
}

console.log(arrayToObject(arr));

//5. Написать обратный метод (см. задачу 4) objectToArray, который из объекта создаст массив. Пример:

objectToArray({
  name: "developer",
  age: 5,
  skills: {
    html: 4,
    css: 5,
    js: 5,
  },
});

// Outputs: [['name', 'developer'], ['age', 5], ['skills', [['html', 4], ['css', 5], ['js', 5]]]

//********** resolve:
console.log("******** task 5:");

function objectToArray(arr) {
  const res = []; // загальний масив-результат
  for (const i in arr) {
    // перебираємо об'єкт-аргумент по ключам

    if (typeof arr[i] === "object") res.push([i, [...objectToArray(arr[i])]]);
    // якщо друге значення об'єкт, то робимо рекурсію
    else res.push([...[i, arr[i]]]); // чи додаємо новий масив до загального масиву
  }
  return res;
}

console.log(
  objectToArray({
    name: "developer",
    age: 5,
    skills: {
      html: 4,
      css: 5,
      js: 5,
    },
  })
);

//6. Есть функция primitiveMultiply, которая умножает числа, но случайным образом может выбрасывать исключения типа: NotificationException, ErrorException. Задача написать функцию обертку которая будет повторять вычисление при исключении NotificationException, но прекращать работу при исключениях ErrorException

//Пример:
console.log("******** task 6:");

function NotificationException() {}
function ErrorException() {}
function primitiveMultiply(a, b) {
  const rand = Math.random();
  //   console.log("rand:", rand);
  if (rand < 0.5) {
    return a * b;
  } else if (rand > 0.85) {
    throw new ErrorException();
  } else {
    throw new NotificationException();
  }
}

function reliableMultiply(a, b) {
  // Ваш код
  try {
    return primitiveMultiply(a, b); // спроба запустити ф-цію, якко ОК - повертає результат
  } catch (err) {
    if (err.constructor.name === "NotificationException") {
      // обробка помилки за ім'ям ф-ції
      console.log("repeat operation"); // сповіщення події
      return reliableMultiply(a, b); // повторне виконання ф-ції множення
    }
    if (err.constructor.name === "ErrorException") {
      console.log("break operation");
      return false;
    }
    return err; // якщо інша помилка, повертаємо її
  }
}

console.log(reliableMultiply(8, 8));

//7.  Напишите функцию, которая берет объект любой вложенности и преобразует ее в единую плоскую карту с разными уровнями, разделенными косой чертой ( '/').

//Пример:
console.log("******** task 7:");

const obj = {
  a: {
    b: {
      c: 12,
      d: "Hello World",
    },
    e: [1, 2, 3],
  },
};

console.log(mapObject(obj));
// mapObject(demoData);
// Outputs: {
//   'a/b/c': 12,
//   'a/b/d': 'Hello World',
//   'a/e': [1,2,3]
// }

//********** resolve:
function mapObject(arr) {
  const res = []; // оголошуємо масив-результат
  objObserv(arr); // перший запуск ф-ції для оплацювання кожного об'єкту
  function objObserv(arrItem, endPath = []) {
    // ф-ція для оплацювання кожного об'єкту, аргум об'єкт та шлях
    for (const key in arrItem) {
      // проходимо по ключах поточного об'єкту
      if (Object.prototype.toString.call(arrItem[key]) !== "[object Object]") {
        // перевірка чи є ключі зі значенням без вкладень
        endPath.push(key); // додаємо черговий ключ до шляху
        res[endPath.join("/")] = arrItem[key]; // створюємо елемент об'єкту-результату та об'єднуємо шлях
        endPath.pop(); // видаляємо кінцеве значення шляху
      }
    }
    for (const key in arrItem) {
      // знов проходимося по ключах поточного об'єкту, шукаємо вкладення
      if (Object.prototype.toString.call(arrItem[key]) === "[object Object]") {
        endPath.push(key); // додаємо поточний ключ до шляху
        objObserv(arrItem[key], endPath); // якщо знайдено вкладений об'єкт, запускаємо рекурсію та передаємо об'єкт та шлях
        endPath.pop(); // видаляємо кінцеве значення шляху після виконання ф-ції
      }
    }
  }
  return res; // повертаємо об'єкт-результат
}

//8. Напишите функцию combos, которая принимает положительное целое число num и возвращает массив массивов положительных целых чисел, где сумма каждого массива равна  num.  Массивы не должны повторяться.

//Пример:
console.log("******** task 8:");

combos(3);
// Output:
// [
//   [ 3 ],
//   [ 1, 1, 1 ],
//   [ 1, 2 ]
// ]

combos(10);
// Output:
// [
//   [ 10 ],
//   [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
//   [ 1, 1, 1, 1, 1, 1, 1, 1, 2 ],
//   [ 1, 1, 1, 1, 1, 1, 1, 3 ],
//   [ 1, 1, 1, 1, 1, 1, 4 ],
//   [ 1, 1, 1, 1, 1, 5 ],
//   [ 1, 1, 1, 1, 6 ],
//   [ 1, 1, 1, 7 ],
//   [ 1, 1, 8 ],
//   [ 1, 9 ],
//   [ 1, 1, 1, 1, 1, 1, 2, 2 ],
//   [ 1, 1, 1, 1, 1, 2, 3 ],
//   [ 1, 1, 1, 1, 2, 4 ],
//   [ 1, 1, 1, 1, 2, 2, 2 ],
//   [ 1, 1, 1, 1, 3, 3 ],
//   [ 1, 1, 1, 2, 5 ],
//   [ 1, 1, 1, 2, 2, 3 ],
//   [ 1, 1, 1, 3, 4 ],
//   [ 1, 1, 2, 6 ],
//   [ 1, 1, 2, 2, 4 ],
//   [ 1, 1, 2, 2, 2, 2 ],
//   [ 1, 1, 2, 3, 3 ],
//   [ 1, 1, 3, 5 ],
//   [ 1, 1, 4, 4 ],
//   [ 1, 2, 7 ],
//   [ 1, 2, 2, 5 ],
//   [ 1, 2, 2, 2, 3 ],
//   [ 1, 2, 3, 4 ],
//   [ 1, 3, 6 ],
//   [ 1, 3, 3, 3 ],
//   [ 1, 4, 5 ],
//   [ 2, 8 ],
//   [ 2, 2, 6 ],
//   [ 2, 2, 2, 4 ],
//   [ 2, 2, 2, 2, 2 ],
//   [ 2, 2, 3, 3 ],
//   [ 2, 3, 5 ],
//   [ 2, 4, 4 ],
//   [ 3, 7 ],
//   [ 3, 3, 4 ],
//   [ 4, 6 ],
//   [ 5, 5 ]
// ]

//********** resolve:

function combos(num) {
  if (typeof num !== "number") return; // перевірка на тип число вхідного аргументу
  const tempArr = []; // тимчасовий масив для кожного вкладеного масиву
  const res = []; // ініціалізуємо масив результат
  for (let i = 0; i < num; ++i) tempArr.push(1); // перший масив всі 1

  while (tempArr[0] != num) {
    // виконуємо код поки не залишиться тільки 1 елемент
    let min = tempArr[0]; // задаємо початкове мін значення
    let minInd = 0; // задаємо індекс першого елементу, який поки мінімальний
    let sum = tempArr[0]; // початкова сума тільки перший елемент
    let tempSum = tempArr[0];
    res.push([...tempArr]); // додаємо черговий масив у масив-результат
    for (let j = 1; j < tempArr.length - 1; ++j) {
      tempSum += tempArr[j]; // до тимчасової суми додаємо наступний елемент
      if (min > tempArr[j]) {
        // рахуємо мінімальний поточний елемент
        min = tempArr[j];
        minInd = j;
        sum = tempSum;
      }
    }
    tempArr[minInd] += 1; // додаємо до поточного елементу 1
    sum += 1;
    tempArr.splice(minInd + 1); // видаляємо зайву частину масиву після поточного

    for (let k = 0; k < num - sum; ++k) tempArr.push(1); // заповнюємо 1 масив після поточного значення
  }
  res.push([...[num]]); // додаємо останній елемент - перший елемент що залишився

  console.log(res); // виводимо для контролю
  return res; // повертаємо масив-результат
}

//9.  Напишите функцию add, которая бы работала следующим образом add(1)(2)(7)...(n). Количество последовательных визовов неограничено.

//********** resolve:

function add(arg) {
  // ф-ція що буде  виконуватися раз з першим аргументом
  if (typeof arg != "number") return; // припиняємо якщо аргумент не число
  let total = arg; // задаємо початкове значення області видимості add
  function sum(num) {
    // ця ф-ція буде виконуватися з кожним викликом add та виконувати додавання наступного значення
    total += num;
    return sum; // повертаємо ф-цію без її виклику
  }
  sum.valueOf = () => total; // повертаємо тип результату як число
  return sum;
}

//Пример:

Number(add(1)(2)); // == 3
Number(add(1)(2)(5)); // == 8
Number(add(1)(2)(-3)(4)); //  == 4
Number(add(1)(2)(3)(4)(-5)); // == 5

console.log("******** task 9:");
console.log(Number(add(1)(2)(-3)(4))); // вивід у консоль для перевірки
