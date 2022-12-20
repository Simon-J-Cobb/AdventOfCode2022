import { compare } from "../../src/day13/main"

test('both values are integers', () => {
    expect(compare({ value: 1 }, { value: 2 })).toBe(true)
})

test('both values are integers', () => {
    expect(compare({ value: 2 }, { value: 1 })).toBe(false)
})
