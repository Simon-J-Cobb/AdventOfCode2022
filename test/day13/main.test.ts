import { compare } from "../../src/day13/main"

test('both values are integers', () => {
    expect(compare({ value: 1 }, { value: 2 })).toBe(1)
})

test('both values are integers', () => {
    expect(compare({ value: 2 }, { value: 1 })).toBe(-1)
})

test('compare two lists', () => {
    expect(compare({ value: [2, 1] }, { value: [2, 2] })).toBe(1)
})

test('compare two lists', () => {
    expect(compare({ value: [2, 1] }, { value: [1, 1] })).toBe(-1)
})

test('compare two lists', () => {
    expect(compare({ value: [[1],[2,3,4]] }, { value: [[1],4] })).toBe(1)
})

test('compare two lists', () => {
    expect(compare({ value: [[1],4] }, { value: [1,[2,[3,[4,[5,6,7]]]],8,9] })).toBe(-1)
})

