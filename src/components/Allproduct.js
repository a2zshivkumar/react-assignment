import React from 'react';
import dummy from '../assets/dummy.png';
import { getData } from '../service/service';
import PrductItem from './ProductItem';


const Allproduct = ({productId, setSubcategoryDetails, setSelectItem})=>{
    
  const [productItem, setProductItem] = React.useState({});

  
  const fetchData = async ()=>{

    const data = await getData(`https://elredtest.s3.amazonaws.com/reactAssignment/getProduct_${productId}.json`);
    // console.log(data)
    setProductItem(data);
    
  }
  React.useEffect(()=>{
    fetchData();
  }, []);
  
    return (
        <div className="col-sm-7 text-left">
             
            <h3><i className="arrow left" onClick={()=>setSubcategoryDetails(false)}></i> All Product</h3>

            <div className="item-flex-row">
              {
                productItem?.result?.length > 0 ? 

                productItem?.result?.map((item, i)=>{
                  
                  return <PrductItem item={item} key={i} setSelectItem={setSelectItem}></PrductItem>
                })
              :
              <div>Item not available.</div>
              }
            </div>
           
          </div>
    )
}

export default Allproduct;