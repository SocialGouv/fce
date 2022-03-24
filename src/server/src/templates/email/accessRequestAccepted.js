import layout from "./layout";

export default () =>
  layout(`
<table style="width: 100%; font-size: 16px; line-height: 1.4; font-family: sans-serif; padding: 32px; background-color: white"; border: 1px solid #efefef;>
    <tr>
      <td style="padding-bottom: 16px;">
        Bonjour,
      </td>
    </tr>

    <tr>
      <td style="padding-bottom: 16px;">
        Votre demande d'accès à FCE a été acceptée. Vous pouvez désormais vous connecter sur la page suivante : <a href="https://fce.fabrique.social.gouv.fr/login">https://fce.fabrique.social.gouv.fr/login</a>
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
