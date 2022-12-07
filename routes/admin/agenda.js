var express = require('express');
var router = express.Router();
var agendaModel=require('../../models/agendaModel');
var util = require('util');
var cloudinary = require('cloudinary').v2;
const uploader = util.promisify(cloudinary.uploader.upload);
const destroy = util.promisify(cloudinary.uploader.destroy);



/* GET home page. */
router.get('/', async function(req, res, next) {

  var agenda=await agendaModel.getAgenda();

  agenda = agenda.map(agendado => {
    if (agendado.img_id) {
      const imagen = cloudinary.image(agendado.img_id, {
        width: 80,
        height: 80,
        crop: 'fill' // fill = relleno / pad = ajustado al tamaño
      });
      return {
        ...agendado,
        imagen
      }
    } else {
      return {
        ...agendado,
        imagen: ''
      }
    }
  });
  
  res.render('admin/agenda', {
    layout: 'admin/layout',
    persona: req.session.nombre,
    agenda
  });
});


/* agregar evento */

router.get('/agregar', (req, res, next) => {
  
  res.render('admin/agregar', {
    layout: 'admin/layout',
  });
});

router.post('/agregar', async (req, res, next) => {
  try {

    var img_id = '';
    console.log(req.files.imagen);

    if (req.files && Object.keys(req.files).length > 0) {
      imagen = req.files.imagen;
      img_id = (await uploader (imagen.tempFilePath)).public_id;
    }

    // console.log(req.body)
    if (req.body.fecha != "" && req.body.local != "" && req.body.ciudad != "" ){
      await agendaModel.insertEvento({
        ...req.body,
        img_id
    });
      res.redirect('/admin/agenda')
    } else {
      res.render('admin/agregar', {
        layout: 'admin/layout',
        error: true,
        message: 'Llenar todos los campos'
      })
    }
  } catch (error) {
    console.log(error)
    res.render('admin/agregar', {
      layout: 'admin/layout',
      error: true,
      message: 'Error al agregar evento'
    })
  }
})


/* eliminar evento */

router.get('/eliminar/:id', async (req, res, next) => {
  
  var id = req.params.id;

  let agendado = await agendaModel.getAgendaById(id);
  if (agendado.img_id) {
    await (destroy(agendado.img_id));
  }

  await agendaModel.deleteAgenda(id);
  res.redirect('/admin/agenda');
});


/* editar evento */

router.get('/editar/:id', async (req, res, next) => {
  
  var id = req.params.id;
  console.log(req.params.id);
  var agenda = await agendaModel.getAgendaById(id);

  res.render('admin/editar', {
    layout: 'admin/layout',
    agenda
  })

});

router.post('/editar', async (req, res, next) => {
  try {
    let img_id = req.body.img_original;
    let borrar_img_vieja = false;

    if (req.body.img_delete === '1') {
      img_id = null;
      borrar_img_vieja = true;
    } else {
      if (req.files && Object.keys(req.files).length > 0) {
        imagen = req.files.imagen;
        img_id = (await uploader(imagen.tempFilePath)).public_id;
        borrar_img_vieja = true;
      }
    }

    if (borrar_img_vieja && req.body.img_original) {
      await (destroy(req.body.img_original));
    }

    var obj = {
      fecha: req.body.fecha,
      local: req.body.local,
      ciudad: req.body.ciudad,
      img_id
    } 
    
    console.log(obj)
    console.log(req.body.id)

    await agendaModel.editarAgendaById(obj, req.body.id);
    res.redirect('/admin/agenda');
    
  } catch (error) {
    console.log(error)
    res.render('admin/editar', {
      layout: 'admin/layout',
      error: true,
      message: 'no fue posible editar el evento'
    })
  }
})





module.exports = router;