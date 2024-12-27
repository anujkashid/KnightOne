const Plan_model = require('./Plan_model')

// POST API
const Addplan = async (req, res) => {
    const {name, desc1, desc2, desc3, desc4,  desc5,  desc6,  desc7, price, } = req.body;
    try{
        const ServiceData = new Plan_model({
            name,
            desc1,
            desc2,
            desc3,
            desc4,
            desc5,
            desc6,
            desc7,
            price,
        })
        const data = await ServiceData.save()
        res.status(200).send({data})
    
    }
    catch(err) {
        console.log(err);
    }
}

// GET APIs
const Getplan = async (req, res) => {
    try{
        const data = await Plan_model.find({})
        res.status(200).send({data})
    }

catch (err) {
    res.status(400).send(err)
    console.log(err)
}
}

// UPDATE API
const Updateplan = async (req, res) => {
    const { 
        name,
            desc1,
            desc2,
            desc3,
            desc4,
            desc5,
            desc6,
            desc7,
            price,
    } = req.body;
    try {


        const data = await Plan_model.updateOne(
            { _id: req.params._id },
            {
                $set: {
            name,
            desc1,
            desc2,
            desc3,
            desc4,
            desc5,
            desc6,
            desc7,
            price,
                }
            },
        );

        if (data) {
            res.status(200).send({ message: "Data Updated Successfully" });
        } else {
            res.status(404).send({ message: "Can Not User" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal server error" });
    }
};


// DELETE API
const Deleteplan = async (req, res) => {

    try {
        const {id} = req.params;
        const data = await Plan_model.deleteOne({ _id: id })
        res.status(200).send(data)
    } catch (err) {
        res.status(500).send(err)
    }
}
module.exports = { Addplan, Getplan, Deleteplan, Updateplan};