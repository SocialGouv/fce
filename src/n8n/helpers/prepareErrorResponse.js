"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (message, moreData = {}) => {
    const returnItems = [];
    returnItems.push({
        json: Object.assign({ exitCode: 1, stderr: message, stdout: "" }, moreData),
    });
    return returnItems;
};
//# sourceMappingURL=prepareErrorResponse.js.map