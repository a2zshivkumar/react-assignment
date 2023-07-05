export const getData = async (url) =>{
    const res = await fetch(url);
  const data = await res.json();
  return data;
}


export const getColorDiscription = (data) =>{
  var colordiscription = [];         
  
  for( let i=0; i<data.variants.length;i++){
    if(colordiscription.indexOf(data.variants[i].colorDescription) === -1){
      colordiscription.push(data.variants[i].colorDescription);
    }
  }

  return colordiscription;
}
export const getSizeDiscription = (data) =>{
  var sizediscription = [];         
  
  for( let i=0; i<data.variants.length;i++){
    if(sizediscription.indexOf(data.variants[i].packingDescription) === -1){
      sizediscription.push(data.variants[i].packingDescription);
    }
  }

  return sizediscription;
}

export const getCurrentVariant = (data, color, size) =>{
  var sizediscription = [];         
  
  for( let i=0; i<data.variants.length;i++){
    if(data.variants[i].packingDescription === size && data.variants[i].colorDescription === color){
      sizediscription = data.variants[i];
      break;
    }
  }

  return sizediscription;
}

