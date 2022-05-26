<h1 align="center">Concept - Das Spiel 💡</h1> <!-- omit in toc  -->

<p align="center">
  <a href="https://concept.andreasnicklaus.de">Spielen ⏩</a> •
  <a href="https://www.ravensburger.de/produkte/spiele/erwachsenenspiele/werwoelfe-morgengrauen-26729/index.html">Das Original 💡</a> •
  <a href="https://andreasnicklaus.de">Ich 😉</a>
</p>

---

- [Kommende Features 🔜](#kommende-features-)
- [Anleitung 🏞️](#anleitung-️)
  - [Was ihr braucht](#was-ihr-braucht)
  - [Spielablauf](#spielablauf)
    - [Vorbereitung](#vorbereitung)
    - [Wie man spielt](#wie-man-spielt)
    - [Ende der Runde](#ende-der-runde)
    - [Ende des Spiels](#ende-des-spiels)
- [Selber hosten 🪄](#selber-hosten-)
  - [Nativ ausführen](#nativ-ausführen)
  - [Docker-compose](#docker-compose)


# Kommende Features 🔜


# Anleitung 🏞️
Du bist gedanklich auf dem gleichen Level wie deine Freunde und Familie? Finde es heraus! Platziere Hinweissteine auf den Begriffsfeldern und gib Ihnen Hinweise dazu, was du meinst! Ein männlicher Schauspieler der Vergangenheit? Eine schwarz-rot-goldene Stadt, die halbiert wurde? Weißes Pulver für Kleidung? Wenn du solche Rätsel magst, hab ich das Spiel für dich!

## Was ihr braucht
| Anforderungen  |   |
|---|---|
| Spieler  | 1-2 Spieler mit eigenen Geräten/Browsern |
| Kommunikation  | Ihr müsst nicht unbedingt miteinander reden können, aber so macht es mehr Spaß |


## Spielablauf

### Vorbereitung
Bevor ihr anfangen könnt zu spielen, müsst ihr euch im Warteraum zusammenfinden. Dafür muss ein Spieler einen neuen Raum starten und den anderen Spielern den Raumcode zukommen lassen. Den Raumcode findest du im Warteraum oben rechts. Weil der Raumcode in der Regel sehr lang ist, kannst du mit "Kopieren" den Raumcode in den Buffer deines Geräts kopieren.

Alle anderen Spieler können dann mit diesem Raumcode dem Raum beitreten. Wenn alles Spieler im Raum sind und sich "Bereit" gemacht haben, kann es losgehen und ein beliebiger Spieler kann das Spiel starten.

### Wie man spielt
In jeder Runde gibt es einen Hinweisgeber und viele Ratende.

- Der Hinweisgeber kann in der Kopfzeile als farbig hinterlegter Spieler erkannt werden. Dieser Spieler bekommt ein Wort angezeigt, das für diese Runde gilt. Indem er oder sie auf ein Begriffssfeld klickt, kann er Spielsteine auf den Feldern verteilen. Steine gibt es in fünf Farben, von denen Grün als wichtigste Farbe ist. Auf jedes Feld kann pro Farbe ein Hauptstein und 0-5 normale Steine gesetzt werden. Mit Hauptsteinen sollen Hauptkonzepte vermittelt werden und normale Steine passen diese Konzepte an.

- Ratende Spieler können aus den Hinweisen versuchen, das richtige Wort zu erraten, indem sie in das Nachrichtenfeld ihre Tipps eintippen.
### Ende der Runde
Wenn ein ratender Spieler den richtigen Begriff genannt hat, endet die Runde. Der Hinweisegeber erhält 1 Punkt und der Spieler mit dem richtigen Tipp bekommt 2 Punkte.

### Ende des Spiels
Ihr könnt euch ein Rundenlimit oder Zeitlimit setzen. Für die ersten Spiele schlagen wir 3 Runden als Rundenlimit vor. Sobald das Limit erreicht ist, gewinnt der Spieler mit den meisten Punkten. Bei Gleichstand gewinnen alle Spieler mit den meisten Punkten.

# Selber hosten 🪄

Um dieses Spiel selber zu hosten , kannst du es [so](#native-run)
nativ ausführen oder mit [Docker-compose](https://docs.docker.com/compose/) starten. Die Anleitung für Docker-compose findest du [heir](#docker-compose).

## Nativ ausführen

Installieren und Server starten:
```bash
cd backend
npm ci
npm start
```

Installieren und Frontend starten:
```bash
cd frontend
npm ci
npm start
```

## Docker-compose

Du kannst Docker und Docker-Compose mit diesem Befehl starten:
```bash
docker-compose up
```