const db = require('../config/mysql');

const User = {
    create: (newUser, result) => {
        db.query("INSERT INTO users SET ?", newUser, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            result(null, { id: res.insertId, ...newUser });
        });
    },
    findByEmail: (email, result) => {
        db.query("SELECT * FROM users WHERE email = ?", [email], (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            if (res.length) {
                result(null, res[0]);
                return;
            }
            result({ kind: "not_found" }, null);
        });
    }
};

module.exports = User;