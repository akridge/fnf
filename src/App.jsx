import { useState } from 'react'
import photos from './data/photos.json'
import FishCard from './components/FishCard.jsx'

export default function App() {
  const [stack, setStack] = useState(photos)
  const [score, setScore] = useState({ yes: 0, no: 0 })

  const onVote = yes => {
    setScore(s => ({ ...s, [yes ? 'yes' : 'no']: s[yes ? 'yes' : 'no'] + 1 }))
    setStack(s => s.slice(1))
  }

  return (
    <main>
      <h1>Fish Swipe</h1>
      <p>Swipe → for YES, ← for NO</p>

      {stack.length ? (
        <FishCard photo={stack[0]} onSwipe={onVote} />
      ) : (
        <p>No more photos.<br/>✔ {score.yes} ✖ {score.no}</p>
      )}
    </main>
  )
}