export default {
  verbose: true,
  resetMocks: true,
  testEnvironment: "jsdom",
  setupFilesAfterEnv: [ "<rootDir>/config/jestSetup.ts" ],
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1",
    "\\.(css|less)$": "identity-obj-proxy"
  },
  transform: {
    "^.+\\.(tsx|ts)?$": "ts-jest",
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/config/fileTransformer.ts',
  },
}