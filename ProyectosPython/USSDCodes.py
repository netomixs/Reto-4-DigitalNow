
class USSDCodes:
    def __init__(self):
        self.data = [
            {"codigo": "##4636##", "Descripcion": "Mostrar información sobre el teléfono, la batería y las estadísticas de uso"},
            {"codigo": "##7780##",
                "Descripcion": "Restablecer el teléfono a estado de fábrica (elimina datos y aplicaciones)"},
            {"codigo": "27673855#",
                "Descripcion": "Borrado completo del móvil y reinstalación del firmware"},
            {"codigo": "##34971539##",
                "Descripcion": "Mostrar información completa sobre la cámara"},
            {"codigo": "##7594##",
                "Descripcion": "Cambiar el comportamiento del botón de encendido (apagado directo al habilitar el código)"},
            {"codigo": "##273283255663282*##",
                "Descripcion": "Copia de seguridad rápida de todos tus archivos multimedia"},
            {"codigo": "##197328640##",
                "Descripcion": "Habilitar el modo de prueba para la actividad del servicio"},
            {"codigo": "##232339##", "Descripcion": "Pruebas inalámbricas de LAN"},
            {"codigo": "##526##", "Descripcion": "Pruebas inalámbricas de LAN"},
            {"codigo": "##232338##",
                "Descripcion": "Mostrar la dirección de Mac con Wi-Fi"},
            {"codigo": "##1472365##", "Descripcion": "Prueba rápida de GPS"},
            {"codigo": "##1575##", "Descripcion": "Prueba de GPS de tipo diferente"},
            {"codigo": "##0283##", "Descripcion": "Prueba de bucle invertido"},
            {"codigo": "##0*##", "Descripcion": "Prueba de pantalla LCD"},
            {"codigo": "##0673##", "Descripcion": "Prueba de audio"},
            {"codigo": "##0289##", "Descripcion": "Prueba de audio"},
            {"codigo": "##0842##", "Descripcion": "Prueba de vibración y luz de fondo"},
            {"codigo": "##2663##", "Descripcion": "Muestra la versión de pantalla táctil"},
            {"codigo": "##2664##", "Descripcion": "Prueba de pantalla táctil"},
            {"codigo": "##0588##", "Descripcion": "Prueba de sensor de proximidad"},
            {"codigo": "##3264##", "Descripcion": "Versión RAM"},
            {"codigo": "##232331##", "Descripcion": "Prueba de Bluetooth"},
            {"codigo": "##7262626##", "Descripcion": "Prueba de campo"},
            {"codigo": "##232337##",
                "Descripcion": "Muestra la dirección del dispositivo Bluetooth"}
        ]

    def get(self):
        return self.data
