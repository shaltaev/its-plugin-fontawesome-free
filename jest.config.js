module.exports = {
    roots: ['<rootDir>/src'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    },
    transformIgnorePatterns: ['<rootDir>/node_modules/(?!(jest-atomic)/)']
}
