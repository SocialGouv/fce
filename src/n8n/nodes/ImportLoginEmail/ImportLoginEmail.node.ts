import { INodeExecutionData, INodeType, INodeTypeDescription } from "n8n-workflow";
import { IExecuteFunctions } from "n8n-core";
import { ingestDb, IngestDbConfig } from "../../utils/ingestDb";
import { mapRow } from "../../utils/postgre";
import {getDepartementDomainFromCode} from "../../utils/departement";
import {urlencoded} from "express";

type UserData = {
  email: string;
  structure: string;
}

const replaceEmailDomain = (email: string, codeDepartement: string): string => {
  const splitEmail = email.split("@");
  splitEmail[1] = `${getDepartementDomainFromCode(codeDepartement)}.gouv.fr`;
  return splitEmail.join("@");
}

const trimStructure = ({ structure, ...rest }: UserData): UserData => ({
  ...rest,
  structure: structure.substr(0, 10)
});

const fixEmail = (codeDepartement: string) => ({ email, ...rest }: UserData): UserData => ({
  ...rest,
  email: email.includes("@sante.melanie2.i2") ? replaceEmailDomain(email, codeDepartement) : email,
})

const sanitizeUserData = (codeDepartement: string | null) => (userData: UserData): UserData => {
  const emailProcess = codeDepartement ? fixEmail(codeDepartement) : (userData: UserData) => userData;

  return emailProcess(trimStructure(userData));
}

const getConfig = (codeDepartement: string | null): IngestDbConfig => ({
  fieldsMapping: {
    "Courriel": "email",
    "Structure": "structure"
  },
  filename: "valid_emails.csv",
  table: "valid_email",
  truncate: false,
  nonEmptyFields: ["email"],
  separator: ",",
  transform: () => mapRow<UserData, UserData>(
    sanitizeUserData(codeDepartement)
  )
});

export class ImportLoginEmail implements INodeType {
  description: INodeTypeDescription = {
    displayName: "Import Login Email",
    name: "importLoginEmail",
    group: ['transform'],
    version: 1,
    description: "Import whitelisted emails for connection",
    defaults: {
      name: 'Import Login Email',
      color: '#772244',
    },
    properties: [
      // Node properties which the user gets displayed and
      // can change on the node.
      {
        displayName: 'Remote file name',
        name: 'remoteFile',
        type: 'string',
        default: '',
        placeholder: 'name',
        description: 'The name of the remote file from which we extract the departement code',
        required: true
      }
    ],
    credentials: [{
      name: "postgres",
      required: true
    }],
    inputs: ['main'],
    outputs: ['main'],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const remoteFileName = this.getNodeParameter("remoteFile", 0) as string;
    const extractDepartmentRegex = /^Annuaire-DDETS(PP)? ([0-9A-z]{1,2}).csv$/;

    const extractResult = extractDepartmentRegex.exec(remoteFileName);

    const codeDepartment = extractResult && extractResult[2];

    return ingestDb(this, getConfig(codeDepartment));
  }
}
