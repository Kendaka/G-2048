import React, { useState } from 'react';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        // Input validation
        if (!username || !password) {
            setError('Both fields are required.');
            return;
        }
        // Clear any previous error and call onLogin to update App state
        setError('');
        onLogin();
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-lg text-gray-400">
                <h1 className="text-3xl font-bold text-center mb-6">2048 Game Login</h1>
                
                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="relative">
                        <input 
                            type="text" 
                            id="username" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)}
                            className={`w-full px-4 py-3 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-gray-500
                                ${username ? 'pt-6' : ''}`} 
                        />
                        <label 
                            htmlFor="username" 
                            className={`absolute left-4 top-3 text-gray-400 transition-all transform 
                                ${username ? '-translate-y-6 scale-90' : 'translate-y-0 scale-100'}`}>
                            Username
                        </label>
                    </div>
                    
                    <div className="relative">
                        <input 
                            type="password" 
                            id="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                            className={`w-full px-4 py-3 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-gray-500
                                ${password ? 'pt-6' : ''}`} 
                        />
                        <label 
                            htmlFor="password" 
                            className={`absolute left-4 top-3 text-gray-400 transition-all transform 
                                ${password ? '-translate-y-6 scale-90' : 'translate-y-0 scale-100'}`}>
                            Password
                        </label>
                    </div>

                    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                    
                    <button 
                        type="submit" 
                        className="w-full py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all duration-200">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
