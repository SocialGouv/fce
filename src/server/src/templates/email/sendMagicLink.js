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
        Vous avez fait une demande de connexion à l’application FCE, pour vous connecter veuillez copier/coller le lien suivant dans votre navigateur ${browser} :
      </td>
    </tr>

    <tr>
      <td width="100%;" style="word-break: break-all; padding-bottom: 16px;">
        <a style="color: #2980b9" href="${link}">${link}</a>
      </td>
    </tr>

    <tr>
      <td style="padding-bottom: 16px;">
        <strong>Attention, ce lien n’est valable que pour le navigateur ${browser} avec lequel vous avez fait la demande. Si votre navigateur par défaut est différent veuillez copier coller le lien dans celui-ci.</strong>
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
