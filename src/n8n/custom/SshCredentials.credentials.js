"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SshCredentials = void 0;
class SshCredentials {
    constructor() {
        this.name = "SshCredentials";
        this.displayName = "SSH Credentials";
        this.properties = [
            {
                displayName: "Username preproduction",
                name: "username-preproduction",
                type: "string",
                default: ""
            },
            {
                displayName: "Host preproduction",
                name: "host-preproduction",
                type: "string",
                default: ""
            },
            {
                displayName: "Username production",
                name: "username-production",
                type: "string",
                default: ""
            },
            {
                displayName: "Host production",
                name: "host-production",
                type: "string",
                default: ""
            }
        ];
    }
}
exports.SshCredentials = SshCredentials;
//# sourceMappingURL=SshCredentials.credentials.js.map