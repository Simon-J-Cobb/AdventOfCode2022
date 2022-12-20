import { compare } from "../../src/day13/main"

test('both values are integers', () => {
    expect(compare({ value: 1 }, { value: 2 })).toBe(true)
})

test('both values are integers', () => {
    expect(compare({ value: 2 }, { value: 1 })).toBe(false)
})

test('compare two lists', () => {
    expect(compare({ value: [2, 1] }, { value: [2, 2] })).toBe(true)
})

test('compare two lists', () => {
    expect(compare({ value: [2, 1] }, { value: [1, 1] })).toBe(false)
})

test('compare two lists', () => {
    expect(compare({ value: [[1],[2,3,4]] }, { value: [[1],4] })).toBe(true)
})
