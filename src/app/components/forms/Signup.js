import React, { useState } from "react";
import "./Signup.css";

import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";

import { JWT_SECRET, KEYVALUE_DB_ADDRESS } from "../../../config/Environment";

const salt = bcrypt.genSaltSync(10);

function Signup({ orbit_db }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    const emailChange = (event) => setEmail(event.target.value);
    const passwordChange = (event) => setPassword(event.target.value);
    const repeatPasswordChange = (event) =>
        setRepeatPassword(event.target.value);

    const signUp = async (e) => {
        e.preventDefault();

        try {
            const users = await orbit_db.keyvalue(KEYVALUE_DB_ADDRESS);
            await users.load();
            if (password !== repeatPassword) {
                console.log("password doesn't matches with repeat password");
                return;
            }
            if (users.get(email)) {
                console.log("user already exists");
                return;
            }
            const user = await orbit_db.docs("ipc.user." + email);
            const hash = bcrypt.hashSync(password, salt);

            await user.put({ _id: email, password: hash, data: {} });
            await users.put(email, { _id: user.address.toString() });
            const payload = {
                email,
                password,
            };
            const token = jwt.sign(payload, JWT_SECRET);
            localStorage.setItem("token", token);
            console.log(localStorage.token);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="signup-container">
            <form className="signup-form" onSubmit={(e) => signUp(e)}>
                <div className="signup-form-field">
                    <label>email</label>
                    <input
                        type="email"
                        id="email"
                        name="user_email"
                        onChange={emailChange}
                    />
                </div>
                <div className="signup-form-field">
                    <label>password</label>
                    <input
                        type="password"
                        id="password"
                        name="user_password"
                        onChange={passwordChange}
                    />
                </div>
                <div className="signup-form-field">
                    <label>confirm-password</label>
                    <input
                        type="password"
                        id="confirm-password"
                        name="user_repeat_password"
                        onChange={repeatPasswordChange}
                    />
                </div>
                <div className="signup-submit-btn">
                    <button type="submit">Sign Up</button>
                </div>
            </form>
        </div>
    );
}

export default Signup;
