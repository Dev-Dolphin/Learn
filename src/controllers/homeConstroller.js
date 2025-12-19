import { connection } from "../mysqlConnection";

const handleHomeController = (req, res) => {
    return res.render('home.ejs');
}

const handleUserPageController = (req, res) => {
    console.log("res", res);
    return res.render('user.ejs');
}

const handleCreateUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        await connection.execute(
            'INSERT INTO user (username, email, password) VALUES (?, ?, ?)',
            [username, email, password]
        );
        console.log('User created successfully');
        return res.redirect('/users');
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Error creating user' });
    }
}

export { handleHomeController, handleUserPageController, handleCreateUser };