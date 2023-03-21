# Guia de desplegament 

## Oracle cloud

Crear la instancia per el nostre projecte, la imatge es Ubuntu 22.02, configurar la red y **GUARDAR CLAU PRIVADA** y publica <br>
Configurar la xarxa y les llistes de seguretat per poder accedir altres ports<br>
Guardar tambe a algun lloc facilment accesible la **IP de la nostre maquina**<br><br>

## Access per SSH 

En cas de que no hi hagi una fitxer ppk per accedir a la maquina s'haura de crear un amb la clau privada. Es pot crear a PuTTYgen per exemple,
fent load de la clau privada y guardant-la a continuacio.<br>

Per accedir a la maquina s'haura de fe servir un emulador de terminal en el qual l'obrirem amb la direccio IP de la nostre maquina Oracle y la clau privada que tenim o hem creat anteriorment. <br>

Si tot esta correcta podrem accedir al terminal de la nostre maquina Oracle en el qual ens demana usuari. Aquest usuari es **ubuntu** <br

S'ha de treure el tallafocs de la maquina amb la comanda **sudo iptable -F**. Si es fa reboot a la maquina s'ha de tornar a fer <br><br>





