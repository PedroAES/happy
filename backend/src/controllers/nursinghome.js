const NursingHome = require("../models/NursingHome");

class NursingHomeController {
  async show(req, res) {
    const data = await NursingHome.findById(req.params.id).populate({path: 'images'});
    return res.json(data);
  }
  async index(_, res) {
    const data = await NursingHome.find({});
    return res.json(data);
  }

  async create(req, res){
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
    } = req.body;

    const requestImages = req.files;
    const images = requestImages.map(image =>{
      return { path: `http://192.168.1.5:3001/uploads/${image.filename}` }
    });
    
    const data = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      images
    };

    const nursingHome = NursingHome.create(data);

    return res.status(201).json(nursingHome);

  }
}

module.exports = new NursingHomeController();