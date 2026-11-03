<template>
  <section class="page">
    <header class="page__head">
      <h1 class="page__title">So spielt ihr Concept</h1>
      <p class="page__lead">
        Du bist gedanklich auf dem gleichen Level wie deine Freunde und Familie?
        Finde es heraus. Platziere Hinweissteine auf den Begriffsfeldern und gib
        Hinweise darauf, was du meinst. Ein männlicher Schauspieler der
        Vergangenheit? Eine schwarz-rot-goldene Stadt, die halbiert wurde? Weißes
        Pulver für Kleidung? Wenn du solche Rätsel magst, ist das Spiel für dich.
      </p>
    </header>

    <section class="page__section">
      <h2>Was ihr braucht</h2>
      <dl class="fact-list">
        <div class="fact-row">
          <dt>Spieler</dt>
          <dd>Ein bis zwei Spieler mit eigenen Geräten oder Browsern.</dd>
        </div>
        <div class="fact-row">
          <dt>Kommunikation</dt>
          <dd>
            Ihr müsst nicht unbedingt miteinander reden können, aber so macht es
            mehr Spaß.
          </dd>
        </div>
      </dl>
    </section>

    <section class="page__section">
      <h2>Spielablauf</h2>
      <div class="rule-list">
        <details class="rule" open>
          <summary>Vorbereitung</summary>
          <div class="rule__body">
            <p>
              Bevor ihr anfangen könnt zu spielen, müsst ihr euch im Warteraum
              zusammenfinden. Dafür muss ein Spieler einen neuen Raum starten und
              den anderen Spielern den Raumcode zukommen lassen. Den Raumcode
              findest du im Warteraum oben rechts. Weil der Raumcode in der Regel
              sehr lang ist, kannst du mit „Code kopieren“ den Raumcode in den
              Zwischenspeicher deines Geräts kopieren.
            </p>
            <p>
              Alle anderen Spieler können dann mit diesem Raumcode dem Raum
              beitreten. Wenn alle Spieler im Raum sind und sich „Bereit“ gemacht
              haben, kann es losgehen und ein beliebiger Spieler kann das Spiel
              starten.
            </p>
          </div>
        </details>

        <details class="rule" open>
          <summary>Wie man spielt</summary>
          <div class="rule__body">
            <p>In jeder Runde gibt es einen Hinweisgeber und viele Ratende.</p>
            <ul>
              <li>
                Der Hinweisgeber kann in der Kopfzeile als farbig hinterlegter
                Spieler erkannt werden. Dieser Spieler bekommt ein Wort angezeigt,
                das für diese Runde gilt. Indem er oder sie auf ein Begriffsfeld
                klickt, kann er Spielsteine auf den Feldern verteilen. Steine gibt
                es in fünf Farben, von denen Grün als wichtigste Farbe ist. Auf
                jedes Feld kann pro Farbe ein Hauptstein und 0 bis 5 normale
                Steine gesetzt werden. Mit Hauptsteinen werden Hauptkonzepte
                vermittelt, normale Steine passen diese Konzepte an.
              </li>
              <li>
                Ratende Spieler können aus den Hinweisen versuchen, das richtige
                Wort zu erraten, indem sie in das Nachrichtenfeld ihre Tipps
                eintippen.
              </li>
            </ul>
          </div>
        </details>

        <details class="rule">
          <summary>Ende der Runde</summary>
          <div class="rule__body">
            <p>
              Wenn ein ratender Spieler den richtigen Begriff genannt hat, endet
              die Runde. Der Hinweisgeber erhält 1 Punkt und der Spieler mit dem
              richtigen Tipp bekommt 2 Punkte.
            </p>
          </div>
        </details>

        <details class="rule">
          <summary>Ende des Spiels</summary>
          <div class="rule__body">
            <p>
              Ihr könnt euch ein Rundenlimit oder Zeitlimit setzen. Für die
              ersten Spiele schlagen wir 3 Runden als Rundenlimit vor. Sobald das
              Limit erreicht ist, gewinnt der Spieler mit den meisten Punkten. Bei
              Gleichstand gewinnen alle Spieler mit den meisten Punkten.
            </p>
          </div>
        </details>
      </div>
    </section>
  </section>
</template>

<script>
export default {
  name: 'InstructionView'
}
</script>
