/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.alterColumn("entreprises", "sigleunitelegale", { type: "text" });
  pgm.alterColumn("entreprises", "prenom1unitelegale", { type: "text" });
  pgm.alterColumn("entreprises", "prenom2unitelegale", { type: "text" });
  pgm.alterColumn("entreprises", "prenom3unitelegale", { type: "text" });
  pgm.alterColumn("entreprises", "prenom4unitelegale", { type: "text" });
  pgm.alterColumn("entreprises", "pseudonymeunitelegale", { type: "text" });
  pgm.alterColumn("entreprises", "identifiantassociationunitelegale", { type: "text" });
  pgm.alterColumn("entreprises", "nomunitelegale", { type: "text" });
  pgm.alterColumn("entreprises", "nomusageunitelegale", { type: "text" });
  pgm.alterColumn("entreprises", "denominationunitelegale", { type: "text" });
  pgm.alterColumn("entreprises", "denominationusuelle1unitelegale", { type: "text" });
  pgm.alterColumn("entreprises", "denominationusuelle2unitelegale", { type: "text" });
  pgm.alterColumn("entreprises", "denominationusuelle3unitelegale", { type: "text" });
  pgm.alterColumn("entreprises", "prenomusuelunitelegale", { type: "text" });
};

exports.down = pgm => {
  pgm.alterColumn("entreprises", "sigleunitelegale", { type: "varchar(20)" });
  pgm.alterColumn("entreprises", "prenom1unitelegale", { type: "varchar(20)" });
  pgm.alterColumn("entreprises", "prenom2unitelegale", { type: "varchar(20)" });
  pgm.alterColumn("entreprises", "prenom3unitelegale", { type: "varchar(20)" });
  pgm.alterColumn("entreprises", "prenom4unitelegale", { type: "varchar(20)" });
  pgm.alterColumn("entreprises", "pseudonymeunitelegale", { type: "varchar(100)" });
  pgm.alterColumn("entreprises", "identifiantassociationunitelegale", { type: "varchar(20)" });
  pgm.alterColumn("entreprises", "nomunitelegale", { type: "varchar(100)" });
  pgm.alterColumn("entreprises", "nomusageunitelegale", { type: "varchar(100)" });
  pgm.alterColumn("entreprises", "denominationunitelegale", { type: "varchar(120)" });
  pgm.alterColumn("entreprises", "denominationusuelle1unitelegale", { type: "varchar(70)" });
  pgm.alterColumn("entreprises", "denominationusuelle2unitelegale", { type: "varchar(70)" });
  pgm.alterColumn("entreprises", "denominationusuelle3unitelegale", { type: "varchar(70)" });
  pgm.alterColumn("entreprises", "prenomusuelunitelegale", { type: "varchar(20)" });

};
