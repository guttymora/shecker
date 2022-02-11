"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateObject = exports.validate = void 0;
const basic_validator_1 = require("./basic.validator");
Object.defineProperty(exports, "validate", { enumerable: true, get: function () { return basic_validator_1.validate; } });
const object_validator_1 = require("./object.validator");
Object.defineProperty(exports, "validateObject", { enumerable: true, get: function () { return object_validator_1.validateObject; } });
