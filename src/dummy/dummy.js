
const dummy = () => {
   const array = [];

   for (let i = 0; i <10000; i++){
       array.push({
           datetime: i,
           fixed_gimp: i%4
       });
   }

   return array;
};

export default dummy;
