const State = {
  ON: "ON",
  OFF: "OFF",
}
var nextState = State.ON
var currentState = State.ON
var body
chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: State.ON,
  })
})
const setBold = () => {
  const elements = document.querySelectorAll(
    "td,h1,p,a,h2,h3,h4,h5,h6,input,li,span,button,figcaption,label,option,is,em"
  )
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i]
    if (element.textContent.length <= 0) continue
    const words = element.textContent.split(" ")
    let fullWords = []
    for (let i = 0; i < words.length; i++) {
      let word = words[i]
      if (word.length <= 0) {
        continue
      }

      if (word.indexOf(/\W/gi) == -1) {
        let firstChar = /[a-z]/i.exec(word)?.index

        if (!firstChar) firstChar = 0

        let prepend = firstChar != 0 ? word.slice(0, firstChar) : ""

        let firstWord = word.slice(firstChar || 0, firstChar + 2)

        firstWord = firstWord.charAt(0).toUpperCase() + firstWord.slice(1)

        fullWords.push(
          `${prepend}<strong>${firstWord}</strong>${word.slice(
            firstWord.length + prepend.length
          )}`
        )
      }
    }
    element.innerHTML = `
    ${fullWords.join(" ")}
    `
  }
}

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  // if (changeInfo.status == "complete" && tab.active == true) return

  body = document.querySelector("body")

  await chrome.scripting.executeScript({
    func: setBold,
    target: { tabId },
  })
  await chrome.action.setBadgeText({
    tabId: tabId,
    text: nextState,
  })
})

chrome.action.onClicked.addListener(async (tab) => {
  const prevState = await chrome.action.getBadgeText({ tabId: tab.id })
  nextState = prevState == State.ON ? State.OFF : State.ON

  await chrome.action.setBadgeText({
    tabId: tab.id,
    text: nextState,
  })

  if (nextState === State.ON) {
    await chrome.scripting.executeScript({
      func: setBold,
      target: { tabId: tab.id },
    })
  } else if (nextState === "OFF") {
    document.querySelector("body") = body
  }
})
