import slugify from "slugify";
import productModel from "../models/productModel.js";
import fs from "fs";
import colors from "colors";

export const createProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;

    const { photo } = req.files;

    // validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case !photo && photo.size < 1000000:
        return res
          .status(500)
          .send({ error: "Photo is Required and should be less than MB" });
    }

    const products = await new productModel({
      ...req.fields,
      slug: slugify(name),
    });

    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }

    await products.save();

    res.status(201).send({
      success: true,
      message: "Products created successfully",
      products,
    });
  } catch (error) {
    console.log(colors.red(error.red));
    res.status(500).send({
      success: false,
      message: `Internal Server Error (500) (createProductController)`.bgRed,
      error,
    });
  }
};

// get products
export const getProductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });

    console.log(`${products}`.green);
    res.status(200).send({
      success: true,
      message: "Get all data Successfully",
      products,
      countTotal: products.length,
    });
  } catch (error) {
    console.log(`${error}: 500`.red);
    res.status(500).send({
      success: false,
      message: "Internal Server Error (500) (getProductController)",
      error: error.message.red,
    });
  }
};

export const getSingleProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    // findOne is mongoose function, retrieve single document from collection
    // based on criteria object passed in findOne
    console.log(`getSingleProductController: ${product.category}`);
    res.status(200).send({
      success: true,
      message: "Single product fetch successfully",
      product,
    });
  } catch (error) {
    console.log(error.red);
    res.status(500).send({
      success: false,
      message: "Internal Server Error (500) (getSingleProductController)".red,
      error,
    });
  }
};

export const productPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");
    console.log(product);
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error.red);
    res.status(500).send({
      success: false,
      message: "Internal Server Error 500 (Error while getting photo)".red,
      error,
    });
  }
};

export const deleteProductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: `Product deleted successfully`.green,
    });
  } catch (error) {
    console.log(`${error}`.red);
    res.status(500).send({
      success: false,
      message: `Internal Server Error (500) (deleteProductController)`.red,
      error,
    });
  }
};

export const updateProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;

    const { photo } = req.files;

    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case !photo && photo.size < 1000000:
        return res
          .status(500)
          .send({ error: "Photo is Required and should be less than MB" });
    }

    const products = await productModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );

    console.log(`${photo}`.bgYellow);

    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }

    await products.save();
    res.status(201).send({
      success: true,
      message: `Product updated successfully`.green,
      products,
    })

  } catch (error) {
    console.log(`${error}`.red);
    res.status(500).send({
      success: false,
      message: `Internal Server Error (500) (updateProductController)`.red,
      error,
    });
  }
};