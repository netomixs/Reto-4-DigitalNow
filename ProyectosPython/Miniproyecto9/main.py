from tkinter import *
import io
import json
import tkinter as tk
from tkinter import ttk
from PIL import Image, ImageTk
import requests
from animeget import AnimeGET


imagenes_tk = []


def getlista(i):
    imagenes_tk = []
    api = AnimeGET()
    anime = api.getAnime(i)
    lista = anime["data"]
    return lista


def mostrar_imagen(url):
    response = requests.get(url)
    img_data = response.content
    img = Image.open(io.BytesIO(img_data))
    img = img.resize((100, 140))
    img.save("as.jpg")  
    img_tk = ImageTk.PhotoImage(img)
    imagenes_tk.append(img_tk)
    return img_tk


# contador de pagina
iListaActual = 2

lista = getlista(iListaActual)


def increase_count():
    print("cambaindo")
    global iListaActual
    iListaActual += 1
    global lista
    lista = getlista(iListaActual)
    print(iListaActual)
    print(lista)
    update_display()


def decrease_count():
    global iListaActual
    print("cambaindo")
    if (iListaActual > 1):
        iListaActual -= 1
        global lista
        lista = getlista(iListaActual)
        update_display()


 

def update_display():
    for widget in scrollable_frame.winfo_children():
        widget.destroy()
    for item in lista:
        frame = ttk.Frame(scrollable_frame)
        frame.pack(fill="x", pady=5)

    # Imagen
        img = mostrar_imagen(item["images"]["jpg"]["image_url"])
        label_imagen = tk.Label(frame, image=img)
        label_imagen.pack(side="left", padx=5)
        info_frame = ttk.Frame(frame)
        info_frame.pack(side="left", fill="y", padx=5)
        label_nombre = tk.Label(
            info_frame,  text=item["titles"][0]["title"], font=('Arial', 14, 'bold'))
        label_nombre.pack(anchor="w")


ventana = tk.Tk()
ventana.title("Lista con Scroll")

# Configuración del scrollable_frame
canvas = tk.Canvas(ventana)
scrollbar = ttk.Scrollbar(ventana, orient="vertical", command=canvas.yview)
scrollable_frame = ttk.Frame(canvas)
scrollable_frame.bind(
    "<Configure>",
    lambda e: canvas.configure(
        scrollregion=canvas.bbox("all")
    )
)
canvas.create_window((0, 0), window=scrollable_frame, anchor="nw")
canvas.configure(yscrollcommand=scrollbar.set)

# Mostrar los elementos iniciales de la lista
update_display()

# Botones para cambiar de elemento
Button(ventana, text="Anterior", command=decrease_count).pack(side="left")
Button(ventana, text="Siguiente", command=increase_count).pack(side="right")

# Empaquetar los widgets en la ventana
canvas.pack(side="left", fill="both", expand=True)
scrollbar.pack(side="right", fill="y")

# Iniciar el bucle de eventos
ventana.mainloop()
