dic = {
    1: 'uno',
    2: 'dos',
    3: 'tres',
    4: 'cuatro',
    5: 'cinco',
    6: 'seis',
    7: 'siete',
    8: 'ocho',
    9: 'nueve',
    10: 'diez',
    11: 'once',
    12: 'doce',
    13: 'trece',
    14: 'catorce',
    15: 'quince',
    16: 'dieciséis',
    17: 'diecisiete',
    18: 'dieciocho',
    19: 'diecinueve',
    20: 'veinte',
    30: 'treinta',
    40: 'cuarenta',
    50: 'cincuenta',
    60: 'sesenta',
    70: 'setenta',
    80: 'ochenta',
    90: 'noventa',
    100: 'ciento',
    200: 'dociento',
    300: 'trecientos',
    400: 'cutrocientos',
    500: 'quinientos',
    600: 'seiscientos',
    700: 'setecientos',
    800: 'ochocientos',
    900: 'novecientos',
}
multiplicador = ["", "mil", "millones"]

cadena = input()
cadena = str(cadena)
res = ""
partes = []
index = 0
size = len(cadena)


def obtenercentenas(cadena):
    longitud = len(cadena)
    resultado = ""

    if (longitud-1 == 0):
        resultado = dic[int(cadena)]
    if (longitud >= 2):
        decenas = cadena[longitud-2]+cadena[longitud-1]
        num = int(decenas)
        if (num < 20 and num > 0):
            resultado = dic[num]
        elif (num == 20):
            resultado = "veinte"
        elif (num % 10 == 0 and num > 0):
            resultado = dic[num]
        else:
            if (num > 0):
                resultado = dic[int(cadena[longitud-2])*10]+" y " + \
                    dic[int(cadena[longitud-1])]
        if (longitud-3 == 0):
            if (cadena == "100"):
                resultado = "cien"
            else:
                if (cadena[longitud-3] != "0"):
                    resultado = dic[int(cadena[longitud-3])*100]+" "+resultado
    return resultado


index = 0
while len(cadena) > 0:
    aux = ""
    if (len(cadena)-3 >= 0):
        parte = cadena[len(cadena)-3:len(cadena)]
        aux = obtenercentenas(parte)
        if (aux):
            res = aux+" "+multiplicador[index]+" " + res
        index = index+1
        cadena = cadena[0:len(cadena)-3]
    else:
        aux = obtenercentenas(cadena)
        res = aux+" "+multiplicador[index]+" " + res
        cadena = ""
res = res.strip()
print(res)
