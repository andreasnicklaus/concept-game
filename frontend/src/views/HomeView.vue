<template>
  <div class="home">
    <section class="home__hero">
      <div class="home__intro">
        <h1 class="home__title">Ein Wort. Viele Hinweise.</h1>
        <p class="home__lead">
          Eine Person legt Steine auf Begriffsfelder, alle anderen raten. Kein
          Bildschirm teilen, kein Reden nötig, nur ein Gerät pro Person.
        </p>

        <div class="home__actions">
          <button
            class="btn btn--primary"
            type="button"
            @click="startDialog = true"
          >
            Neues Spiel starten
          </button>
          <button class="btn" type="button" @click="joinDialog = true">
            Spiel beitreten
          </button>
        </div>

        <p class="home__note">
          Du kennst das Spiel noch nicht?
          <RouterLink class="text-link" to="/instructions"
            >Die Anleitung erklärt es in zwei Minuten.</RouterLink
          >
        </p>
      </div>

      <div
        class="home__example"
        role="img"
        aria-label="Beispiel für Jogamatte: Objekt, Erholung, Frau, Mann"
      >
        <p class="home__example-label">
          Beispiel: <span class="home__example-word">Jogamatte</span>
        </p>
        <div class="home__board home__board--example">
          <div v-for="field in example" :key="field.index" class="home__tile">
            <img
              :src="`/fieldIMGs/${field.img_src}.png`"
              alt=""
              width="44"
              height="44"
              loading="lazy"
            />
            <span>{{ field.names[0] }}</span>
            <StonePin :stones="field.stones" :label="field.names.join(', ')" />
          </div>
        </div>
      </div>
    </section>

    <section class="home__section">
      <h2>So läuft eine Runde</h2>
      <ol class="home__steps">
        <li v-for="(step, index) in steps" :key="index">
          <span class="home__step-num">{{
            String(index + 1).padStart(2, "0")
          }}</span>
          <div>
            <h3>{{ step.title }}</h3>
            <p>{{ step.text }}</p>
          </div>
        </li>
      </ol>
    </section>

    <section class="home__section home__facts">
      <h2>Was ihr braucht</h2>
      <dl class="fact-list">
        <div class="fact-row">
          <dt>Spieler</dt>
          <dd>Ab zwei Personen mit eigenen Geräten oder Browsern.</dd>
        </div>
        <div class="fact-row">
          <dt>Kommunikation</dt>
          <dd>
            Ihr müsst nicht unbedingt reden können, aber so macht es mehr Spaß.
          </dd>
        </div>
        <div class="fact-row">
          <dt>Punkte</dt>
          <dd>
            Richtiger Tipp: 2 Punkte für den Ratenden, 1 Punkt für den
            Hinweisgeber.
          </dd>
        </div>
      </dl>
    </section>
  </div>

  <StartGameDialog v-model="startDialog" @start="startGame" />
  <JoinGameDialog v-model="joinDialog" @join="joinGame" />
</template>

<script>
import StartGameDialog from "../components/StartGameDialog.vue";
import JoinGameDialog from "../components/JoinGameDialog.vue";
import StonePin from "../components/StonePin.vue";
import gameService from "@/services/gameService";

export default {
  name: "HomeView",

  components: {
    StartGameDialog,
    JoinGameDialog,
    StonePin,
  },

  data() {
    return {
      startDialog: false,
      joinDialog: false,
      steps: [
        {
          title: "Ein Begriff wird gezogen",
          text: "Eine Person bekommt ein Wort. Alle anderen sehen es nicht.",
        },
        {
          title: "Steine auf Begriffsfelder",
          text: "Der Hinweisgeber setzt farbige Steine auf die Felder und beschreibt so das Wort.",
        },
        {
          title: "Raten",
          text: "Die anderen tippen ihre Vermutungen in die Nachrichten.",
        },
        {
          title: "Punkte und nächste Runde",
          text: "Bei einem Treffer gibt es Punkte für Hinweisgeber und Ratenden. Dann geht es weiter.",
        },
      ],
      example: [
        {
          index: 0,
          names: ["Objekt", "Verpackung", "Karton"],
          img_src: "box",
          stones: { green: { major: true, minors: 0 } },
        },
        {
          index: 1,
          names: ["Erholung", "Sport", "Aktivität"],
          img_src: "sport",
          stones: {
            green: { major: false, minors: 1 },
            blue: { major: true, minors: 0 },
          },
        },
        {
          index: 2,
          names: ["Frau", "Weiblich"],
          img_src: "woman",
          stones: { yellow: { major: true, minors: 1 }, blue: { minors: 1 } },
        },
        {
          index: 3,
          names: ["Mann", "Männlich"],
          img_src: "man",
          stones: { yellow: { major: false, minors: 0 } },
        },
      ],
    };
  },

  methods: {
    startGame() {
      this.startDialog = false;
      this.$store.commit("setRoomCode", { roomCode: "" });
      gameService.join();
      this.$router.push("/waitingRoom");
    },

    joinGame() {
      this.joinDialog = false;
      gameService.join();
      this.$router.push("/waitingRoom");
    },
  },
};
</script>
