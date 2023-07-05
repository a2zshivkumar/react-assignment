import React from 'react';
import dummy from '../assets/dummy.png';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem } from '../store/AddItem';
import {getColorDiscription, getSizeDiscription, getCurrentVariant } from '../service/service';

const PopupModal = ({item}) =>{
    const [productDiscription, setProductDiscription] = React.useState({
        imageurl:item?.productImages.length > 0 ? item.productImages[0] :  dummy ,
        quantity:1,
        bpCatalogNumber: "1410",
        colorCode: "1100010",
        colorDescription: "Black Color",
        grossPrice: "600",
        packingCode: "1100019",
        packingDescription: "NM 1 Litre",
        saleDescription:"Machine 12",
        variantId: "643e7aa0db684bac5851d8f8",
        _id: "643e7aa0db684bac5851d8f8",
        

    });

    const [colorVariant, setColorVariant] = React.useState([]);
    const [sizeVariant, setSizeVariant] = React.useState([]);

    const listItem = useSelector((state) => state.productList.itemList);
    const dispatch = useDispatch();

    
  
    const AddItemInList = ()=>{
     
      dispatch(addItem(productDiscription));
      console.log(productDiscription)
    }

    const chooseOption = (keyvalue, text)=>{
      
      setProductDiscription(prevState => ({
        ...prevState,
        [keyvalue]: text
    }));
    
    }

    React.useEffect(()=>{
      if(item){
        setProductDiscription({...productDiscription, ...item.variants[0]});        
        chooseOption("imageurl", item?.productImages[0]);
        console.log(item)
        setColorVariant(getColorDiscription(item));
        setSizeVariant(getSizeDiscription(item));
      }
    },[item])

    const chooseVariant = (color, size)=>{
      var varient = getCurrentVariant(item, color, size);
      setProductDiscription({...productDiscription, ...varient}); 
    }
    return (
     <div className="modal fade" id="myModal" role="dialog">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">&times;</button>
              <h4 className="modal-title">Modal Header</h4>
            </div>
            <div className="modal-body">
              
              <div className="row">
                <div className="col-sm-7 popup-left-box">

                    <div className='popupImageBox'>
                      <div className='box-left'>
                      { item?.productImages.length > 0 ? <img src={ item.productImages[0] } style={{width:60}}/> : <img src={ dummy }/>}   
                      { item?.productImages.length > 0 ? <img src={ item.productImages[0] } style={{width:60}}/> : <img src={ dummy }/>}   
                      { item?.productImages.length > 0 ? <img src={ item.productImages[0] } style={{width:60}}/> : <img src={ dummy }/>} 
                      </div>  
                      <div className='box-right'>
                          <div className='hart-simbal'>&#9825;</div>
                          { item?.productImages.length > 0 ? <img src={ item.productImages[0] } style={{width:225}}/> : <img src={ dummy }/>} 
                      </div>
                    </div>
                    <div style={{color:'#bab5b5'}}>#{item?.itemNumber}</div>
                    <div style={{height:'30px'}}>
                        <span style={{fontWeight:"bold",fontSize:"17px",float:"left"}}>{item?.priceTerms}</span>
                        <span style={{fontWeight:"bold",fontSize:"17px",float:"right"}}>{item?.currency?.symbol}{productDiscription.grossPrice}</span>
                    </div>
                    <div style={{color:'#bab5b5',fontSize:"12px",paddingBottom:"15px"}}>
                     {productDiscription?.saleDescription}
                    </div>

                    <div style={{fontWeight:"bold",fontSize:"17px"}}>Please Select Color Discription</div>

                    <div className='choose-item-color'>
                      {
                        colorVariant.length > 0 && colorVariant.map((item, i) => {
                          return (
                            <button type="button" className={`pColor btn btn-default ${productDiscription.colorDescription === item ? 'active' : ''}`} key={i} onClick={()=>chooseVariant(item, productDiscription.packingDescription)}>{item}</button>
                          )
                        })
                      }
                    </div>

                    <div style={{fontWeight:"bold",fontSize:"17px"}}>Please Select Product Size</div>
                    <div className='choose-item-color'>
                        {
                         sizeVariant.length > 0 && sizeVariant.map((item, i) => {
                          return ( 
                            <button type="button" className={`pColor btn btn-default ${productDiscription.packingDescription === item ? 'active' : ''}`} key={i} onClick={()=>chooseVariant(productDiscription.colorDescription, item)}>{item}</button>
                          )
                        })
                      }

                    </div>

                  <div style={{fontWeight:"bold",fontSize:"17px"}}>Enter Quantity.</div>
                 
                  <input type="number" className="form-control" max="100" min="1" defaultValue={1} name='quantity' onChange={(e)=>chooseOption(e.target.name, e.target.value)}></input>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="check1" name="option1"></input>
                    <label className="form-check-label">Urgent basis</label>
                  </div>

                  <p>
                    <button type="button" className="btn btn-default add-button" onClick={()=>AddItemInList()}>ADD</button>
                  </p>

                </div>



                <div className="col-sm-5 right-orderlist">
                  <div className="row product-heading">
                    <div className="col-sm-6" style={{textAlign:"center"}}>
                      Product
                    </div>
                    <div className="col-sm-3">
                      Quantity
                    </div>
                    <div className="col-sm-3">
                      Price
                    </div>
                  </div>
                    
                    {
                      listItem.length > 0 ? 
                        listItem.map(function(item, i){
                          return (
                            <div className="row product-heading-text" key={i}>
                            <div className="col-sm-6 order-item">
                            <img src={ item.imageurl }/>  
                              <div>
                                <span>{item.productName}</span>
                                <span>{item.discription}</span>
                              </div>
                            </div>
                            <div className="col-sm-3">
                              {item.quantity}
                            </div>
                            <div className="col-sm-3">
                              ₹  {item.grossPrice}
                              <span className='remove-item' onClick={()=>dispatch(removeItem(i))}>X</span>
                            </div>
                          </div>
        
                          )
                        })
                      : <></>
                    }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}


export default PopupModal;