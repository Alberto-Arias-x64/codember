/* Reto 3: La zebra de colores

Problema

TMChein ya se está preparando para las fiestas y quiere empezar a decorar la casa con las luces de navidad.

Quiere comprar una pero sus favoritas son las que tienen dos colores que se van alternando. Como una zebra de dos colores.

Ha hecho que las luces sean Arrays y cada posición un color. Y quiere saber qué luces tienen las zebras más largas y cuál es el último color de esa sucesión de colores. Por ejemplo:

['red', 'blue', 'red', 'blue', 'green'] -> 4, blue
['green', 'red', 'blue', 'gray'] -> 2, gray
['blue', 'blue', 'blue', 'blue'] -> 1, blue
['red', 'green', 'red', 'green', 'red', 'green'] -> 6, green
['blue', 'red', 'blue', 'red', 'gray'] -> 4, red
['red', 'red', 'blue', 'red', 'red', 'red', 'green'] -> 3, red
['red', 'blue', 'red', 'green', 'red', 'green', 'red', 'green'] -> 6, green

Fíjate que sólo quiere saber la longitud de cuando dos colores se van alternando. Una vez que se rompe la alternancia de los dos colores, deja de contar.

Ahora que ya sabes esto, https://codember.dev/colors.txt

Recuerda que una zebra de colores es cuando dos colores se alternan una y otra vez. Si se repite un color en la posición siguiente o es un tercer color, entonces se deja de contar.
Lo que queremos calcular es la tira de colores más larga en forma de zebra y el último color de esa tira de colores.
Cómo enviar la solución
Usa el comando "submit" para enviar tu solución. Por ejemplo:

$ submit 62@red*/

import axios from "axios"

let last_elements: Array<string> = ['', '']
let counter_index: number = 0
let counter_pool: Array<number> = [2]
let max_count: number = 0
let last_element: string = ''

function change_pos(value: string) {
    last_elements[0] = last_elements[1]
    last_elements[1] = value
}

axios.get('https://codember.dev/colors.txt')
    .then(({ data }) => {
        //data = ['red', 'blue', 'red', 'green', 'red', 'green', 'red', 'green']
        data.forEach((element: string, index: number) => {
            if (index == 0) last_elements[0] = element
            if (index == 1) last_elements[1] = element
            if (index > 1) {
                if (element == last_elements[1]) {
                    counter_index++
                    counter_pool.push(1)
                    change_pos(element)
                }
                else if (element == last_elements[0]) {
                    counter_pool[counter_index]++
                    change_pos(element)
                }
                else {
                    if (max_count < counter_pool[counter_index]) {
                        max_count = counter_pool[counter_index]
                        last_element = last_elements[1]
                    }
                    counter_index++
                    counter_pool.push(2)
                    change_pos(element)
                }
            }
        });
        console.log(`${max_count} ${last_element}`)
    })
    .catch(err => console.log(err))