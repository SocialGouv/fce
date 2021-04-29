"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (inputData) => {
    var _a;
    const jsonData = ((_a = inputData === null || inputData === void 0 ? void 0 : inputData[0]) === null || _a === void 0 ? void 0 : _a.json) || {};
    const { exitCode, stderr, stdout } = jsonData, rest = __rest(jsonData, ["exitCode", "stderr", "stdout"]);
    return Object.assign({ exitCode: exitCode ? +exitCode : 0, stderr: stderr ? stderr.toString() : "", stdout: stdout ? stdout.toString() : "" }, rest);
};
//# sourceMappingURL=extractInputData.js.map