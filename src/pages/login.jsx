import '../styles/login.css';

import { Link, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth.js"
import { useForm } from 'react-hook-form';
import Field from '../components/Form/Field.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import { useContext, useState } from 'react';
import { signIn } from '../services/auth.js';
import { StoreContext } from '../store/store-context.js';
import { LOGIN } from '../store/actions.js';
import Spinner from '../components/Spinner.jsx';
import { useIndexedDB } from 'react-indexed-db';

export default function Login() {
    const { token } = useAuth();
    const { add, getAll } = useIndexedDB("userData")
    const [state, dispatch] = useContext(StoreContext);

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [error, setError] = useState('');
    const [signingIn, setSigninIn] = useState(false);

    const handleLogin = async data => {
        try {
            let currentUser = []
            setSigninIn(true);
            setError('');

            const { token, data: user } = await signIn(data);
            console.log(user)

            dispatch({
                type: LOGIN,
                payload: {
                    token,
                    user
                }
            });
            localStorage.setItem("authUser", JSON.stringify(user))

            const allUser = await getAll() /// try check with id later 

            allUser.map((item) => item.email.toLowerCase() === user.email.toLowerCase() ? currentUser.push(item) : currentUser)

            currentUser.length > 0 && localStorage.setItem("authUser", JSON.stringify({ ...user, indexId: currentUser[0].id }))

            console.log(currentUser)

            if (currentUser.length === 0) {
                let currUser = []
                add({
                    name: user.first_name, email: user.email, userType: user.userType, customer: [], supplier: [], items: [], sale: [], purchase: [], recent:[]
                })
                
                const all = await getAll()
                all.map(((item) => item.email.toLowerCase() === user.email.toLowerCase() ? currUser.push(item) : ""))
                localStorage.setItem("authUser", JSON.stringify({ ...user, indexId: currUser[0].id }))
            }


        } catch (e) {
            console.error(e);
            setError(e.message);
        } finally {
            setSigninIn(false);
        }
    };

    if (token) {
        return <Navigate to="/" replace />
    }

    return (
        <div className="login-container">
            <div className="login-box">
                <h5 className="m-0">
                    <span className="text-primary">
                        Easy
                    </span>
                    Invoice
                </h5>
                <h4>Login</h4>
                <form onSubmit={handleSubmit(handleLogin)}>
                    {
                        error
                            ? <ErrorMessage message={error} />
                            : null
                    }
                    <Field>
                        <label htmlFor="email">Email</label>
                        <input
                            className='input'
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            {...register("email", { required: "Email is required" })}
                        />
                        {
                            errors.email
                                ? <ErrorMessage message={errors.email.message} />
                                : null
                        }
                    </Field>
                    <Field>
                        <label htmlFor="password">Password</label>
                        <input
                            className='input'
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            {...register("password", { required: "Password is required" })}
                        />
                        {
                            errors.password
                                ? <ErrorMessage message={errors.password.message} />
                                : null
                        }
                    </Field>
                    <Link to="/forgot-password">Forgot Password?</Link>
                    <button disabled={signingIn} className="button block-button is-primary">
                        {
                            signingIn
                                ? <Spinner />
                                : 'Login'
                        }
                    </button>
                </form>
                <p className="copyright">&copy; iTaxEasy Pvt. Ltd.</p>
            </div>
        </div>
    )
}