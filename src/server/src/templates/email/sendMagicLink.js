import layout from "./layout";

export default ({ link }) =>
  layout(`
Bonjour,<br/><br/>

Vous avez fait une demande de connexion à l'application FCE, pour vous connecter veuillez cliquez sur le lien suivant : <br/><br/>

<a href="${link}">${link}</a><br/><br/>


Cordialement,<br/><br/>

L'équipe FCE
`);
