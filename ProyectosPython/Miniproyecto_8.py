from USSDCodes import USSDCodes
import tkinter as tk
import tkinter as tk
from tkinter import ttk
from PIL import Image, ImageTk
from tkinter import messagebox
codes = USSDCodes()
print(codes.get())

def mostrarCodigo():
    code = entrada_letra.get()
    des=codes.get().get(code,"Codigo no encontrado")
    if des:
        messagebox.showinfo("Codigo",des)

ventana = tk.Tk()
ventana.title("Codigos USSD")
ventana.geometry("600x600") 

etiqueta_palabra = tk.Label(ventana, text="Ingresa codigo", font=('Helvetica', 20))
etiqueta_palabra.pack(pady=10)

entrada_letra = tk.Entry(ventana,width=50)
entrada_letra.pack(pady=10)

boton_intentar = tk.Button(ventana, text="Enviar", command=mostrarCodigo,width=25)
boton_intentar.pack(pady=10)
ventana.mainloop()
