import React from 'react';
import dummy from '../assets/dummy.png';

const PrductItem = ({item, setSelectItem})=>{

    const setCurrentItem1 = (item)=>{
        setSelectItem(item);
      }
    // console.log(item);
    return (
        <div className="flex-box-item"  onClick={()=>setCurrentItem1(item)}>
            <div className='product-details' data-toggle="modal" data-target="#myModal">
                <div>
                <div className='hart-simbal'>&#9825;</div>
                { item.productImages.length > 0 ? <img src={ item.productImages[0] }/> : <img src={ dummy }/>} 
                <h3 className='h3'>{item.priceTerms}</h3>
                <p>{item.itemDescription} </p>
                </div>
            </div>
        </div>
    )
}

export default PrductItem;