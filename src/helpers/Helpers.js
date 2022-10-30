
const arrayRemove = (arr, value) => {

  return arr.filter(function(ele){
      return ele !== value;
  });
}

const helpers = {
  arrayRemove,
}

export default helpers;
