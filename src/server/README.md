# Server

## Database migrations

You can initialize the database by running :

```bash
yarn migrate up --latest
```

You may encounter the following error : `function uuid_generate_v4()`.

You can fix it by installing the extension :
```
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```
Run yarn watch 
