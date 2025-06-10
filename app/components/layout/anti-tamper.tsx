import Script from 'next/script'
import React from 'react'

export default function AntiTamper() {
  const antiDebugScript = `
    (function () {
      // Build the obfuscated array once
      const getObfuscatedArray = (function() {
        const arr = [
          "26QpbFET","9182628whqwOF","55450rnGjRK","117144yjpPMa",
          "script","11xzDhQX","803823yBAIvL","about:blank","12486150SlkncM",
          "location","opener","clear","699405pPqcwt","4QBMuIN","40TsyThq",
          "href","toString","18prXytW","querySelector","replace",
          "history","368LjTheM","log","637842vDHptn"
        ]
        return () => arr
      })()

      // Decoder function
      function decodeString(code) {
        return getObfuscatedArray()[code - 0x14e]
      }

      // Rotate until checksum matches
      ;(function(getArr, target) {
        const arr = getArr(), d = decodeString
        while (true) {
          try {
            const sum =
              parseInt(d(0x160)) / 1 +
              (-parseInt(d(0x14f)) / 2) * (parseInt(d(0x159)) / 3) +
              (-parseInt(d(0x157)) / 4) * (-parseInt(d(0x15c)) / 5) +
              (parseInt(d(0x153)) / 6) * (-parseInt(d(0x14e)) / 7) +
              (-parseInt(d(0x150)) / 8) * (parseInt(d(0x15d)) / 9) +
              (-parseInt(d(0x162)) / 10) * (-parseInt(d(0x15f)) / 11) +
              (-parseInt(d(0x15b)) / 12) * (parseInt(d(0x15a)) / 13)
            if (sum === target) break
            arr.push(arr.shift())
          } catch {
            arr.push(arr.shift())
          }
        }
      })(getObfuscatedArray, 0xb7a63)

      // What to do when someone tries to inspect/debug
      function onOpen() {
        setTimeout(() => {
          window[decodeString(0x164)] = null
          window.open('', '_self'); window.close()
          window[decodeString(0x156)].back()
          window.location[decodeString(0x155)](decodeString(0x161))
          window[decodeString(0x163)][decodeString(0x151)] = 'about:blank'
          const el = document[decodeString(0x154)](decodeString(0x15e))
          el && el.remove()
        }, 15)
        setTimeout(() => {
          console[decodeString(0x165)].bind(console)
        }, 5)
      }

      class CustomError extends Error {
        get message() {
          console.clear(); onOpen(); return ''
        }
        toString() {}
      }

      console[decodeString(0x158)](new CustomError())
    })();

    // Block Ctrl+S / ⌘+S, right-click, copy and selection
    window.addEventListener('keydown', e => {
      if ((e.ctrlKey||e.metaKey) && (e.key.toLowerCase() === 's' || e.key.toLowerCase() === 'c')) {
        e.preventDefault()
      }
    })
    window.addEventListener('contextmenu', e => e.preventDefault())
    window.addEventListener('copy', e => e.preventDefault())
    window.addEventListener('selectstart', e => e.preventDefault())

    // Inject CSS to disable user selection
    const style = document.createElement('style')
    style.innerHTML = "* { user-select: none !important; -webkit-user-select: none !important; -ms-user-select: none !important; }"
    document.head.appendChild(style)
  `

  return (
    <Script
      id="anti-tamper"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{ __html: antiDebugScript }}
    />
  )
}
