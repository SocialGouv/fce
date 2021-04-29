"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (message = "", moreData = {}) => {
    const returnItems = [];
    returnItems.push({
        json: Object.assign({ exitCode: 0, stderr: "", stdout: message }, moreData),
    });
    return returnItems;
};
//# sourceMappingURL=prepareSuccessResponse.js.map