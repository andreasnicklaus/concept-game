export default {
  snack (context, { message, timeout }) {
    context.commit('openSnackbar', message)

    if (timeout) {
      setTimeout(() => {
        context.commit('closeSnackbar')
      }, timeout)
    }
  },

  setReady (context, { readyStatus }) {
    context.commit('changeReadyStatus', {
      playerName: context.state.playerName,
      newStatus: readyStatus
    })
  }
}
