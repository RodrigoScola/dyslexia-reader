// let nextState = "ON"
// const g = async () => {
//   chrome.storage.local.get("dsavailable").then((e) => console.log(e))
// }
// g()

// if (!window.location.href.startsWith("https://www.google.com")) {
//   const elements = document.querySelectorAll(
//     "td,th,h1,p,a,h2,h3,h4,h5,h6,input,li,button,figcaption,dd,dt,dl,label,em"
//   )
//   for (let i = 0; i < elements.length; i++) {
//     const element = elements[i]

//     if (element.textContent.length <= 0) continue
//     const words = element.textContent.split(" ")
//     let fullWords = []
//     for (let i = 0; i < words.length; i++) {
//       let word = words[i]
//       if (word.indexOf(/\W/gi) == -1) {
//         let firstChar = /[a-z]/i.exec(word)?.index
//         if (!firstChar) firstChar = 0
//         let prepend = firstChar != 0 ? word.slice(0, firstChar) : ""
//         let firstWord = word.slice(firstChar || 0, firstChar + 2)
//         firstWord = firstWord.charAt(0).toUpperCase() + firstWord.slice(1)

//         fullWords.push(
//           `${prepend}<strong>${firstWord}</strong>${word.slice(
//             firstWord.length + prepend.length
//           )}`
//         )
//       }
//     }

//     element.innerHTML = fullWords.join(" ")

//     // console.log({
//     //   element: element.innerHTML,
//     //   prev: prev.innerHTML,
//     // })
//   }
// }
