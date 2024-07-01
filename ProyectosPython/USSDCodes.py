
class USSDCodes:
    def __init__(self):
        self.data  = {
    "##4636##": "Mostrar información sobre el teléfono, la batería y las estadísticas de uso",
    "##7780##": "Restablecer el teléfono a estado de fábrica (elimina datos y aplicaciones)",
    "27673855#": "Borrado completo del móvil y reinstalación del firmware",
    "##34971539##": "Mostrar información completa sobre la cámara",
    "##7594##": "Cambiar el comportamiento del botón de encendido (apagado directo al habilitar el código)",
    "##273283255663282*##": "Copia de seguridad rápida de todos tus archivos multimedia",
    "##197328640##": "Habilitar el modo de prueba para la actividad del servicio",
    "##232339##": "Pruebas inalámbricas de LAN",
    "##526##": "Pruebas inalámbricas de LAN",
    "##232338##": "Mostrar la dirección de Mac con Wi-Fi",
    "##1472365##": "Prueba rápida de GPS",
    "##1575##": "Prueba de GPS de tipo diferente",
    "##0283##": "Prueba de bucle invertido",
    "##0*##": "Prueba de pantalla LCD",
    "##0673##": "Prueba de audio",
    "##0289##": "Prueba de audio",
    "##0842##": "Prueba de vibración y luz de fondo",
    "##2663##": "Muestra la versión de pantalla táctil",
    "##2664##": "Prueba de pantalla táctil",
    "##0588##": "Prueba de sensor de proximidad",
    "##3264##": "Versión RAM",
    "##232331##": "Prueba de Bluetooth",
    "##7262626##": "Prueba de campo",
    "##232337##": "Muestra la dirección del dispositivo Bluetooth"
}
    def get(self):
        return self.data
