import layout from "./layout";

export default ({ link, browser }) =>
  layout(`
<table style="width: 100%; font-size: 16px; line-height: 1.4; font-family: sans-serif; padding: 32px; background-color: white"; border: 1px solid #efefef;>
    <tr>
      <td style="padding-bottom: 16px;">
        Bonjour,
      </td>
    </tr>

    <tr>
      <td style="padding-bottom: 16px;">
        Vous avez fait une demande de connexion à l’application FCE, pour vous connecter veuillez <strong>copier/coller le lien suivant dans votre navigateur ${browser}</strong> :
      </td>
    </tr>

    <tr>
      <td width="100%;" style="font-size: 13px; color: #666; word-break: break-all; padding-bottom: 16px;">
        ${link}
      </td>
    </tr>

    <tr>
      <td style="padding-bottom: 16px;">
        Cordialement,
      </td>
    </tr>

    <tr>
      <td style="padding-bottom: 16px;">
        L’équipe FCE
      </td>
    </tr>
  </table>
`);
