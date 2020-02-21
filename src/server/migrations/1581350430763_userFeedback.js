exports.up = pgm => {
  pgm.createTable("users_feedback", {
    id: "id",
    useful: { type: "boolean", notNull: true },
    comment: { type: "text" },
    createdAt: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp")
    }
  });
};

exports.down = pgm => {
  pgm.dropTable("users_feedback");
};
