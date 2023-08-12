import categoryModel from '../models/categoryModel.js'
import slugify from 'slugify';

export const createCategoryController = async(req, res) => {
    try{
        const {name} = req.body;
        if(!name){
            return res.status(401).send({
                message: 'Name is Required',
            })
        }

            const existingCategory = await categoryModel.findOne({name})
            if(existingCategory){
                return res.status(200).send({
                    success: true,
                    message: 'Category already Exists',
                })
            }

            const category = await new categoryModel({name, slug: slugify(name)}).save();
            res.status(201).send({
                success: true,
                message: 'Category created successfully',
                category,
            })
            
        

    }catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Internal server Error (Error in create Category)'.red,
            error,
        })
    }
}


export const updateCategoryController = async(req, res) => {
    try{
        const {name} = req.body;
        const {id} = req.params;
        const category = await categoryModel.findByIdAndUpdate(id, {name, slug: slugify(name)}, {new: true});

        res.status(200).send({
            success: true,
            message: 'category updated successfully',
            category,
        })
    
    }catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Failed to update the category - 500'.red,
        })
    }
}

export const categorycontroller = async (req, res) => {
    try{
        const category = await categoryModel.find({});
        res.status(200).send({
            success: true,
            message: 'All categories list fetched',
            category,
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Failed to Fetch Category Data - 500'.red,
            error,
        })
    }
}


export const singleCategoryController = async(req, res) => {
    try{
        const category = await categoryModel.findOne({slug: req.params.slug});
        res.status(200).send({
            success: true,
            message: 'Get single category successfully',
            category,
        })

    }catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Internal server error (500) (Single Category Controller)'.red,
            error,
        })
    }
}


export const deleteCategoryController = async (req, res) => {
    try{
        const {id} = req.params;
        const category = await categoryModel.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            message: 'Delete Category from List successfully'.green,
            category,
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Internal Server Error (500) (deleteCategoryController'.red,
            error,
        })
    }
}