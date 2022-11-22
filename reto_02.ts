/* Reto 2: ¡Atrapa a esos ciber criminales!

Problema

Un grupo de ciber criminales están usando mensajes encriptados para comunicarse. El FBI nos ha pedido ayuda para descifrarlos.

Los mensajes son cadenas de texto que incluyen números enteros muy largos y espacios en blanco. Aunque los números no parecen tener sentido... una chica llamada Alice ha descubierto que podrían usar el código ASCII de las letras en minúscula.

Con su método ha conseguido descifrar estos mensajes:

"109105100117" -> midu
"9911110010110998101114" -> codember
"9911110010110998101114 109105100117" -> codember midu
"112108101121 116101116114105115" -> play tetris
Pero han interceptado un mensaje más largo que no han podido y nos han dicho que es muy importante que lo descifremos:

116104101110107115 102111114 112108101121105110103 9911110010110998101114 112108101101115101 115104101114101

Ahora que ya sabes esto, https://codember.dev/encrypted.txt

Pistas
Recuerda que los mensajes son cadenas de texto conformadas por números y espacios en blanco.
Parece que los números tienen algo que ver con el código ASCII.
Los espacios en blanco parece que son simplemente espacios...
Cómo enviar la solución
Usa el comando "submit" para enviar tu solución con la frase descifrada, en minúsculas y respetando los espacios en blanco. Por ejemplo:

$ submit this is fine */

import axios from "axios"

let pool: [string] | any = []
let response: string = ''
const dict: { [key: string]: string } = {
    space: " ",
    97: "a",
    98: "b",
    99: "c",
    100: "d",
    101: "e",
    102: "f",
    103: "g",
    104: "h",
    105: "i",
    106: "j",
    107: "k",
    108: "l",
    109: "m",
    110: "n",
    111: "o",
    112: "p",
    113: "q",
    114: "r",
    115: "s",
    116: "t",
    117: "u",
    118: "v",
    119: "w",
    120: "x",
    121: "y",
    122: "z",
}

axios.get('https://codember.dev/encrypted.txt')
    .then(({ data }) => {
    //data = '115111109111115 108101103105111110'    
    data = '83101 113117105101110 101114101115 84101 9911111011112299111 84117 110111 109101 9911111011199101115 97 109105 84101 101115116111121 1119811510111411897110100111 84101 101115116111121 115105103117105101110100111 81117105101114101115 10611710397114 7411710110397 99111110109105103111 8697108101 8697109111115 97 10611710397114 691061019911711697 101115116101 9911110997110100111 101110 10897 11610111410910511097108 11511798109105116 116561181061045651505752561029911097108'
        let fetch_data: String = data
        while (fetch_data.length !== 0) {
            if (fetch_data[0] == ' ') {
                pool.push('space')
                fetch_data = fetch_data.substring(1, fetch_data.length)
            }
            else if (fetch_data[0] == '9') {
                pool.push(fetch_data.slice(0, 2))
                fetch_data = fetch_data.substring(2, fetch_data.length)
            }
            else {
                pool.push(fetch_data.slice(0, 3))
                fetch_data = fetch_data.substring(3, fetch_data.length)
            }
        }
        pool.forEach((element: string) => {
            if (dict[element]) response = response + dict[element]
        })
        console.log(response)
    })
    .catch(err => console.log(err))