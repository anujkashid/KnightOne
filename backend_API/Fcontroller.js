const fmodel = require('./Fmodel')

// POST API
const Adduser = async (req, res) => {
    const {Name, Email, Subject, Message} = req.body;
    try{
        const ServiceData = new fmodel({
            Name,
            Email,
            Subject,
            Message
        })
        const data = await ServiceData.save()
        res.status(200).send({data})
    
    }
    catch(err) {
        console.log(err);
    }
}

// GET APIs
const Getuser = async (req, res) => {
    try{
        const data = await fmodel.find({})
        res.status(200).send({data})
    }

catch (err) {
    res.status(400).send(err)
    console.log(err)
}
}

// UPDATE API
const Updatefeedback = async (req, res) => {
    const { 
        Name,
        Email,
        Subject,
        Message,
    } = req.body;
    try {


        const data = await fmodel.updateOne(
            { _id: req.params._id },
            {
                $set: {
                    Name,
                    Email,
                    Subject,
                    Message,
                }
            },
        );

        if (data) {
            res.status(200).send({ message: "Data Updated Successfully" });
        } else {
            res.status(404).send({ message: "Can Not Get User" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal server error" });
    }
};

// DELETE API
const Deletefeedback = async (req, res) => {

    try {
        const data = await fmodel.deleteOne({ _id: req.params._id })
        res.status(200).send({ data })
    } catch (err) {
        res.status(500).send(err)
    }
}

module.exports = { Adduser, Getuser, Updatefeedback, Deletefeedback};