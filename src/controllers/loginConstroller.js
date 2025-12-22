import { connection } from "../mysqlConnection";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const SECRET_KEY = process.env.ACCESS_TOKEN_SECRET


const handleLoginController = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Please provide username and password' });
        }

        const [rows] = await connection.execute('SELECT * FROM user WHERE username = ?', [username]);

        if (rows.length === 0) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const user = rows[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token, user: { id: user.id, username: user.username } });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Error logging in' });
    }
}


const handleRegisterController = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // 1. Validate input
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Please provide username, email, and password' });
        }

        // 2. Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        // 3. Check for existing user
        const [existingUsers] = await connection.execute(
            'SELECT * FROM user WHERE username = ? OR email = ?',
            [username, email]
        );

        if (existingUsers.length > 0) {
            for (const user of existingUsers) {
                if (user.username === username) {
                    return res.status(409).json({ message: 'Username already exists' });
                }
                if (user.email === email) {
                    return res.status(409).json({ message: 'Email already exists' });
                }
            }
        }

        // 4. Hash password and create user
        const hashedPassword = await bcrypt.hash(password, 10);

        await connection.execute(
            'INSERT INTO user (username, email, password) VALUES (?, ?, ?)',
            [username, email, hashedPassword]
        );
        console.log('User created successfully');
        return res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Error creating user' });
    }
}

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);
    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}


export { handleLoginController, verifyToken, handleRegisterController };