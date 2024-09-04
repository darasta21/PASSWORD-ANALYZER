// ECHO is on.
import React, { useState } from 'react';
import axios from 'axios';
import './PasswordAnalyzer.css';

const PasswordAnalyzer = () => {
    const [password, setPassword] = useState('');
    const [method, setMethod] = useState('SHA-256');
    const [result, setResult] = useState(null);
    const [entropy, setEntropy] = useState(null);
    const [loading, setLoading] = useState(false); // New state for loading

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true

        try {
            const response = await axios.post('http://localhost:5000/api/password/analyze', { password, method });
            
            // Wait for 3 seconds to simulate loading
            setTimeout(() => {
                setResult(response.data.strength);
                setEntropy(response.data.entropy);
                setLoading(false); // Set loading to false after 3 seconds
            }, 3000);
        } catch (error) {
            console.error("Error analyzing password:", error);
            setLoading(false); // Set loading to false in case of an error
        }
    };

    return (
        <div className="analyzer-container">
            <h1>Password Analyzer</h1>
            <form onSubmit={handleSubmit} className="analyzer-form">
                <input
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Password"
                    required
                    className="input-field"
                />
                <select value={method} onChange={(e) => setMethod(e.target.value)} className="input-field">
                    <option value="SHA-256">SHA-256</option>
                    <option value="MD5">MD5</option>
                </select>
                <button type="submit" className="analyze-button">Analyze</button>
            </form>
            {loading && (
                <div className="loading-message">
                    <h2>Analyzing your password...</h2>
                </div>
            )}
            {!loading && result && (
                <div className="result">
                    <h2>Your password is: <span>{result}</span></h2>
                    {entropy && (
                        <div>
                            <h3>Entropy: <span>{entropy}</span></h3>
                            <p>This value indicates the strength of your password. Higher entropy means stronger passwords.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default PasswordAnalyzer;