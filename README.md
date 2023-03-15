# FCE / DIRECCTE national

## Installation (projet)

- Setup a postgre DB
- Run `yarn migrate up`;

If you get this error `function uuid_generate_v4() does not exist`, run on your db :

```sql
SET search_path TO public;
DROP EXTENSION IF EXISTS "uuid-ossp";

CREATE EXTENSION "uuid-ossp" SCHEMA public;
```

## Contribution

## Troubleshooting

- **Mes modifications dans frentreprise ne sont pas prises en compte**

Au changement de branche le lien entre `frentreprise` et le `server` peuvent se casser, redémarrer le container `frentreprise` devrait régler le problème.

Une manière de voir facilement si le lien est bon est d'écouter le container `server` et de faire une modification sur `frentreprise`, s'il redémarre c'est que tout fonctionne.

### Encrypting secrets

Secrets can be encrypted using webseal :

Dev/preprod : https://socialgouv.github.io/sre-tools/

Prod : https://socialgouv.github.io/sre-tools/?cluster=prod&name=server-env&namespace=fce&scope=strict




