
import './App.css';
import React from 'react';
// import dummy from './assets/dummy.png';
import NavBar from './components/NavBar';
import CategoryItem from './components/CategoryItem';
import Allproduct from './components/Allproduct';
import PopupModal from './components/PopupModal';
import { useDispatch, useSelector } from 'react-redux';
import CartItem from './components/CartItem';



function App() {

  const [subcategoryDetails, setSubcategoryDetails] = React.useState(false);
  const [subcategoryid, setSubcategoryid] = React.useState("");
  const [selectItem, setSelectItem] = React.useState(null);

  const listItem = useSelector((state) => state.productList.itemList);
    const dispatch = useDispatch()

    
const openSubCategory = (subcategoryid)=>{
  setSubcategoryid(subcategoryid)
  setSubcategoryDetails(true);
 // console.log(subcategoryid)
}
  return (
    <>
      
      <NavBar></NavBar>
      <div className="container-fluid text-center">    
        <div className="row content">
          <div className="col-sm-2 sidenav">
            <p><a href="#">Link</a></p>
            <p><a href="#">Link</a></p>
            <p><a href="#">Link</a></p>
          </div>
        {
          subcategoryDetails === false ?
          <CategoryItem openSubCategory={openSubCategory}></CategoryItem>
            :
            <Allproduct productId={subcategoryid} setSubcategoryDetails={setSubcategoryDetails} setSelectItem = {setSelectItem}></Allproduct>
          }

          <div className="col-sm-3 sidenav">
            {true ? <CartItem></CartItem> : <></> }
              
          </div>
        </div>
      </div>

      <footer className="container-fluid text-center">
        <p>Footer Text</p>
      </footer>
        <PopupModal item={selectItem}></PopupModal>

    </>
  );
}

export default App;
