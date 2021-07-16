<script context="module">
  export const hydrate = true
</script>

<script>
  import { onMount } from "svelte"

  import TocItem from "./TocItem.svelte"

  /** @type {import("$lib/posts").PostToc[]} */
  export let toc
  /** @type {string[]} */
  export let tocIDs

  let highlightedTocID = null

  const updateTocHighlight = (id, offset) => {
    const idx = tocIDs.indexOf(id)
    const targetIdx = idx + offset
    if (targetIdx < 0 || tocIDs.length <= targetIdx) return
    highlightedTocID = tocIDs[targetIdx]
  }

  /** @param {Map<string, number>} prevYMap */
  const initObserver = (prevYMap) => {
    return new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const { target, isIntersecting, intersectionRatio: ratio } = e
          const { y } = e.boundingClientRect
          const id = target.getAttribute("id")
          const prevY = prevYMap.get(id)
          prevYMap.set(id, y)
          // 初回
          if (prevY === null) continue
          const diff = y - prevY
          if (isIntersecting) {
            // 画面上部に交差しているならそれをハイライト
            updateTocHighlight(id, 0)
          } else if (!isIntersecting && diff > 0) {
            // 画面上部から下向きにスクロールされたら1つ上をハイライト
            updateTocHighlight(id, -1)
          }
        }
      },
      { threshold: 0, rootMargin: "-1% 0px -99% 0px" }
    )
  }

  onMount(() => {
    const prevYMap = new Map()
    const observer = initObserver(prevYMap)
    for (const id of tocIDs) {
      const heading = document.getElementById(id)
      if (!heading) continue
      observer.observe(heading)
    }
    return () => observer.disconnect()
  })
</script>

<TocItem {toc} highlight={highlightedTocID} />
