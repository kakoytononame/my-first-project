db.createUser(
        {
            user: "admin",
            pwd: "test",
            roles: [
                {
                    role: "readWrite",
                    db: "todo-list"
                }
            ]
        }
);