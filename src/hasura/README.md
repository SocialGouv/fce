# Hasura

This Hasura config must be ran against a running Hasura GraphQL server.

You can use the root docker-compose.yml which is already set up.

The default setup uses the `JWT.key` to generate a RS512 JSON Web Token.

It is setup to use the public key `JWT.key.pub` for token validation. If you need a development
token, you can use the following which is setup for the user role :
```
eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMiwiaHR0cHM6Ly9oYXN1cmEuaW8vand0L2NsYWltcyI6eyJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiXSwieC1oYXN1cmEtZGVmYXVsdC1yb2xlIjoidXNlciJ9fQ.TIfJ96Nx4D4C24gFtUyVB5y_pMLO0o1XNs6LB6gI4ugBwaVN0AKP0b0f_EDtlAAMspwLQzriYIumwUlTS8yP1Bd8DpzhrPmeiJQuUgUjdZ9GyqqsLc1kNTR7i1VC7A97uC_zZpB5vnLycA6coBYLiXafkmNlxq7GOczOqXK8IctDCoJVxr0QMFtD29lWGOviBf2INxWOw2UUw8KfGR92B19vP8y2NAeq9Ap1XdYoPz-OXBo02PrAZVpioPJab58aH6zL6-HwNxg4i1-usVoZHHGD94_kAjTKqIvTZBL-2qXbhibcvgqlaPzuhnBTqP6x5S1Hp3vvWX3tPnJ-K4x-88Zq8P5fbXRFpPYEg1tXU_VXHY2I0P4TMgCuNYgmnz4D3rZQsObGzqwsVNC-0puDVB08JOUgTCaQiKb3ibqL9913Oo3FVxJiz7-aOWmJOeGAUBfb1xkmm5B6FdbpIvydVCMS_SS6mnQ6gSPXhVF7avMx06u3PDg5DIFjJvq4kgCY83IEtC2uWjwWb0qoKq6nuJeKvvMgrH2su8yaHM-KRgcAutZez1sv6f3GJwUjYXP7zSqyzmnBjwh20OX5PHBp7EsAH5_nEy9tK57bZUGhVeKuzhHgHRJx0MzBa5Uxd3keKPgcs7imm9sXg_MB-v5VhZwyEUAp-jeQrkRaNfODK0I
```

## Generating a production token

If you need to generate a production RSA key-pair, you can do the following :

```shell
# Generate the RSA key pair
ssh-keygen -t rsa -b 4096 -E SHA512 -m PEM -P "" -f JWT.key

# Format the public key to PEM
openssl rsa -in JWT.key -pubout -outform PEM -out JWT.key.pub
```

And then, use the private key to
[generate a hasura JWT token](https://hasura.io/docs/latest/graphql/core/auth/authentication/jwt.html#the-spec)

You can generate the right RS512 token by using [jwt.io](https://jwt.io/) website.
