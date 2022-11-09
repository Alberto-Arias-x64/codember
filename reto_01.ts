/* Reto 1: ¡Arregla Twitter!

Problema

Twitter ha sido comprado y quieren eliminar los bots. Te han pedido ayuda para detectar el número de usuarios en su base de datos que tienen datos corruptos.

La base de datos es muy antigua y está en un formato extraño. Los perfiles requieren tener los siguientes datos:

usr: nombre de usuario
eme: email
psw: contraseña
age: edad
loc: ubicación
fll: número de seguidores
Todo está en un fichero donde los datos de usuario son una secuencia de pares `key:value`, que pueden estar en la misma línea o separado por líneas, y cada usuario está separado por un salto de línea. ¡Ojo porque puede estar todo desordenado!

Ejemplo de input:

usr:@midudev eme:mi@gmail.com psw:123456 age:22 loc:bcn fll:82

fll:111 eme:yrfa@gmail.com usr:@codember psw:123456 age:21 loc:World

psw:11133 loc:Canary fll:333 usr:@pheralb eme:pheralb@gmail.com

usr:@itziar age:19 loc:isle psw:aaa fll:222 eme:itzi@gmail.com

El primer usuario SÍ es válido. Tiene todos los campos.
El segundo usuario SÍ es válido. Tiene todos los campos.
El tercer usuario NO es válido. Le falta el campo `age`.
El cuarto usuario SÍ es válido. Tiene todos los campos.

Ahora que ya sabes esto, usa este input para detectar los usuarios incorrectos: https://codember.dev/users.txt

Pistas
Los datos pueden estar en cualquier orden.
Los datos pueden estar en la misma línea o separados por líneas.
Los usuarios se separan por un salto de línea en blanco.
Pueden venir datos que no son necesarios para el usuario pero eso no lo hacen inválidos.
Cómo enviar la solución
Usa el comando "submit" para enviar tu solución con el número de usuarios correctos + el nombre del último usuario válido. Por ejemplo:

$ submit 482@midudev */

import axios from "axios"

let pool: [string] = ['']
let index: number = 0
let correct: Array<boolean | any> = []
let true_counter: number = 0
let last_user: number = 0

axios.get('https://codember.dev/users.txt')
    .then(({ data }) => {
        const splitData: [string] = data.split('\n')
        splitData.forEach(element => {
            if (element !== ''){
                pool[index] = pool[index].concat(element)
            }
            else {
                index ++
                pool[index] = ''
            }
        })
        pool.forEach(element => {
            if(element.includes('usr:') && element.includes('eme:') && element.includes('psw:') && element.includes('age:') && element.includes('loc:') && element.includes('fll:')) correct.push(true)
            else correct.push(false)
        })
        correct.forEach((element, index) => {
            if (element === true){
                true_counter++
                last_user = index
            }
        })
        console.log(`Total usuarios: ${pool.length}`)
        console.log(`Usuarios confirmados: ${true_counter}`)
        console.log(`Usuarios bloqueados: ${pool.length - true_counter}`)
        console.log(`Ultimo usuario confirmado: ${pool[last_user]}`)
    })
    .catch(err => console.log(err))