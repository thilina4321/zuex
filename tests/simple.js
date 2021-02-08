const calc = (total, tip) => total + total * tip;

const asyncDemo = () => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(5);
    }, 1000);
  });
};

//  asyncDemo().then((value)=>{
//      console.log(value);
//  })

module.exports = { calc, asyncDemo };
