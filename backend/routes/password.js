// ECHO is on.
const express = require('express');
const router = express.Router();

// Function to analyze password strength and calculate entropy
const analyzePassword = (password) => {
    let strength = 'Weak';
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    // Check for strength criteria
    if (password.length >= 8 && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChars) {
        strength = 'Strong';
    } else if (password.length >= 8) {
        strength = 'Moderate';
    }

    // Calculate entropy
    const entropy = calculateEntropy(password);
    
    return { strength, entropy };
};

// Function to calculate entropy
const calculateEntropy = (password) => {
    const uniqueChars = new Set(password).size;
    const entropy = password.length * Math.log2(uniqueChars);
    return entropy.toFixed(2); // Return entropy rounded to 2 decimal places
};

// POST route for password analysis
router.post('/analyze', (req, res) => {
    const { password } = req.body;

    const { strength, entropy } = analyzePassword(password);

    res.json({ password, strength, entropy });
});

module.exports = router;