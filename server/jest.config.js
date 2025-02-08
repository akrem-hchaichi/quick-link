module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    setupFilesAfterEnv: ['./tests/setup.ts'],
    modulePathIgnorePatterns: ['<rootDir>/dist/'],
    watch: true,
};