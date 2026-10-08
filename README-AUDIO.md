# Kaixo — sistema d'àudio euskera

Kaixo utilitza pronunciacions reals en euskera procedents de Wikimedia Commons / Lingua Libre quan existeix un enregistrament amb el patró `Eus-<paraula>.ogg`.

## Funcionament
1. Primer intenta `audio/<paraula>.ogg` si Kaixo incorpora un àudio local.
2. Després intenta Wikimedia Commons (OGG, OGA i MP3).
3. Finalment, si el dispositiu disposa d'una veu euskera, pot utilitzar `speechSynthesis` com a últim recurs.

## Font
Lingua Libre és un projecte col·laboratiu de pronunciacions. Els enregistraments antics de pronunciació basca de Xabier Cañas, per exemple `Eus-aita.ogg`, `Eus-bat.ogg`, `Eus-bi.ogg`, `Eus-bost.ogg` i `Eus-irakasle.ogg`, estan publicats a Wikimedia Commons amb CC BY-SA 4.0.

Font: https://commons.wikimedia.org/wiki/Category:Lingua_Libre_pronunciation-eus

L'aplicació mostra la procedència de l'àudio a les seccions Abecedari i Números.
