

const operation = fn => x => y => fn(x, y)
const sumOperation = (a, b) => a + b
const add = operation(sumOperation)
var result = add(5)(7)
console.log(result)
// split in lambda
const initial = {
    x: 5,
    y: 4,
    z: 6
}
const getXY = (xyz) => ({ x: xyz.x, y: xyz.y })
const valueXY = getXY(initial);
console.log(valueXY)
const incrementState = (state) => {
    return {
        ...state,  // y: state.y  z: state.z
        x: state.x + 1
    }
}
const getX = ({ x, ...rest }) => ({ x, rest})
const restObject = getX(initial)
const stateObject = incrementState(initial)
const { x, y, z} = initial // take out fild of object
console.log(x,y,z, stateObject, restObject)


//              e0  e1  e2  e3
const values = [10, 20, 30, 40]
// lambda map of tab
const multiple = x => 2 * x
const addition = x => 2 + x
const resultOfMap = values
    .map(multiple)
    .map(addition)
console.log(values, resultOfMap)
// sum of elements on lamabda
const reducer = (acc, curr) => acc + curr
const sum = values.reduce(reducer)
//                        reducer(e0, e1)
//                        reducer((e0 + e1), e2)
//                        reducer((e0 + e1 + e2), e3) -> sum

// products from data.js
console.log(products)

// filter products on lambda
const isBelowPrice = product => product.price < 500
const isActive = product => product.active
const belowPriceProducts = products.filter(isBelowPrice).filter(isActive)
console.log(belowPriceProducts)

// sum of category in products
// { category1: 3, category2: 4, ... }
//                                    take name from filed category in products
//                                                |
//                                               \|/
const categoryStatsReducer1 = (acc , {category: {name}}) => {
    if (acc[name]) acc[name] =acc[name] + 1 //if name exist incerment
    else acc[name] = 1 // if name not exist ten create
    return acc
}

const categoryStatsReducer2 = (acc, { category: { name } }) => ({
    ...acc, //split
    [name]: acc[name] ? acc[name] + 1 : 1
})
// first version of sum category
const categoryStats1 = products.reduce(categoryStatsReducer1, {})
console.log(categoryStats1)
//second version of sum category
const categoryStats2 = products.reduce(categoryStatsReducer2, {})
console.log(categoryStats2)

// function compose
funA = x => x + 1
funB = x => x + 10
funC = x => x + 100
//normal case
result = funC(funB(funA(0)))
console.log(result)
//compose function
compose = (f, g, h) => x => f(g(h(x)))
resultCompose = compose(funC,funB,funA)
console.log(resultCompose(0))
//compose function with split (any number of function)
compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)))
resultCompose = compose(funC,funB,funA)//data flow from left to right
console.log(resultCompose(0))
//pipe function with split (any number of function)
pipe = (...fns) => fns.reduce((f, g) => (...args) => g(f(...args)))
resultPipe = compose(funC,funB,funA)//data flow from right to left
console.log(resultPipe(0))