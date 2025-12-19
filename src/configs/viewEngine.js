import express from 'express';

const configureViewEngine = (app) => {
    // cau hinh view engine - hiển thị html cho node

    app.use(express.static('./src/public'));
    app.set('view engine', 'ejs');
    app.set('views', './src/views');
}

export default configureViewEngine;