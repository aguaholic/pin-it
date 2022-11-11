const { v4: uuidv4 } = require('uuid');
const Image = require('../models/image');

const getAllImages = async (req, res, next) => {
  let images;
  try {
    images = await Image.find();
  } catch(err) {
    const error = new Error('Could not find images.');
    error.code = 404;
    return next(error);
  }
  res.json(images);
}

const getImage = async (req, res, next) => {
  const imageId = req.params.id;
  let image;

  try {
    image = await Image.findById(imageId);
  } catch(err) {
    const error = new Error('Could not find the requested image.');
    error.code = 404;
    return next(error);
  }
  
  if (!image) {
    const error = new Error('Could not find the requested image.');
    error.code = 404;
    return next(error);
  }
  
  res.json(image);
}

const addImage = async (req, res, next) => {
  const { url, title, description, tags } = req.body;
  const createdImage = new Image({
    uuidv4,
    url,
    title,
    description,
    tags,
  });

  try {
    await createdImage.save();
  } catch (err) {
    const error = new Error('Could not create image.');
    return next(error);
  }

  res
    .status(201)
    .json({ image: createdImage })
}

// const deleteImage = () => async (req, res, next) => {
//   console.log(req)
//   const { id } = req.params;
//   await Image.deleteOne({ _id: id })

//   res.status(200).json({ message: 'Deleted image.' });
// };


exports.getAllImages = getAllImages;
exports.getImage = getImage;
exports.addImage = addImage;
// exports.deleteImage = deleteImage;
