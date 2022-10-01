/*
 * Необходимо покрыть все возможные
 * и невозможные кейсы. Например,
 * convertBytesToHuman(-1) === false,
 * convertBytesToHuman(-1) !== '1 B',
 * convertBytesToHuman('string') === false
 * convertBytesToHuman(5) === '5 B'
 */

import convertBytesToHuman from "./convertBytesToHuman";

test("Тест на передачу нуля", () => {
  expect(convertBytesToHuman(0)).toBe("0 B");
});

test("Тест на передачу верных значений", () => {
  expect(convertBytesToHuman(123123123)).toBe("117.42 MB");
  expect(convertBytesToHuman(19191827372)).toBe("17.87 GB");
});

test("Тест на вычисление всех единиц измерения", () => {
  const units = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  for (let i = 0, bytes = 1; i < units.length; i++, bytes *= 1024) {
    expect(convertBytesToHuman(bytes)).toBe(`1.00 ${units[i]}`);
  }
});

test("Передача неверных данных в фунцию", () => {
  expect(convertBytesToHuman(-1)).toBeFalsy();
  expect(convertBytesToHuman("str")).toBeFalsy();
});
