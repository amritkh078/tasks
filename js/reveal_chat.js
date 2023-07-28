/**
   * Reveal chat section when hidden
   * @title The title displayed in the flow editor
   * @category Custom
   * @author Amrit
   */
const revealChat = async () => {
    const payload = [
      {
        type: 'custom',
        module: 'hide-chat',
        component: 'HideChat',
        hidden: false,
        noBubble: true
      }
    ]

    await bp.events.replyToEvent(
      {
        botId: event.botId,
        channel: event.channel,
        target: event.target,
        threadId: event.threadId
      },
      payload,
      event.id
    )
  }

  return revealChat()