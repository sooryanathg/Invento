"use client"

import { useState } from "react"
import { useEvents } from "@/src/context/EventContext"
import { EventCategory } from "@/src/types/event"

const categories: (EventCategory | "ALL")[] = [
  "ALL",
  "WORKSHOP",
  "SAPTHA",
  "NATYA",
  "TECH",
  "GENERAL",
]

const categoryColors: Record<string, string> = {
  WORKSHOP: "bg-red-600",
  SAPTHA: "bg-fuchsia-600",
  NATYA: "bg-pink-600",
  TECH: "bg-indigo-500",
  GENERAL: "bg-gray-500",
  ALL: "bg-red-600",
}

export default function EventTable({
  activeDay,
}: {
  activeDay: 1 | 2 | 3
}) {
  const { events } = useEvents()
  const [open, setOpen] = useState(false)
  const [activeCategory, setActiveCategory] =
    useState<EventCategory | "ALL">("ALL")

  const categoryFiltered =
    activeCategory === "ALL"
      ? events
      : events.filter(e => e.category === activeCategory)

  const dayFilteredEvents = categoryFiltered.filter(
    e => e.day === activeDay
  )

  return (
    <div className="w-full relative">

      <div className="flex items-center px-6 pb-4 border-b border-white/40 text-xs sticky top-0 z-20 bg-black">
        <div className="flex-[7] flex items-center gap-8 pl-4 relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 border border-white/50 px-4 py-1.5 text-xs uppercase font-semibold tracking-wider"
          >
            <img src="/filter.svg" className="w-4 h-4" />
            Filter
          </button>

          <span className="uppercase tracking-[0.25em] text-sm">
            Event
          </span>

          {open && (
            <div className="absolute top-12 left-4 backdrop-blur-md p-8 grid grid-cols-2 gap-x-15 gap-y-6 z-30">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat)
                    setOpen(false)
                  }}
                  className={`w-48 py-3 text-sm font-extrabold uppercase tracking-widest text-center text-white font-akira ${categoryColors[cat]}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex-[2] uppercase tracking-wide -ml-6">Time</div>
        <div className="flex-[2] uppercase tracking-wide text-center">Venue</div>
        <div className="flex-[1]" />
      </div>

      <div
        key={activeDay}
        className="max-h-[65vh] overflow-y-auto pr-2 opacity-0 animate-fadeIn"
      >
        {dayFilteredEvents.map(event => (
          <div
            key={event.id}
            className="flex items-center px-6 py-10 border-b border-white/30"
          >
            <div className="flex-[7] flex gap-8 pl-4">
              <img
                src={event.poster}
                alt={event.title}
                className="w-32 h-44 object-cover border border-white/30"
              />

              <div>
                <span
                  className={`inline-flex justify-center items-center mb-4 w-48 py-2 text-xs font-extrabold uppercase tracking-widest font-akira text-white ${categoryColors[event.category]}`}
                >
                  {event.category}
                </span>

                <h3 className="text-2xl font-extrabold uppercase font-akira">
                  {event.title}
                </h3>

                <p className="mt-3 max-w-[340px] text-sm text-gray-300 font-flood leading-snug">
                  {event.description}
                </p>
              </div>
            </div>

            <div className="flex-[2] text-sm font-semibold -ml-6">
              {event.time}
            </div>

            <div className="flex-[2] text-sm font-semibold text-center">
              {event.venue}
            </div>

            <div className="flex-[1] text-right pl-6">
              <button className="bg-red-600 px-7 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-red-700">
                Register
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
