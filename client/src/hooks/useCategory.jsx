import { useState, useEffect } from "react";
import axios from "axios";

export default function useCategory(){
    const [categories, setCategories] =  useState([]);

    const getCategories = async () => {
        try{
            const {data} = await axios.get(`/api/v1/category/get-category`);

            if(data?.success){
                // console.log(data?.category);
                setCategories(data?.category);
            }else{
                console.log(data.message);
            }
        }catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        getCategories();
    },[])

    return categories;

}