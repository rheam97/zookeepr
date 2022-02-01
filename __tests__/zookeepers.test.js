const { TestWatcher } = require('@jest/core')
const fs = require('fs')
const {
    filterByQuery,
    findById,
    createNewZookeeper,
    validateZookeeper
} = require('../lib/zookeepers')
const { zookeepers } = require('../data/zookeepers.json')
const { hasUncaughtExceptionCaptureCallback } = require('process')
jest.mock('fs')

test('filters by query', () => {
    const startingKeepers = [
        {
            id: "7",
            name: "Emmy",
            age: 29,
            favoriteAnimal: "Duckbilled Platypus"
        },
        {
            id: "8",
            name: "Jimmy",
            age: 31,
            favoriteAnimal: "Duckbilled Platypus"
        }
    ]
    const updatedKeepers = filterByQuery({ age: 31 }, startingKeepers)
    expect(updatedKeepers.length).toBe(1)
})

test('finds by id', () => {
    const startingKeepers = [
        {
            id: "7",
            name: "Emmy",
            age: 29,
            favoriteAnimal: "Duckbilled Platypus"
        },
        {
            id: "8",
            name: "Jimmy",
            age: 31,
            favoriteAnimal: "Duckbilled Platypus"
        }
    ]
    const result = findById('8', startingKeepers)
    expect(result.name).toBe('Jimmy')
})

test('creates new zookeeper', () => {
    const keeper = createNewZookeeper(
        { name: 'Betty', id: '85' }, zookeepers
    )
    expect(keeper.name).toBe('Betty')
    expect(keeper.id).toBe('85')
})

test('validates zookeeper traits', () => {
    const keeper = {
        id: "5",
        name: "Alex",
        age: 32,
        favoriteAnimal: "Sloths"
    }
    const invalidKeeper = {
        id: "5",
        name: "Alex",
        age: 32
    }
    const result = validateZookeeper(keeper)
    const result2 =validateZookeeper(invalidKeeper)
    expect(result).toBe(true)
    expect(result2).toBe(false)
})