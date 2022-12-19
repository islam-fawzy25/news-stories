export const getArrayWithRandomItems =(randomLength,originalArray)=>{
    const array = Array.from({ length: randomLength }, () => Math.floor(Math.random() * originalArray.length));
    const randomArray = array.map(i=>{
        return  originalArray[i]
      })
      return randomArray
}