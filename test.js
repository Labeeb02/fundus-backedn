var j1={
    "a":1,
    "b":{
        "c":2,
        "d":3
    },
}

var j2={
    "a":2,
    "b":{
        "c":2,
        "d":3
    },
}

var j3={
    "a":1,
    "b":{
        "c":2,
        "d":4
    },
}

console.log(j1==j2);
console.log(j1.a==j3.a);
console.log(JSON.stringify(j1.a));
console.log(j1.b==j2.b);
console.log(JSON.stringify(j1.b)==JSON.stringify(j2.b));
console.log(JSON.stringify(j1));
console.log(JSON.stringify(j1.b));
console.log(JSON.stringify(j2.b));

