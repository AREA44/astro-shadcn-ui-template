// https://gist.github.com/mackenziechild/035fc7c96d648b4eada1f5d9ba4eb2dc#file-carousel-js

import { useState } from 'react'
import { motion } from 'framer-motion'

const IMAGES_DATA = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1417325384643-aac51acc9e5d',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1417325384643-aac51acc9e5d',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1417325384643-aac51acc9e5d',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1417325384643-aac51acc9e5d',
  },
]

export default function Carousel() {
  const [images, setImages] = useState(IMAGES_DATA)

  const handleMove = (direction: number) => {
    const imgArrCopy = [...images]

    if (direction > 0) {
      const firstItem = imgArrCopy.shift()
      if (!firstItem) return
      imgArrCopy.push({ ...firstItem, id: Math.random() })
      setImages(imgArrCopy)
    } else {
      const lastItem = imgArrCopy.pop()
      imgArrCopy.unshift({ ...lastItem, id: Math.random() })
      setImages(imgArrCopy)
    }
    console.log('images', images)
  }

  const variants = {
    active: {
      x: 'calc(-50% + 0px)',
      width: '22rem',
      scale: 1.1,
      opacity: 1,
    },
    level1: (position: number) => ({
      x: `calc(-50% + ${position * 240}px)`,
      width: '3rem',
      scale: 0.9,
      opacity: 1,
    }),
    level2: (position: number) => ({
      x: `calc(-50% + ${position * 145}px)`,
      width: '2rem',
      scale: 0.75,
      opacity: 1,
    }),
    level3: (position: number) => ({
      x: `calc(-50% + ${position * 108}px)`,
      width: '1.5rem',
      scale: 0.5,
      opacity: 1,
    }),
    level4: (position: number) => ({
      x: `calc(-50% + ${position * 90}px)`,
      width: 0,
      scale: 0.25,
      opacity: 0,
    }),
  }

  return (
    <div className="relative mx-auto flex h-96 w-[90%] items-center justify-center">
      {images.map((image, i) => {
        let position = 0

        if (images.length % 2) {
          position = i - (images.length + 1) / 2
        } else {
          position = i - images.length / 2
        }

        let imgLevel =
          position === 0
            ? 'active'
            : position === -1 || position === 1
              ? 'level1'
              : position === -2 || position === 2
                ? 'level2'
                : position === -3 || position === 3
                  ? 'level3'
                  : 'level4'

        return (
          <motion.div
            key={image.id}
            initial={false}
            className={`absolute left-1/2 aspect-[3/2] h-60 flex-none overflow-hidden rounded-3xl border border-neutral-200 shadow-md dark:border-neutral-700`}
            animate={imgLevel}
            custom={position}
            variants={variants}
            transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
          >
            <img
              src={image.src}
              className="h-full w-full object-cover"
              alt={`Carousel image ${i + 1}`}
            />
          </motion.div>
        )
      })}
      <button
        onClick={() => handleMove(-1)}
        className="absolute -left-6 grid h-14 w-14 place-content-center  text-3xl transition-colors hover:text-sky-500"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5 8.25 12l7.5-7.5"
          />
        </svg>
      </button>
      <button
        onClick={() => handleMove(1)}
        className="absolute -right-6 grid h-14 w-14 place-content-center  text-3xl transition-colors hover:text-sky-500"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
    </div>
  )
}
