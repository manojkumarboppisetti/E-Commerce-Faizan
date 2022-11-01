import styled from "styled-components";
import {Link} from "react-router-dom";


export const NavigationContainer = styled.div`
    height: 70px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 25px;
  
    
   
 
`;
export const LogoContainer = styled(Link)`
       height: 100%;
       width: 70px;
       padding: 25px;

`;

export const NavLinks = styled.div`
      width: 40%;
      height: 100%;
      display: flex;
      align-items: center;
      padding-top:33px;
      justify-content: flex-end;
      
    
  
`;

export const NavLink = styled(Link)`
 padding: 9px 15px;
 cursor: pointer;
 border:1px solid green;
`;







