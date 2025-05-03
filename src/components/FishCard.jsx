import { useState, useEffect } from 'react'
import TinderCard from 'react-tinder-card'
import { predict } from '../api.js'

export default function FishCard({ photo, onSwipe }) {
  const [banner, setBanner] = useState(null) // null | true | false

  useEffect(() => {
    fetch(photo.url)
      .then(r => r.blob())
      .then(predict)
      .then(({ is_fish }) => setBanner(is_fish))
      .catch(() => setBanner(Math.random() > 0.5))
  }, [photo.url])

  return (
    <TinderCard
      className="swipe"
      onSwipe={dir => onSwipe(dir === 'right')}
      preventSwipe={['up', 'down']}
    >
      <div className="card">
        {banner !== null && (
          <span className={banner ? 'tag fish' : 'tag nofish'}>
            {banner ? 'Fish' : 'No Fish'}
          </span>
        )}
        <img src={photo.url} alt="" />
      </div>
    </TinderCard>
  )
}