//jest.config.js
export default {
    transform: {
        "^.+\\.[jt]sx?$": "babel-jest",
    },
    moduleNameMapper: {
        "\\.(css|less)$": "identity-obj-proxy",
    },
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["<rootDir>/setUpTests.js"],
};
