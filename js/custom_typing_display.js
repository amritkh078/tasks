/**
* Custom typing animation
* @title The title displayed in the flow editor
* @category Custom
* @author Amrit
*/

const myAction = async () => {
    const intervalMs = 500
    const typingDuration = 2000
    let typingFinished = false

    const interval = setInterval(() => {
        bp.events.replyToEvent(event, [{ type: 'typing', value: intervalMs }])
    }, intervalMs)

    await new Promise(resolve => setTimeout(resolve, typingDuration))

    clearInterval(interval)
    typingFinished = true
    return typingFinished
}

return myAction()