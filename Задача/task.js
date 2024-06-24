// Задача:
// Напиши функцию, которая при заданном числе n (n >= 1) возвращает n-е число в последовательности Фибоначчи.

const fibo = (n) => { 
    if(n <= 0) return null
    if(n === 1) return 0
    let a = 0
    let b = 1
    for(let i = 2; i <= n; i++) { 
        let c = a + b 
        a = b 
        b = c 
    }
    return b
}