from USSDCodes import USSDCodes
import tkinter as tk
import tkinter as tk
from tkinter import ttk
from PIL import Image, ImageTk
codes = USSDCodes()
print(codes.get())
ventana = tk.Tk()
ventana.title("Codigos USSD")
ventana.geometry("600x1200") 
canvas = tk.Canvas(ventana)
scrollbar = ttk.Scrollbar(ventana, orient="vertical", command=canvas.yview)
scrollable_frame = ttk.Frame(canvas)
scrollable_frame.bind(
    "<Configure>",
    lambda e: canvas.configure(
        scrollregion=canvas.bbox("all")
    )
)
canvas.create_window((200, 0), window=scrollable_frame, anchor="nw")
canvas.configure(yscrollcommand=scrollbar.set)
for item in codes.get():
    frame = ttk.Frame(scrollable_frame)
    frame.pack(fill="x", pady=5)

    code_frame = ttk.Frame(frame)
    code_frame.pack(side="left", fill="y", padx=5)
    label_Code = tk.Label(code_frame, text=item['codigo'], font=('Arial', 14, 'bold'))
    label_Code.pack(anchor="w")

    info_frame = ttk.Frame(frame)
    info_frame.pack(side="left", fill="both", padx=5, expand=True)
    label_nombre = tk.Label(info_frame, text=item["Descripcion"], font=('Arial', 11))
    label_nombre.pack(anchor="w", padx=(10, 0))  


# Empaquetar el canvas y el scrollbar en la ventana
canvas.pack(side="left", fill="both", expand=True)
scrollbar.pack(side="right", fill="y")

ventana.mainloop()
