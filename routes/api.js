var express = require('express');
var router = express.Router();
var agendaModel = require('../models/agendaModel');
var cloudinary = require('cloudinary').v2;
var nodemailer = require('nodemailer');


// AGENDA

router.get('/agenda', async function (req, res, next) {

    let agenda = await agendaModel.getAgenda();

    agenda = agenda.map(agenda => {
        if (agenda.img_id) {
            const imagen = cloudinary.url(agenda.img_id, {
                width: 960,
                height: 200,
                crop: 'fill' // fill = relleno / pad = ajustado al tamaño
            });
            return {
                ...agenda,
                imagen
            }
        } else {
            return {
                ...agenda,
                imagen: ''
            }
        }
    });

    res.json(agenda);
});


// FOMRULARIO CONTACTO

router.post('/contacto', async (req, res) => {
    const mail = {
        to: 'pabloivan84@gmail.com',
        subject: 'Contacto web',
        html: `${req.body.nombre} se contacta solicitando adherirse al newsletter al correo: ${req.body.mail} <br>Comentario: ${req.body.comentanos}`
    }

    const transport = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        } 
    });

    await transport.sendMail(mail)

    res.status(201).json({
        error: false,
        message: 'Mensaje enviado'
    });


});

module.exports = router;