const {Router} = require('express');
const { validarADMIN_ROLE, validarJWT } = require('../middlewares/validar-jwt.middleware');
const { create, getAll, edit } = require('../controllers/inventory.controllers');

const router = Router();

router.get('/:category', //[ validarJWT, validarADMIN_ROLE], 
getAll );

router.post('/:category/register', //[ validarJWT, validarADMIN_ROLE ], 
create);


router.post('/:category/update', //[ validarJWT, validarADMIN_ROLE ], 
edit);


module.exports = router;