console.log("start");

//1. Напишите функцию deepEqual для проверки двух обьектов на идентичность. Пример:

deepEqual({ name: "test" }, { name: "test" }); // output true
deepEqual({ name: "test" }, { name: "test1" }); // output false
deepEqual(
  { name: "test", data: { value: 1 } },
  { name: "test", data: { value: 2 } }
); // output false
deepEqual({ name: "test" }, { name: "test", age: 10 }); // false

//********** resolve:

function deepEqual(...args) {
  if (Object.keys(args[0]).length !== Object.keys(args[1]).length) {
    console.log(false);
    return false; // завершуємо якщо довжина об'єктів різна
  }
}

//2. Напишите функцию генератор chunkArray, которая возвращает итератор возвращающий части массива указанной длинны.

//Пример:

const iterator = chunkArray([1, 2, 3, 4, 5, 6, 7, 8], 3);
console.log(iterator.next()); // { value: [1,2,3], done: false }
console.log(iterator.next()); // { value: [4,5,6], done: false }
console.log(iterator.next()); // { value: [7,8], done: false }
console.log(iterator.next()); // { value: undefined, done: true }

//********** resolve:

function* chunkArray(arr, p) {
  let i = 0; // створюємо змінну-помічника та присвоюємо значення первого індексу
  do {
    yield arr.slice(i, i + p); // повертаємо у поточний результат виклику
    i = i + p; // збільшуємо наступний індекс на крок
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

bulkRun([[f1, []], [f2, [2]][(f3, [3, 4])]]).then(console.log);
// Output: [1, 2, [3, 4]]

//********** resolve:

async function bulkRun(arg) {
  return await arg;
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

arrayToObject(arr);
// Outputs: {
// name: 'developer',
// age: 5,
// skills: {
// 	html: 4,
// 	css: 5,
// 	js: 5
// }

//********** resolve:
function arrayToObject(arr) {
  return arr;
}

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
function objectToArray(arr) {
  return arr;
}

//6. Есть функция primitiveMultiply, которая умножает числа, но случайным образом может выбрасывать исключения типа: NotificationException, ErrorException. Задача написать функцию обертку которая будет повторять вычисление при исключении NotificationException, но прекращать работу при исключениях ErrorException

//Пример:

function NotificationException() {}
function ErrorException() {}
function primitiveMultiply(a, b) {
  const rand = Math.random();
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
}

console.log(reliableMultiply(8, 8));

//7.  Напишите функцию, которая берет объект любой вложенности и преобразует ее в единую плоскую карту с разными уровнями, разделенными косой чертой ( '/').

//Пример:

const obj = {
  a: {
    b: {
      c: 12,
      d: "Hello World",
    },
    e: [1, 2, 3],
  },
};

let demoData = 0; //temporary
mapObject(demoData);
// Outputs: {
//   'a/b/c': 12,
//   'a/b/d': 'Hello World',
//   'a/e': [1,2,3]
// }

//********** resolve:
function mapObject(arr) {
  return arr;
}

//8. Напишите функцию combos, которая принимает положительное целое число num и возвращает массив массивов положительных целых чисел, где сумма каждого массива равна  num.  Массивы не должны повторяться.

//Пример:

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
function combos(arr) {
  return arr;
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

console.log("task 9: ", Number(add(1)(2)(-3)(4))); // вивів у консоль для перевірки
