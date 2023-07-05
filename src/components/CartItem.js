import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { clearCartItem } from '../store/AddItem';


const CartItem = ()=>{

    const listItem = useSelector((state) => state.productList.itemList);
    const dispatch = useDispatch();

    var sum = 0;
   if(listItem.length>0){
    sum = listItem.reduce((total, item)=>{
        return total + parseInt(item.grossPrice);
    },0);
    }

    const [amount, setAmount] = React.useState(0);
    const [sgst, setSgst] = React.useState(0);
    const [cgst, setCgst] = React.useState(0);
    const [igst, setIgst] = React.useState(0);
    const [taxable, setTaxable] = React.useState(1000);

    React.useEffect(()=>{
        if(sum>0){
            setAmount(sum);
            setCgst(sum * 0.09);
            setSgst(sum * 0.09);
            setIgst(sum * 0.09);
        }

    },[listItem]);
    
    return (
        <>

            { listItem.length > 0 ?
            <>
                <div className="row product-heading">

                <div className="col-sm-4">
                Product
                </div>
                <div className="col-sm-3">
                Quantity
                </div>
                <div className="col-sm-5">
                Price
                </div>

                </div>


                <div className='bucketlist'>
                {
                listItem.length > 0 ? 
                listItem.map(function(item, i){
                    return (
                    <div className="row product-heading-text" key={i}>
                    <div className="col-sm-4 order-item">
                    <img src={ item.imageurl }/>  
                        <div>
                        <span>{item.productName}</span>
                        <span>{item.discription}</span>
                        </div>
                    </div>
                    <div className="col-sm-3">
                        {item.quantity}
                    </div>
                    <div className="col-sm-5">
                        ₹  {item.grossPrice}
                    </div>
                    </div>

                    )
                })
                : <></>
                }
                </div>

                <div className="row product-heading">Other instructions</div>
                <div className="row purchageorder">Purchage order number:</div>
                <div className="row product-heading ordernumber">3434324343</div>
                <div className="address">Address:</div>
                <div className="address fad">b/234 saket block delhi 110094</div>

                <div className='itemtotal fad'>Item total <span>₹{amount}</span></div>
                <div className=' fad'>SGST(9%) <span>₹{parseInt(sgst)}</span></div>
                <div className='fad'>CGST(9%) <span>₹{parseInt(cgst)}</span></div>
                <div className='fad'>IGST(9%) <span>₹{parseInt(igst)}</span></div>
                <div className='fad'>Taxable Amount <span>₹{parseInt(taxable)}</span></div>
                <div className='ordertotal'>Order total <span>₹{taxable + amount + sgst + cgst + igst }</span></div>

                <div>
                <button type="button" className="btn btn-outline-secondary clearCard" onClick={()=>dispatch(clearCartItem())}>Clear Cart</button>
                <button type="button" className="btn btn-outline-secondary placeorder">Place Order</button>
                </div>
            </>:<></>}
      
        </>
    )
}


export default CartItem;