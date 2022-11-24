/* Challenge 4: Encuentra la contraseña de tu amigo

Problema

Un amigo compró 5 BitCoins en 2008. El problema es que lo tenía en un monedero digital... ¡y no se acuerda de la contraseña!

Nos ha pedido ayuda. Y nos ha dado algunas pistas:

- Es una contraseña de 5 dígitos.
- La contraseña tenía el número 5 repetido dos veces.
- El número a la derecha siempre es mayor o igual que el que tiene a la izquierda.

Nos ha puesto algunas ejemplos:
55678 es correcto lo cumple todo
12555 es correcto, lo cumple todo
55555 es correcto, lo cumple todo
12345 es incorrecto, no tiene el 5 repetido.
57775 es incorrecto, los números no van de forma creciente

Dice que el password está entre los números 11098 y 98123. ¿Le podemos decir cuantos números cumplen esas reglas dentro de ese rango?

Cómo enviar la solución
Envía la solución con el comando submit, y el número de passwords que cumplen el criterio junto con el password que está en el índice 55 de la lista de passwords válidos, separado por un guión.

Por ejemplo, para 87 resultados y el password 35522 en la posición 55 sería:

$ submit 87-35522*/

let password: Array<number> = [1, 1, 0, 9, 8]
let counter: number = 0
let result_55: Array<any> = []
let flag: boolean = false

function add_number() {
    if (password[4] == 9) {
        password[4] = 0
        if (password[3] == 9) {
            password[3] = 0
            if (password[2] == 9) {
                password[2] = 0
                if (password[1] == 9) {
                    password[1] = 0
                    password[0]++
                }
                else password[1]++
            }
            else password[2]++
        }
        else password[3]++
    }
    else password[4]++
}

function validate_number(value: Array<number>): boolean {
    let validator = true
    let five_counter = 0
    if (value.length !== 5) return false
    value.forEach(element => {
        if (element < 0 || element > 9) validator = false
    })
    value.forEach((element, index) => {
        if (index > 0) {
            if (element < value[index - 1]) validator = false
        }
    })
    value.forEach((element, index) => {
        if (element == 5) five_counter++
        if (index == 4 && five_counter < 2) validator = false
    })

    return validator
}
/* console.log(validate_number([5, 5, 6, 7, 8]))
console.log(validate_number([1, 2, 5, 5, 5]))
console.log(validate_number([5, 5, 5, 5, 5]))
console.log(validate_number([1, 2, 3, 4, 5]))
console.log(validate_number([5, 7, 7, 7, 5])) */

console.log('aqui')
while (JSON.stringify(password) !== "[9,8,1,2,4]") {
    if (validate_number(password)) counter++
    if (counter == 56 && flag == false) {
        console.log(password)
        flag = true
    }
    add_number()
}

console.log(counter)