//(a)-(1)
function mySum(...theArgs) {
    let total = 0;
    for (const arg of theArgs) {
    total += arg;
    }
    return total;
}

//(a)-(2)
console.log(mySum(7, 2, 3, 4));

//(b)
module.exports = { mySum };

//(c)
let myArr = [];
myArr.push(1,2,3,4,5);
console.log(myArr.length);

//(d)
const hoge = [...myArr];
console.log(hoge);

//(e)
let mySecondArr = myArr.map(function(value){return value * 2});
console.log(mySecondArr); 

//(f)
let sum = 0;
for(const num of mySecondArr){
    sum += num;
}
const average = sum / mySecondArr.length
let result = mySecondArr.filter(function (value){
    return value >= average
});
console.log(result);

//(g)
setTimeout(function(){
	console.log('”Goodbye”');
}, 3000);

//(h)
const Employee = {
    name: "",
    email : "",
    department: "",
    startDate:""
};
console.log(Object.keys(Employee));

//(i)
const Person = {
    name : Employee.name,
    email : Employee.email
};

console.log(Object.keys(Person));