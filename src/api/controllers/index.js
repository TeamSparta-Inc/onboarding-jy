model = require('../models')

async function getText(req, res) {
    const result = await model.TextModel.find();
    res.json({success: true, data: {result}});
}

async function postText(req, res) {
    const goalText = req.body.text || '';
    const data_exists = await model.TextModel.findOne({
        "text": goalText
    });
    if (data_exists){
        res.json({success: false, resp: "text already exists"});
        return;
    }
    const input_data = new model.TextModel({
        "text": goalText,
        "created_at": new Date()
    })
    const result = await model.TextModel.create(input_data);
    try {
        res.json({success: true, result});
    } catch (err) {
        res.status(500).json({success: false, error: "Unknown error."});
    }
}

module.exports = {
    getText,
    postText,
};