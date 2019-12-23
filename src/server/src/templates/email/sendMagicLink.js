import layout from "./layout";

export default ({ link, browser }) =>
  layout(`
Bonjour,<br/><br/>

Vous avez fait une demande de connexion à l’application FCE, pour vous connecter veuillez copier/coller le lien suivant dans votre navigateur ${browser} : <br/><br/>

<a href="${link}">${link}</a><br/><br/>

<strong>Attention, ce lien n’est valable que pour le navigateur ${browser} avec lequel vous avez fait la demande. Si votre navigateur par défaut est différent veuillez copier coller le lien dans celui-ci.</strong><br/><br/>

Cordialement,<br/><br/>

L’équipe FCE
`);
