"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
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
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
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

// src/index.ts
var src_exports = {};
__export(src_exports, {
  default: () => Meitrics
});
module.exports = __toCommonJS(src_exports);

// src/utils/logger.ts
var import_node_fetch = __toESM(require("node-fetch"));
var import_chalk = __toESM(require("chalk"));
var baseURL = "http://localhost:3000";
function generateLogger(options) {
  return function sendLog(body) {
    return __async(this, null, function* () {
      yield (0, import_node_fetch.default)(baseURL + "/log", {
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
          console.log(import_chalk.default.bgRed("Error"), body.message);
          break;
        case "info":
          console.log(import_chalk.default.bgBlue("Info"), body.message);
          break;
        case "warning":
          console.log(import_chalk.default.bgYellow("Warning"), body.message);
          break;
        default:
          console.log(import_chalk.default.bgGray("Other"), body.message);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
