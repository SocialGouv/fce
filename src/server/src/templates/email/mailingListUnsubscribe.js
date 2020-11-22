import layout from "./layout";

export default () =>
  layout(`
<table style="width: 100%; font-size: 16px; line-height: 1.4; font-family: sans-serif; padding: 32px; background-color: white"; border: 1px solid #efefef;>
  <tr>
    <td style="padding-bottom: 16px;">
      Vous avez été désinscrit de notre liste de contacts. Vous ne recevrez plus d'informations à propos de FCE.
    </td>
  </tr>
  <tr>
    <td style="padding-bottom: 16px;">
      Merci pour l'intérêt que vous avez porté à FCE. Vous pouvez vous réinscrire à tout moment depuis l'application.
    </td>
  </tr>
</table>
`);
