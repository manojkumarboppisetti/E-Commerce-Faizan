import {selectCategoriesIsLoading, selectCategoriesMap} from "../../../store/categories/category.selector";
import {CategoryPreview} from "../../category-preview/category-preview";
import {useSelector} from "react-redux";
import {Spinner} from "../../spinner/spinner.component";

export const CategoriesPreview = () => {
    const categoriesMap = useSelector(selectCategoriesMap);

    const isLoading = useSelector(selectCategoriesIsLoading);
    return (
        <>
            {
                isLoading ? <Spinner/> :
                    (Object.keys(categoriesMap).map((title) => {
                            const products = categoriesMap[title];

                            return <CategoryPreview key={title} title={title} products={products}/>
                        }
                    ))
            }

        </>
    )
}







