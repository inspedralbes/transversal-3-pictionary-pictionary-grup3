# Guia de desplegament

## Oracle cloud

Crear la instància pel nostre projecte, la imatge és Ubuntu 22.02, configurar la xarxa i **GUARDAR CLAU PRIVADA** i pública.

Configurar la xarxa i les llistes de seguretat per poder accedir des d'altres ports, com el **80 i 443**.

Guardar també la **IP de la nostra màquina**.

## Accés per SSH

En cas que no hi hagi un fitxer ppk per accedir a la màquina s'haurà de crear un amb la clau privada. Es pot crear a PuTTYgen per exemple,
carregant la clau privada i guardant-la a continuació.

Per accedir a la màquina s'haurà de fer servir un emulador de terminal en el qual l'obrirem amb la direcció IP de la nostra màquina Oracle i la clau privada que tenim o hem creat anteriorment.

Si tot està correcte podrem accedir al terminal de la nostra màquina Oracle en el qual ens demana usuari. Aquest usuari és **ubuntu**.

S'ha de treure el tallafoc de la màquina amb la comanda **sudo iptables -F**. Si es fa reboot a la màquina, s'ha de tornar a fer.

Si la màquina es nova actualitazar-ho tot amb **sudo apt update** i **sudo apt upgrade**.

## Instalacio servidor web Nginx

Fer servir la comanda **sudo apt install nginx** si tot es correcte al obrir al nostre navegador i posar la ip de la nostra màquina s'hauria de obrir la pantalla de benvinguda de Nginx.

## Creacio del domini

En el meu cas faig servir LABS per la creacio del meu domini i el seu DNS. Al crear el meu domini tambe creo el DNS, i en aquest crearem un subdomini, aquest subdomini tindra el nom que volguem però s'ha de canviar la ip d'aquest a la ip de la nostre maquina. Ara si accedim al nostre domini ens porta a la pagina de Welcome de Nginx.

## Instalacio del LEMP

Seguint la guia **https://www.digitalocean.com/community/tutorials/how-to-install-linux-nginx-mysql-php-lemp-stack-on-ubuntu-22-04** s'instala el software necessari per el funcionament del projecte, en aquest cas Linux, Nginx, MySQL i PHP. Nginx ja esta instalat i Linux tambe. Aixi doncs seguint la guia instalarem els dos que resten. (Posar al fitxer amb el port 80 la URL que hem creat al labs)

## Instalacio de NodeJS

Fer servir la comanda **sudo apt install nodejs** i a continuacio **sudo apt install npm**.

## Cerrtificat HTTPS

Seguir la guia del **Certbot (https://certbot.eff.org/)** la qual ens pregunta el software i el sistema en el que estem treballant. S'instala la per metode default i a la mateixa pagina estan els prerequisits.

## Nginx com a proxy invers










