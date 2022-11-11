const express = require('express');

const imagesController = require('../controller/images');

const router = express.Router();

router.get('/', imagesController.getAllImages);

router.get('/:id', imagesController.getImage);

router.post('/', imagesController.addImage);

// router.delete('/:id', imagesController.deleteImage);

module.exports = router;