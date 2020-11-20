import layout from "./layout";
import config from "config";

/**
 * @TODO
 * - edit unsubscribe link style
 * - check content with Chloe
 */

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
      Merci d'avoir accepté de recevoir des informations à propos de FCE. Vous venez d'être ajouté à notre liste de contacts.
    </td>
  </tr>

  <tr>
    <td style="padding-bottom: 16px;">
      Si vous ne souhaitez pas recevoir ces informations vous pouvez vous désinscrire en cliquant sur le lien suivant: <a target="_blank" rel="noreferrer noopener" href="${config.client.baseUrl}/unsubscribe/${unsubscribeHash}" style="color: #2980b9;">Se désabonner</a>
    </td>
  </tr>
</table>
`);
