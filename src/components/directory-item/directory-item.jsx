import {BackgroundImage,Body,DirectoryItemContainer} from "./directory-item.styles";
import {useNavigate} from "react-router-dom";

export const DirectoryItem=({category})=>{
    const {imageUrl,title,route}=category;

    const navigate=useNavigate();

    const onNavigateHandler=()=>navigate(route)

    return(
        <DirectoryItemContainer onClick={onNavigateHandler}>
        <BackgroundImage imageUrl={imageUrl}/>
         <Body>
        <h1>{title}</h1>   
        <p>Shop Now</p> 
   </Body>
   </DirectoryItemContainer>
    )
}