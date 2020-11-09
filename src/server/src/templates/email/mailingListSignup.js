import layout from "./layout";
import config from "config";
export default ({ unsubscribeHash }) =>
  layout(`
<table style="width: 100%; font-size: 16px; line-height: 1.4; font-family: sans-serif; padding: 32px; background-color: white"; border: 1px solid #efefef;>
    <tr>
      <td style="padding-bottom: 16px;">
        Bonjour,
      </td>
    </tr>

    <tr>
      <td style="padding-bottom: 16px;">
        Votre inscription à la lettre d'information FCE est confirmée.
      </td>
    </tr>

    <tr>
      <td style="padding-bottom: 16px;">
        Si vous ne souhaitez plus recevoir ce email vous pouvez vous désinscrire en cliquant sur le lien suivant: <a target="_blank" rel="noreferrer noopener" href="${config.client.baseUrl}/unsubscribe/${unsubscribeHash}">Se désabonner</a>
      </td>
    </tr>
  </table>
`);
