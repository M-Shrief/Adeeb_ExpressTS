db.createUser(
    {
      user: "adeeb",
      pwd: "mongodb",
      roles: [
        {
          role: "readWrite",
          db: "adeeb_db"
        }
      ]
    }
);