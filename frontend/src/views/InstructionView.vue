<template>
  <v-container>
    <h1>Anleitung</h1>
    <p>
      Du bist gedanklich auf dem gleichen Level wie deine Freunde und Familie?
      Finde es heraus! Platziere Hinweissteine auf den Begriffsfeldern und gib Ihnen Hinweise dazu, was du meinst!
      Ein männlicher Schauspieler der Vergangenheit? Eine schwarz-rot-goldene Stadt, die halbiert wurde?
      Weißes Pulver für Kleidung?
      Wenn du solche Rätsel magst, hab ich das Spiel für dich!
    </p>

    <h2 class="ma-2">Was ihr braucht:</h2>
    <v-list>
      <v-list-item lines="two">
        <v-list-item-header>
          <v-list-item-title>Spieler</v-list-item-title>
          <v-list-item-subtitle>1-2 Spieler mit eigenen Geräten/Browsern</v-list-item-subtitle>
        </v-list-item-header>
      </v-list-item>
      <v-list-item lines="two">
        <v-list-item-header>
          <v-list-item-title>Kommunikation</v-list-item-title>
          <v-list-item-subtitle>Ihr müsst nicht unbedingt miteinander reden können, aber so macht es mehr Spaß</v-list-item-subtitle>
        </v-list-item-header>
      </v-list-item>
    </v-list>

    <h2 class="ma-2">Spielablauf</h2>
    <v-expansion-panels v-model="openPanels" multiple>
      <v-expansion-panel value="Vorbereitung">
        <v-expansion-panel-title>Vorbereitung</v-expansion-panel-title>
        <v-expansion-panel-text>
          <p>
            Bevor ihr anfangen könnt zu spielen, müsst ihr euch im Warteraum zusammenfinden. Dafür muss ein Spieler einen neuen Raum starten und den anderen Spielern den Raumcode zukommen lassen.
            Den Raumcode findest du im Warteraum oben rechts. Weil der Raumcode in der Regel sehr lang ist, kannst du mit "Kopieren" den Raumcode in den Buffer deines Geräts kopieren.
          </p>
          <p>
            Alle anderen Spieler können dann mit diesem Raumcode dem Raum beitreten. Wenn alles Spieler im Raum sind und sich "Bereit" gemacht haben,
            kann es losgehen und ein beliebiger Spieler kann das Spiel starten.
          </p>
        </v-expansion-panel-text>
      </v-expansion-panel>
      <v-expansion-panel value="HowTo">
        <v-expansion-panel-title>Wie man spielt</v-expansion-panel-title>
        <v-expansion-panel-text>
          <p>
            In jeder Runde gibt es einen Hinweisgeber und viele Ratende.
          </p>
          <br>

          <ul>
            <li>
              Der Hinweisgeber kann in der Kopfzeile als farbig hinterlegter Spieler erkannt werden. Dieser Spieler bekommt ein Wort angezeigt, das für diese Runde gilt.
              Indem er oder sie auf ein Begriffssfeld klickt, kann er Spielsteine auf den Feldern verteilen. Steine gibt es in fünf Farben, von denen Grün als wichtigste Farbe ist.
              Auf jedes Feld kann pro Farbe ein Hauptstein und 0-5 normale Steine gesetzt werden. Mit Hauptsteinen sollen Hauptkonzepte vermittelt werden und normale Steine passen diese Konzepte an.
            </li>
            <li>Ratende Spieler können aus den Hinweisen versuchen, das richtige Wort zu erraten, indem sie in das Nachrichtenfeld ihre Tipps eintippen.</li>
          </ul>
        </v-expansion-panel-text>
      </v-expansion-panel>
      <v-expansion-panel value="RoundEnd">
        <v-expansion-panel-title>Ende der Runde</v-expansion-panel-title>
        <v-expansion-panel-text>
          <p>
            Wenn ein ratender Spieler den richtigen Begriff genannt hat, endet die Runde. Der Hinweisegeber erhält 1 Punkt und der Spieler mit dem richtigen Tipp bekommt 2 Punkte.
          </p>
        </v-expansion-panel-text>
      </v-expansion-panel>
      <v-expansion-panel value="GameEnd">
        <v-expansion-panel-title>Ende des Spiels</v-expansion-panel-title>
        <v-expansion-panel-text>
          <p>
            Ihr könnt euch ein Rundenlimit oder Zeitlimit setzen. Für die ersten Spiele schlagen wir 3 Runden als Rundenlimit vor.
            Sobald das Limit erreicht ist, gewinnt der Spieler mit den meisten Punkten. Bei Gleichstand gewinnen alle Spieler mit den meisten Punkten.
          </p>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script>
export default {
  name: 'InstructionView',

  data () {
    return {
      // openPanels: ["Vorbereitung", "HowTo", "RoundEnd"]
      openPanels: []
    }
  }
}
</script>
