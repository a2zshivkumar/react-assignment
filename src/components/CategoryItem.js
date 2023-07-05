import React from 'react';
import { getData } from '../service/service';
import dummy from '../assets/dummy.png';

const CategoryItem = ({openSubCategory})=>{
    const [category, setCategory] = React.useState();
    const [subcategory, setSubcategory] = React.useState();
    const [activeCat, setActiveCat] = React.useState(-1);


    const fetchData = async ()=>{
        const data = await getData("https://elredtest.s3.amazonaws.com/reactAssignment/getCategories.json");
        setCategory(data);
      }
      React.useEffect(()=>{
        fetchData();
      }, []);
      
      const handlerSubCategory = async (cId, index)=>{
        
        setActiveCat(index);
        const subdata = await getData(`https://elredtest.s3.amazonaws.com/reactAssignment/getSubCategory_${cId}.json`);
        setSubcategory(subdata);
        // console.log(subdata)
      }
      

    return (
        <div className="col-sm-7 text-left"> 
                <h2>Category</h2>
                <div className='category'>
                {
                  category && category?.result.map((item, i)=>{
                    return <div key={i} className={`category-item ${ activeCat === i ? 'active' : ''}`} onClick={ ()=>handlerSubCategory(item.categoryId, i)}>
                      <img src={ item.categoryImageURL ? item.categoryImageURL : dummy }/>
                      <div className='item-name'>{item.categoryName}</div>
                    </div>
                  })
                }
              
                </div>


                <h3>Sub Category</h3>
                <div className='sub-category'>

                    {
                      subcategory?.result.length > 0 ? subcategory.result.map((item,i)=>{
                        return  <div className='sub-category-item' key={i} onClick={()=>openSubCategory(item.subCategoryId)}>
                            <img src={ item?.subCategoryImageURL ? item?.subCategoryImageURL : dummy  }/>
                            <div className='item-name'>{item.subCategoryName}</div>
                            </div>
                      }) :
                      <div><h5>Sub category not available</h5></div>
                    }
                </div>
              </div>
    )
}

export default CategoryItem;