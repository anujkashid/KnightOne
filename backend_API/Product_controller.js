const product_model = require('./Product_model');

// POST API - Add Product
const Addproduct = async (req, res) => {
    const { pname, price, color, size, rating } = req.body;

    try {
        // Ensure color and size are objects
        const ProductData = new product_model({
            image: req.file.filename,
            pname,
            price,
            color: typeof color === 'string' ? JSON.parse(color) : color, // Parse color if it's a string
            size: typeof size === 'string' ? JSON.parse(size) : size,     // Parse size if it's a string
            rating,
        });

        const data = await ProductData.save();
        res.status(200).send({ data, message: "Product added successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Error adding product" });
    }
};

// GET API - Get All Products
const Getproduct = async (req, res) => {
    try {
        const data = await product_model.find({});
        res.status(200).send({ data });
    } catch (err) {
        res.status(400).send(err);
        console.log(err);
    }
}; 

// GET API - Find Product by ID
const GetproductById = async (req, res) => {
    try {
        const { id } = req.params;
        const productData = await product_model.findOne({ _id: id });
        res.status(200).send({ productData });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Error fetching product" });
    }
};

// DELETE API - Delete Product by ID
const Deleteproduct = async (req, res) => {
    try {
        const data = await product_model.deleteOne({ _id: req.params._id });
        res.status(200).send({ data, message: "Product deleted successfully" });
    } catch (err) {
        res.status(500).send(err);
    }
};

// UPDATE API - Update Product by ID
const Updateproduct = async (req, res) => {
    const { pname, price, color, size, rating } = req.body;

    try {
        const updatedData = await product_model.updateOne(
            { _id: req.params._id },
            {
                $set: {
                    image: req.file.filename,
                    pname,
                    price,
                    color: typeof color === 'string' ? JSON.parse(color) : color, // Parse color if it's a string
                    size: typeof size === 'string' ? JSON.parse(size) : size,     // Parse size if it's a string
                    rating,
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

// Update API
// const update = async (req, res) => {
//     const { name, rollno, email } = req.body;
//     try {
        

//         const data = await model.updateOne(
//             { _id: req.params._id }, 
//             {
//                 $set: {
//                     name,
//                     rollno,
//                     email,
//                     image: req.file.filename 
//                          }
//             }, 
//         );

//         if (data) {
//             res.status(200).send({ message: "User updated found" });
//         } else {
//             res.status(404).send({ message: "User not found" });
//         }
//     } catch (err) {
//         console.log(err);
//         res.status(500).send({ message: "Internal server error" });
//     }
// };

module.exports = { Addproduct, Getproduct, GetproductById, Deleteproduct, Updateproduct };
