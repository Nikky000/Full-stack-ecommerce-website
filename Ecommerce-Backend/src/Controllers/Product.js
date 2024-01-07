const Products = require('../Model/Product');
const ErrorHandling = require('../../utils/Errorhandling')
const catchAsyncError = require('../../middleware/catchAsyncError')
const FeatureApi = require('../../utils/FeatureApi')
const cloudinary = require('cloudinary');


//get the products
const getAllProduct = catchAsyncError(async (req, res, next) => {
    const resultPerPage = 6;
    const totalProduct = await Products.countDocuments();

    const apiFeature = new FeatureApi(Products.find(), req.query).search().filter();
    let products = await apiFeature.query;
    const totalFilterProduct = products.length;
    apiFeature.pagination(resultPerPage);
    products = await apiFeature.query.clone();
    res.json({
        success: true,
        products,
        totalProduct,
        totalFilterProduct,
        resultPerPage
    });
});


//get all  products --admin
const getAllAdminProducts = catchAsyncError(async (req, res, next) => {
    const products = await Products.find();
    res.json({
        success: true,
        products
    });
});

//create or update the review
const createProductReview = catchAsyncError(async (req, res, next) => {
    const { productId, comment, rating } = req.body;
    const review = {
        user: req.user._id,
        name: req.user.name,
        comment,
        rating: Number(rating)
    };

    const product = await Products.findById(productId);

    const isReviewed = product.reviews.find(
        (rev) => rev.user.toString() === req.user._id.toString()
    );
    if (isReviewed) {
        product.reviews.forEach((rev) => {
            if (rev.user.toString() === req.user._id.toString()) {
                rev.comment = comment;
                rev.rating = rating;
            }
        });
    } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }
    let totalRating = 0;
    product.reviews.forEach((rev) => {
        totalRating += rev.rating;
    });
    product.ratings = totalRating / product.reviews.length;
    await product.save({ validBeforeSave: false });
    res.status(200).json({
        success: true,
        message: "Reviewed Successfully"
    });
});
//getting all review
const getAllReview = catchAsyncError(async (req, res, next) => {
    const product = await Products.findById(req.query.product_Id);
    if (!product) {
        return next(new ErrorHandling(400, "Product not found"));
    };
    const reviews = product.reviews;
    res.status(200).json({
        success: true,
        reviews
    });
});
//Deleting the review
const deleteProductReview = catchAsyncError(async (req, res, next) => {
    const product = await Products.findById(req.query.product_Id);
    if (!product) {
        return next(new ErrorHandling(400, "Product not found"));
    };
    product.reviews = product.reviews.filter((rev) => {
        return rev._id.toString() !== req.query.review_Id;
    });
    product.numOfReviews = product.reviews.length;
    let totalRating = 0;
    product.reviews.forEach((rev) => {
        totalRating += rev.rating;
    });
    if(product.reviews.length!=0){
    product.ratings = totalRating / product.reviews.length;
    }else{
        product.ratings=0;
    }
    
    await product.save({ validBeforeSave: false });
    res.status(200).json({
        success: true,
        message: "Successfully Deleted"
    })
})

// Only Admin

//for creating new product
const createProduct = catchAsyncError(async (req, res, next) => {
    let img = [];
    if (typeof req.body.images === 'string') {
        img.push(req.body.images);
    } else {
        img = req.body.images;
    }
    const imageLinks = [];
    for (let i = 0; i < img.length; i++) {
        const mycloud = await cloudinary.v2.uploader.upload(img[i], {
            folder: "Products",
        });
        imageLinks.push({ public_id: mycloud.public_id, url: mycloud.secure_url });
    }
    req.body.images = imageLinks;
    req.body.user = req.user.id;
    const product = await Products.create(req.body);
    res.json({
        success: true,
        product
    })
});

//for deleting product by Id
const deleteProduct = catchAsyncError(async (req, res, next) => {

    let product = await Products.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandling(404, 'Product not found'));
    }
    // images deleted from cloudinary
    for (let i = 0; i < product.images.length; i++) {
        await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    product = await Products.findByIdAndDelete(req.params.id);

    res.json({
        success: true,
        product
    })

});

//for update product by Id
const updateProduct = catchAsyncError(async (req, res, next) => {

    let product = await Products.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandling(404, 'Product not found'));
    }
    //for images
    if ( req.body.images !== undefined) {
        for (let i = 0; i < product.images.length; i++) {
            await cloudinary.v2.uploader.destroy(product.images[i].public_id);
        }

        let img = [];
        if (typeof req.body.images === 'string') {
            img.push(req.body.images);
        } else {
            img = req.body.images;
        }
        const imageLinks = [];
        for (let i = 0; i < img.length; i++) {
            const mycloud = await cloudinary.v2.uploader.upload(img[i], {
                folder: "Products",
            });
            imageLinks.push({ public_id: mycloud.public_id, url: mycloud.secure_url });
        }
        req.body.images = imageLinks;
    }

    // now updating
    product = await Products.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });
    res.json({
        success: true,
        product
    })

});

//get the detail of product by Id
const getProductDetails = catchAsyncError(async (req, res, next) => {
    let product = await Products.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandling(404, 'Product not found'));
    }
    res.json({
        success: true,
        product
    })
});

module.exports = {
    getAllProduct,
    createProduct,
    deleteProduct,
    updateProduct,
    getProductDetails,
    createProductReview,
    getAllReview,
    deleteProductReview,
    getAllAdminProducts
}