
from bs4 import BeautifulSoup as bs
import requests
import urllib.request
import io
import json
import tkinter as tk
from tkinter import ttk
from PIL import Image, ImageTk
import requests
urlopen = requests.get('https://myanimelist.net/topanime.php').text
soup = bs(urlopen, 'html.parser')
lista = []
tabla = soup.find_all('tr', class_='ranking-list')
for fila in tabla:
    anime = {}
    # Obtener rango
    anime['rank'] = fila.find('span', class_='top-anime-rank-text').text
    # obtener Imagen
    anime['img'] = fila.find('img').get(
        'data-srcset').split(',')[1].replace(" 2x", "")
    # Se buscan la seccion de detalles
    detalles = fila.find('div', class_='detail')
    # De la seccion de detalles se obtiene el titulo
    anime['titulo'] = detalles.find('a', class_='hoverinfo_trigger').text
    # De la seccion de detalles se obtiene la informacion general
    tvinfo = detalles.find(
        'div', class_='information di-ib mt4').text.replace("        ", "")
    # La info de tv esta diviida por br y se elimina los espacios no ncesarios
    tvinfo = tvinfo.split('\n')
    # Se separa segun orresponda
    anime['clase'] = tvinfo[1]
    anime['emision'] = tvinfo[2]
    anime['miembros'] = tvinfo[3].replace(" members", "")
    # De la fila se obtiene la seccion de score
    anime['score'] = fila.find('span', class_='score-label').text
    # se agrega a la lsita
    lista.append(anime)
imagenes_tk = []


def mostrar_imagen(url):
    response = requests.get(url)
    img_data = response.content
    img = Image.open(io.BytesIO(img_data))
    img = img.resize((50, 70))
    img_tk = ImageTk.PhotoImage(img)
    imagenes_tk.append(img_tk)
    return img_tk


ventana = tk.Tk()
ventana.title("Lista con Scroll")
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
for item in lista:
    frame = ttk.Frame(scrollable_frame)
    frame.pack(fill="x", pady=5)

    # Imagen
    img = mostrar_imagen(item["img"])
    label_imagen = tk.Label(frame, image=img)
    label_imagen.pack(side="left", padx=5)
    info_frame = ttk.Frame(frame)
    info_frame.pack(side="left", fill="y", padx=5)
    label_nombre = tk.Label(
        info_frame, text=item["titulo"], font=('Arial', 14, 'bold'))
    label_nombre.pack(anchor="w")
    label_info = tk.Label(info_frame, text=item["emision"], font=('Arial', 10))
    label_info.pack(anchor="w")
    label_info = tk.Label(info_frame, text=item["clase"], font=('Arial', 10))
    label_info.pack(anchor="w")
    label_rank = tk.Label(
        frame, text=f"Rank: {item['rank']}", font=('Arial', 12))
    label_rank.pack(side="right", padx=5)

# Empaquetar el canvas y el scrollbar en la ventana
canvas.pack(side="left", fill="both", expand=True)
scrollbar.pack(side="right", fill="y")

ventana.mainloop()
