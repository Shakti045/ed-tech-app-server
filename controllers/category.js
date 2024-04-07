import { Category } from "../models/category.js";
import { Course } from "../models/course.js";
import { User } from "../models/user.js";

export const createCategory = async (req, res) => {
     try {
        const {role} = req.user;
        if(role!='admin'){
            return res.status(400).json({
                success:false,
                message:'Only admin can create category'
            })
        }
        const { title } = req.body;
        if (!title) {
        return res.status(404).json({
            success: false,
            message: "Please provide title"
        });
        }
        const category = await Category.create({ title });
        return res.status(200).json({
        success: true,
        message: "Category created successfully",
        data: category
        });
    } catch (error) {
        console.log("Error in creating category", error);
        return res.status(500).json({
        success: false,
        message: "Internal server error"
        });
    }
};

export const getCategories = async (req, res) => {
    try {
        const categories = await Category.findAll();
        return res.status(200).json({
            success: true,
            data: categories
        });
    } catch (error) {
        console.log("Error in getting categories", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

export const deleteCategory = async (req, res) => {
    try {
        const { role } = req.user;
        if (role != "admin") {
            return res.status(400).json({
                success: false,
                message: "Only admin can delete category"
            });
        }
        const { id ,categoryid} = req.params;
        if (!categoryid) {
            return res.status(404).json({
                success: false,
                message: "Please provide category id"
            });
        }
        const category = await Category.findOne({ where: { id:categoryid} });
        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }
        await category.destroy();
        return res.status(200).json({
            success: true,
            message: "Category deleted successfully"
        });
    } catch (error) {
        console.log("Error in deleting category", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

export const updateCategory = async (req, res) => {
    try {
        const { role } = req.user;
        if (role != "admin") {
            return res.status(400).json({
                success: false,
                message: "Only admin can update category"
            });
        }
      
        const { title , id } = req.body;
        if (!id || !title) {
            return res.status(404).json({
                success: false,
                message: "Please provide category id and title"
            });
        }
        const category = await Category.findOne({ where: { id } });
        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }
        await category.update({ title });
        return res.status(200).json({
            success: true,
            message: "Category updated successfully",
            data: category
        });
    } catch (error) {
        console.log("Error in updating category", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error,please try again later"
        });
    }
};


export const categoryRelatedCourses = async (req, res) => {
    try {
        const { categoryid } = req.params;
        if (!categoryid) {
            return res.status(404).json({
                success: false,
                message: "Please provide category id"
            });
        }
        const category = await Category.findOne({ where: { id:categoryid } });
        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }
        const courses = await Course.findAll({ where: { belongstocategory: categoryid },include:[
            {
                model:User,
                attributes:['name','email','profilepic'],
                as:'creator'
            }
        
        ]});
        return res.status(200).json({
            success: true,
            data: courses
        });
    } catch (error) {
        console.log("Error in getting category related courses", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}