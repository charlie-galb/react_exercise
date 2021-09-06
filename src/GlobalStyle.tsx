import {createGlobalStyle} from "styled-components"

const GlobalStyle = createGlobalStyle`
html {
    background-color: #FFC04C;
}
   *{
       margin: 0;
       padding: 0;
       outline:0;
       box-sizing:border-box;
       font-family: 'Open Sans', sans-serif; 
   }
   #root{
       margin:0 auto;
   }
`

export default GlobalStyle