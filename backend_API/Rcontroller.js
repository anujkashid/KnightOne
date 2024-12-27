const rmodel = require('./Rmodel')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// POST API
const Adduser = async (req, res) => {
    const { fname, lname, mnumber, gender, username, city, state, zip, address, password } = req.body;
    
    try {
        // Check if the student already exists
        let user = await rmodel.findOne({ username });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new student instance
        const RegistrationData = new rmodel({
            fname,
            lname,
            mnumber,
            gender,
            username,
            city,
            state,
            zip,
            address,
            password: hashedPassword,
            
        })
        // const data = await RegistrationData.save()
        // res.status(200).send({ data })
          await RegistrationData.save()

        // Generate a JWT token
        const token = jwt.sign(
            { userId: RegistrationData._id }, 
            process.env.JWT_SECRET, // Add a JWT_SECRET to your environment variables
            { expiresIn: '1h' }
        );

        // Respond with the token
        res.json({ token });
    }catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// User Login
const Login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if the student exists
        let user = await rmodel.findOne({ username });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Check if the password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Generate a JWT token
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET, // Add a JWT_SECRET to your environment variables
            { expiresIn: '1h' }
        );

        // Respond with the token
        res.json({ 
            fname: user.fname,
            lname: user.lname,
            id: user._id,
            token : token
         });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};


// GET APIs
const Getuser = async (req, res) => {
    try {
        const data = await rmodel.find({})
        res.status(200).send({ data })
    }

    catch (err) {
        res.status(400).send(err)
        console.log(err)
    }
}
// GET API ONLY FIND ONE
const GetuserById = async (req, res) => {
    try {
        const { id } = req.params
        const userData = await model.findOne({ _id: id })
        res.status(200).send({ userData })

    } catch (err) {
        // res.status(400).send(err)
        console.log(err)
    }
}

// DELETE API
const Deleteuser = async (req, res) => {

    try {
        const data = await rmodel.deleteOne({ _id: req.params._id })
        res.status(200).send({ data })
    } catch (err) {
        res.status(500).send(err)
    }
}

// UPDATE API
const Updateuser = async (req, res) => {
    const { fname,
        lname,
        mnumber,
        gender,
        username,
        city,
        state,
        zip,
        address,
        password,
        confirmpassword,} = req.body;
    try {


        const data = await rmodel.updateOne(
            { _id: req.params._id },
            {
                $set: {
                    fname,
            lname,
            mnumber,
            gender,
            username,
            city,
            state,
            zip,
            address,
            password,
            confirmpassword,
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
module.exports = { Adduser, Login, Getuser, GetuserById, Deleteuser, Updateuser }
