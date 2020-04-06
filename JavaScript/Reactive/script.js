fun = () => {
    return 20
    return 40
    return 60
}
console.log("before funtion")
console.log(fun())
console.log("after funtion")
obs = Rx.Observable.create(observer => {
    observer.next(20)
    observer.next(40)
    observer.next(60)
})
console.log("before observable")
obs.subscribe((data) => {console.log(data)})
console.log("after observable")

console.log('################>>Error<<')

fun = () => {
    throw new Error("Function error")
    return 40
}
try {
    console.log(fun())
} catch (e) {
    console.log(e.message)
}
obs = Rx.Observable.create(observer => {
    observer.error("Observable error")
    observer.next(40)
})
obs.subscribe(
    (data) => console.log(data),
    (error) => console.log(error)
)

console.log('################>>of,from,complite<<')

//obs = Rx.Observable.from([20,40,60])
obs = Rx.Observable.of(20,40,60)
obs.subscribe(
    (data) => console.log(data),
    (error) => console.log(error),
    () => console.log("done")
)
obs = Rx.Observable.create(observer => {
    observer.next(20)
    observer.next(40)
    observer.next(60)
    observer.complete()
})
obs.subscribe(
    (data) => console.log(data),
    (error) => console.log(error),
    () => console.log("done")
)

console.log('################>>tab,of,object<<')

obs = Rx.Observable.from(products)
    .subscribe(x => console.log(x))
obs = Rx.Observable.from(products)
    .filter(product => product.active)
    .map(product => product.name)
    .subscribe(x => console.log(x))

console.log('################>>JonsonFromServerApi<<')
objectFromApi = [{
    "userId": 1,
    "id": 1,
    "title": "delectus aut autem",
    "completed": false
}]
// get function from lib Rx
const { Observable: { from, ajax } } = Rx
// fetch('https://jsonplaceholder.typicode.com/todos/1')
//     .then(response => response.json())
//     .then(json => console.log(json))
obs = from(objectFromApi)
    .subscribe(x=>console.log(x))
obs = ajax.get('https://jsonplaceholder.typicode.com/todos/1')
    .map(res => res.response)
    .subscribe(x=>console.log(x))
