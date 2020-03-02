import layout from "./layout";

export default ({ useful, comment }) => {
  const questionCss = "font-weight: bold; color: #2980b9; padding: 8px";
  const answerCss = "padding: 8px 8px 16px";

  return layout(`
  <table style="width: 100%; font-size: 16px; line-height: 1.4; font-family: sans-serif; background-color: white"; border: 1px solid #efefef;>
    <tr>
      <td>
        <h1 style="font-size: 20px; text-align: center">Nouvel avis utilisateur enregistré</h1>
      </td>
    </tr>

    <tr>
      <td style="${questionCss}">
        L'information trouvée vous a-t-elle été utile ?
      </td>
    </tr>
    <tr>
      <td style="${answerCss}">
        ${useful ? "Oui" : "Non"}
      </td>
    </tr>

    <tr>
      <td style="${questionCss}">
        Commentaire
      </td>
    </tr>
    <tr>
      <td style="${answerCss}">
        ${comment.length > 0 ? comment : `Aucun commentaire`}
      </td>
    </tr>
  </table>
`);
};
