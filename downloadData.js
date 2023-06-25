// const express = require('express');
// const multer = require('multer');

// const app = express();
// const upload = multer({ dest: 'uploads/' });

// // Обработка POST запроса на /upload
// app.post('/upload', upload.single('file'), (req, res) => {
//   if (!req.file) {
//     res.status(400).send('Не выбран файл для загрузки.');
//   } else {
//     res.send('Файл успешно загружен.');
//     console.log("asdasd")
//   }
// });