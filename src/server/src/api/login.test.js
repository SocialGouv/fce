const request = require("supertest");
const server = require("../index.js");

const _done = (err, done) => {
  if (err) {
    return done(err);
  }
  done();
};

describe("Login", () => {
  test("user login", done => {
    request(server)
      .post("/api/login")
      .send({ password: "D1r€cct€" })
      .set("Accept", "application/json")
      .expect(200)
      .end(function(err, res) {
        expect(res.body).toEqual({
          user: { username: "user", isAdmin: false }
        });
        _done(err, done);
      });
  });

  test("admin login", done => {
    request(server)
      .post("/api/login")
      .send({ password: "@dm1nD1r€cct€" })
      .set("Accept", "application/json")
      .expect(200)
      .end(function(err, res) {
        expect(res.body).toEqual({
          user: { username: "admin", isAdmin: true }
        });
        _done(err, done);
      });
  });

  test("bad password", done => {
    request(server)
      .post("/api/login")
      .send({ password: "badpassword" })
      .set("Accept", "application/json")
      .expect(200)
      .end(function(err, res) {
        expect(res.body).toEqual({
          user: null
        });
        _done(err, done);
      });
  });
});
