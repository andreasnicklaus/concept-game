<template>
  <section class="page">
    <header class="page__head">
      <h1 class="page__title">Über mich und das Spiel</h1>
    </header>

    <div class="about">
      <article class="author diecut">
        <img
          class="author__photo"
          src="@/assets/AndreasNicklaus.jpeg"
          alt="Porträt von Andreas Nicklaus"
          width="148"
          height="148"
        />
        <div class="author__body">
          <p class="author__name">Andreas Nicklaus</p>
          <p class="prose">
            Ich habe diese Seite erstellt und bin stolz darauf. Wenn du mich
            erreichen willst, kannst du das hier tun:
          </p>
          <ul class="link-list" aria-label="Kontakt und Profile">
            <li><a href="https://www.instagram.com/andreasnicklaus/" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a href="https://twitter.com/AndreasNicklaus" target="_blank" rel="noopener noreferrer">Twitter</a></li>
            <li><a href="https://www.linkedin.com/in/andreasnicklaus/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
            <li><a href="https://github.com/andreasnicklaus" target="_blank" rel="noopener noreferrer">GitHub</a></li>
          </ul>
        </div>
      </article>

      <article class="panel">
        <h2 class="panel__title">Das Spiel</h2>
        <p class="prose">
          Ich habe mir dieses Spiel nicht selbst ausgedacht. Dieses Spiel ist nicht
          meins, das echte Spiel kann man kaufen und ich empfehle jedem, genau das
          zu tun.
        </p>
        <a class="btn btn--primary" href="https://www.amazon.de/Asmodee/dp/B00GM988LG?th=1" target="_blank" rel="noopener noreferrer">
          Zum Shop
        </a>
      </article>
    </div>
  </section>
</template>

<script>
export default {
  name: 'AboutView'
}
</script>
