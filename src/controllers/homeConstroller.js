import { connection } from "../mysqlConnection";

const handleHomeController = async (req, res) => {
    try {
        const [rows, fields] = await connection.execute('SELECT username, email FROM user');
        return res.status(201).json({ message: '', userLists: rows });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Error creating user' });
    }
}

const handleUserPageController = (req, res) => {
    console.log("res", res);
    return res.render('user.ejs');
}

const handleCreateUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

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

        await connection.execute(
            'INSERT INTO user (username, email, password) VALUES (?, ?, ?)',
            [username, email, password]
        );
        console.log('User created successfully');
        return res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Error creating user' });
    }
}

const handleDeleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await connection.execute('DELETE FROM user WHERE id = ?', [id]);
        return res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Error deleting user' });
    }
}

const handleUpdateUser = async (req, res) => {
    try {
        const { id, username, email } = req.body;
        await connection.execute(
            'UPDATE user SET username = ?, email = ? WHERE id = ?',
            [username, email, id]
        );
        return res.status(200).json({ message: 'User updated successfully' });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Error updating user' });
    }
}

export { handleHomeController, handleUserPageController, handleCreateUser, handleDeleteUser, handleUpdateUser };