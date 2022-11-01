import "./category.styles.scss";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {ProductCard} from "../../product-card/product-card.component";
import {useSelector} from "react-redux";
import {Spinner} from "../../spinner/spinner.component";
import {FormInput} from "../../form-input/form-input.component";
import {StatusComponent} from "../../status/status.component";

export const Category = () => {

    const {category} = useParams();
    const categories = useSelector(state => state.categories.categories);
    const categoriesMap = categories.reduce((acc, category) => {
        const {title, items} = category;
        acc[title.toLowerCase()] = items;
        return acc;
    }, {});

    const [products, setProducts] = useState(categoriesMap[category]);
    const [search, setSearch] = useState('');
    const [filteredItems, setFilteredItems] = useState(products);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        setProducts(categoriesMap[category])
    }, [category, categoriesMap]);

    const handleSearch = (e) => {
        setLoading(true);
        const searchItem = e.target.value.toLocaleLowerCase();
        let newFilteredItemsOnSearch;
        setTimeout(() => {
            newFilteredItemsOnSearch = products?.filter((product) => {
                return product?.name.toLocaleLowerCase().includes(searchItem);
            });
            setLoading(false);
            setFilteredItems(newFilteredItemsOnSearch)
        }, 2000);

        setSearch(searchItem);
    };
    return (
        <>
            <div className='main-container'>
                <div className='searchBar'>
                    <FormInput label='' type='search' placeholder='Search'
                               value={search} onChange={handleSearch}/>
                </div>

                <h2 className="category-title"> {category.toUpperCase()} ({filteredItems?.length}) </h2>
            </div>
            {loading && <Spinner/>}

            {!loading &&
                <div className='category-container'>

                    {
                        filteredItems &&
                        filteredItems?.map((product) => <ProductCard key={product?.id} product={product}/>)

                    }

                    {
                        (!filteredItems || filteredItems.length === 0) &&
                        <StatusComponent message={'No Searched Item Found'}/>
                    }

                </div>
            }

        </>
    )
}