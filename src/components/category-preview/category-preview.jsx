import "./category-preview.styles.scss";
import {ProductCard} from "../product-card/product-card.component";
import {Link, useParams} from "react-router-dom";

export const CategoryPreview=({title,products})=>{

    // console.log('title',title);
    return(
        <div className='category-preview-container'>
            <h2>
                <Link className='title' to={title}>{title.toUpperCase()}</Link>
            </h2>

            <div className='preview'>
                {
                    products.filter((_,idx)=>idx<4)
                        .map(product=><ProductCard key={product.id} product={product}  />)

                }


            </div>

        </div>
    )
}