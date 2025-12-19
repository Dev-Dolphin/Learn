
const handleHomeController = (req, res) => {
    return res.render('home.ejs');
}

const handleUserPageController = (req, res) => {
    return res.render('user.ejs');
}

export { handleHomeController, handleUserPageController };