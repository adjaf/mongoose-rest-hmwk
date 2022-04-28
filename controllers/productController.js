const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.getAllProducts = function (req, res) {
    Product.find(function (err, product) {
        if (!product) {
            return res.status(404).json({ err: 'Not found' });
        }
        return res.json({ product });
    });
}

exports.findProduct = async function (req, res) {
    const id = req.params.id;

    const product = await Product.findById(id);

    if (!product) {
        return res.status(404).json({ err: 'Not found' });
    }

    return res.json({ product });
}

exports.createProduct = function (req, res) {
    const newProduct = new Product(req.body);

    newProduct.save(function (err, product) {
        if (err) {
            return res.status(400).json({ err });
        }

        return res.json({ product });
    });


}

exports.updateProduct = function (req, res) {
    const id = req.params.id;
    const body = req.body;

    Product.findByIdAndUpdate(id, body, function (err, product) {
        if (err) {
            return res.status(400).json({ err });
        }
        if (!product) {
            return res.status(404).json({ err: 'Not found' });
        }

        return res.json({ product });
    });

}

exports.deleteProduct = async function (req, res) {
    const prodId = req.params.id;
    
    Product.findById(prodId, async function(err, product) {
        if (err) {
            return res.status(400).json({ err });
        }

        if (!product) {
            return res.status(404).json({ err: 'Not found' });
        }
        
        // Delete pet
        await product.remove();
    
        return res.json({ message: 'Deleted '});
    });
    
}