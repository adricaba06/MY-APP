import "@testing-library/jest-dom";
import fetchMock from 'jest-fetch-mock';

// Polyfill para TextEncoder y TextDecoder en el entorno de Jest
if (typeof global.TextEncoder === "undefined") {
    global.TextEncoder = require("util").TextEncoder;
  }
  
  if (typeof global.TextDecoder === "undefined") {
    global.TextDecoder = require("util").TextDecoder as any; // Evita el error de TypeScript
  }

  // jest.config.js

module.exports = {
    // Asegura que Jest cargue el archivo de configuración
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  };
  
fetchMock.enableMocks();