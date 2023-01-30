Część z node.js i express zawiera endpointy do zamowień, produktów, kategorii i logowania
Node używa mysql do zapisu. Działa na porcie 3456, ten port w axios jest wpisany w url.

Część react używa axiosa do logowania, odczytania produktów w kategoriach i zamówienia produktu (tylko niektórych endpointów, ich mniejszej części).
Nie udało mi się zrobić koszyka z globalnym hookiem, więc zamówienie odbywa się tylko w podstronie z produktami sklepu.