var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/utils/logger.ts
import fetch from "node-fetch";
import chalk from "chalk";
var baseURL = "http://localhost:3000";
function generateLogger(options) {
  return function sendLog(body) {
    return __async(this, null, function* () {
      yield fetch(baseURL + "/log", {
        headers: {
          "Secret-Key": options.secretKey,
          "Public-Key": options.publicKey,
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(body)
      });
      switch (body.type) {
        case "error":
          console.log(chalk.bgRed("Error"), body.message);
          break;
        case "info":
          console.log(chalk.bgBlue("Info"), body.message);
          break;
        case "warning":
          console.log(chalk.bgYellow("Warning"), body.message);
          break;
        default:
          console.log(chalk.bgGray("Other"), body.message);
          break;
      }
    });
  };
}

// src/index.ts
function Meitrics(options) {
  const logger = generateLogger(options);
  const res = {
    warning: (args) => {
      logger(__spreadProps(__spreadValues({}, args), { type: "warning" }));
    },
    error: (args) => {
      logger(__spreadProps(__spreadValues({}, args), { type: "error" }));
    },
    info: (args) => {
      logger(__spreadProps(__spreadValues({}, args), { type: "info" }));
    },
    other: (args) => {
      logger(__spreadProps(__spreadValues({}, args), { type: "other" }));
    }
  };
  return res;
}
export {
  Meitrics as default
};
