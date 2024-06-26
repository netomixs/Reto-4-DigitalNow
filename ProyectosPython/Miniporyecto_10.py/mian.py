import random
from palabras import Palabras

palabras=Palabras()
palabras=palabras.get()
indexRandom = random.randint(0, len(palabras)-1)

print(palabras[indexRandom])
import tkinter as tk
from tkinter import messagebox
import random

 

 
palabra_secreta = random.choice(palabras)
letras_adivinadas = []
intentos_restantes = 6
 
def actualizar_palabra_mostrada():
    palabra_mostrada = ''
    for letra in palabra_secreta:
        if letra in letras_adivinadas:
            palabra_mostrada += letra + ' '
        else:
            palabra_mostrada += '_ '
    return palabra_mostrada.strip()
 
def intentar_letra():
    global intentos_restantes
    letra = entrada_letra.get()
    if letra in letras_adivinadas:
        messagebox.showinfo("Error", "Ya has adivinado esa letra.")
    elif letra in palabra_secreta:
        letras_adivinadas.append(letra)
    else:
        letras_adivinadas.append(letra)
        intentos_restantes -= 1
    
    etiqueta_palabra.config(text=actualizar_palabra_mostrada())
    etiqueta_intentos.config(text=f"Intentos restantes: {intentos_restantes}")
    
    if intentos_restantes == 0:
        messagebox.showinfo("Perdiste", f"¡Has perdido! La palabra era: {palabra_secreta}")
        reiniciar_juego()
    elif "_" not in actualizar_palabra_mostrada():
        messagebox.showinfo("Ganaste", "¡Felicidades, has ganado!")
        reiniciar_juego()

# Función para reiniciar el juego
def reiniciar_juego():
    global palabra_secreta, letras_adivinadas, intentos_restantes
    palabra_secreta = random.choice(palabras)
    letras_adivinadas = []
    intentos_restantes = 6
    etiqueta_palabra.config(text=actualizar_palabra_mostrada())
    etiqueta_intentos.config(text=f"Intentos restantes: {intentos_restantes}")

# Configuración de la interfaz gráfica
ventana = tk.Tk()
ventana.title("Juego del Ahorcado")

etiqueta_palabra = tk.Label(ventana, text=actualizar_palabra_mostrada(), font=('Helvetica', 20))
etiqueta_palabra.pack()

etiqueta_intentos = tk.Label(ventana, text=f"Intentos restantes: {intentos_restantes}", font=('Helvetica', 14))
etiqueta_intentos.pack()

entrada_letra = tk.Entry(ventana)
entrada_letra.pack()

boton_intentar = tk.Button(ventana, text="Intentar", command=intentar_letra)
boton_intentar.pack()

ventana.mainloop()