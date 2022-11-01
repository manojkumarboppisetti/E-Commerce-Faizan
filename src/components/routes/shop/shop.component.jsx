import './shop.styles.scss'
import {Route, Routes, Outlet} from "react-router-dom";
import {useDispatch} from "react-redux";
import {CategoriesPreview} from "../categories-preview/categories-preview";
import {Category} from "../category/category.component";
import {useEffect} from "react";
import {fetchCategoriesStart,} from "../../../store/categories/category.action";

export const Shop = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategoriesStart());
    }, [dispatch]);

    return (
        <>
            <Routes>
                <Route index element={<CategoriesPreview/>}/>
                <Route path=':category' element={<Category/>}/>
            </Routes>
        </>
    )
}







