const express = require("express");
const router = express.Router();
const pool = require("./db/pool");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretKey = 'your-secret-key';
const saltRounds = 10;

//register user
router.post("/register", function (req, res, next) {
    const hassedPassword = bcrypt.hashSync(password, saltRounds);
    pool.query(
    "INSERT INTO user VALUES ($1, $2)",
    [username, hassedPassword],
    function (error, results) {
        if (error) {
        res.status(500).json({
            status: "500 Internal Server Error",
            error: error,
        });
        }
        res.status(201).json({
        status: "success",
        });
    }
    );
});

//login
router.post("/login", function (req, res, next) {
    const { username, password } = req.body;
    pool.query("SELECT * FROM user WHERE user = $1", [username], function (
        error,
        user
    ) {
    if (error) {
        res.status(400).json({
        status: "400 Bad Request",
        error: error,
        });
    }
    if (user.rowCount === 0) {
        return res.json({
            message: "username not found",
        });
    }
    bcrypt.compare(password, user.rows[0].password, function (error, results) {
    if (error) {
        return res.status(400).json({
            error: error.message,
        });
    }
    if (!results) {
        return res.json({
        message: "password is not correct",
        });
    }
    //Token
    const payload = {
        id: user.rows[0].id,
        name: user.rows[0].name,
        email: user.rows[0].email,
    };
    const token = jwt.sign(payload, secretKey);
    return res.json({ token });
    });
    });
});
module.exports = router;