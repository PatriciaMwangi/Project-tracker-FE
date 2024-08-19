import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword, resetState } from '../../features/forgotPasswords/ForgotPasswordSlice';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();
    const { loading, successMessage, errorMessage } = useSelector((state) => state.forgotPassword);

    useEffect(() => {
        dispatch(resetState());
    }, [dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(resetState());
        dispatch(forgotPassword(email));
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title text-center">Forgot Password</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="email">Email address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary btn-block mt-3"
                                    disabled={loading}
                                >
                                    {loading ? 'Sending...' : 'Send Reset Link'}
                                </button>
                            </form>
                            {successMessage && (
                                <div className="alert alert-success mt-3">{successMessage}</div>
                            )}
                            {errorMessage && (
                                <div className="alert alert-danger mt-3">{errorMessage}</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
