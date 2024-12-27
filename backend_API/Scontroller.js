const smodel = require('./Smodel')

// POST API
const Addservices = async (req, res) => {
    const {title, desc} = req.body;
    try{
        const ServiceData = new smodel({
            title, 
            desc,
            icon : req.file.filename,
        })
        const data = await ServiceData.save()
        res.status(200).send({data, message: "Service added successfully" })
    
    }
    catch(err) {
        console.log(err);
    }
}


// GET API
const Getservices = async (req, res) => {
    try{
        const data = await smodel.find({})
        res.status(200).send({data})
    }

catch (err) {
    res.status(400).send(err)
    console.log(err)
}
}

// DELETE API
const Deleteservice = async (req, res) => {

    try {
        const {_id} = req.params;
        const data = await smodel.deleteOne({ _id: _id })
        res.status(200).send(data)
    } catch (err) {
        res.status(500).send(err)
    }
}

// UPDATE API - Update Product by ID
const Updateservice = async (req, res) => {
    const { title, desc} = req.body;

    try {
        const updatedData = await smodel.updateOne(
            { _id: req.params._id },
            {
                $set: {
                    title,
                    desc,
                    icon : req.file.filename,
                },
            }
        );

        if (updatedData.modifiedCount > 0) {
            res.status(200).send({ message: "Product updated successfully" });
        } else {
            res.status(404).send({ message: "Product not found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal server error" });
    }
};
module.exports = { Addservices, Getservices, Deleteservice, Updateservice }