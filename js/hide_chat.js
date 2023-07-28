/**
   * Hide/Show Composer
   * @title The title displayed in the flow editor
   * @category Custom
   * @author Amrit
   */
const yn = require('yn')
const hideChat = async hide => {
    const payload = [
        {
            type: 'custom',
            module: 'hide-chat',
            component: 'HideChat',
            hidden: yn(hide),
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

return hideChat(args.hide)