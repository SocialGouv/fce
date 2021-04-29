"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportInteractionT = void 0;
class ImportInteractionT {
    constructor() {
        this.description = {
            displayName: 'Import Interaction T',
            name: 'importInteractionT',
            group: ['transform'],
            version: 1,
            description: 'Import data from interaction pole T to fce',
            defaults: {
                name: 'Import Interaction T',
                color: '#772244',
            },
            inputs: ['main'],
            outputs: ['main'],
            properties: [
                {
                    displayName: 'My String',
                    name: 'myString',
                    type: 'string',
                    default: '',
                    placeholder: 'Placeholder value',
                    description: 'The description text',
                }
            ]
        };
    }
    async execute() {
        const items = this.getInputData();
        let item;
        let myString;
        for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
            myString = this.getNodeParameter('myString', itemIndex, '');
            item = items[itemIndex];
            item.json['myString'] = myString;
        }
        return this.prepareOutputData(items);
    }
}
exports.ImportInteractionT = ImportInteractionT;
//# sourceMappingURL=ImportInteractionT.node.js.map