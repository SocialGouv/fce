"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCredentialsByEnv = exports.validateInputData = void 0;
exports.validateInputData = (inputData, requiredInputKeys) => {
    for (const inputKey of requiredInputKeys) {
        if (!inputData.hasOwnProperty(inputKey)) {
            return false;
        }
    }
    return true;
};
exports.getCredentialsByEnv = (credentials, env) => ({
    username: credentials === null || credentials === void 0 ? void 0 : credentials[`username-${env}`],
    host: credentials === null || credentials === void 0 ? void 0 : credentials[`host-${env}`],
});
//# sourceMappingURL=executeHelpers.js.map