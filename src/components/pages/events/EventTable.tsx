"use client"

import { useState } from "react"
import { useEvents } from "@/src/context/EventContext"
import { Event, EventCategory } from "@/src/types/event"
import EventModal from "./EventModal"

const categories: (EventCategory | "ALL")[] = [
  "ALL",
  "WORKSHOP",
  "SAPTHA",
  "NATYA",
  "TECH",
  "GENERAL",
  "TAKSATHI",
]

const categoryColors: Record<EventCategory | "ALL", string> = {
  WORKSHOP: "bg-red-600",
  SAPTHA: "bg-fuchsia-600",
  NATYA: "bg-pink-600",
  TECH: "bg-indigo-500",
  GENERAL: "bg-gray-500",
  TAKSATHI: "bg-amber-700",
  ALL: "bg-red-600",
}

export default function EventTable({
  activeDay,
  onModalChange,
}: {
  activeDay: 1 | 2 | 3
  onModalChange: (open: boolean) => void
}) {
  const { events } = useEvents()

  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<EventCategory | "ALL">("ALL")
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)

  const filteredEvents =
    active === "ALL" ? events : events.filter(e => e.category === active)

  const dayFilteredEvents = filteredEvents.filter(
    e => e.day === activeDay
  )

  return (
    <div className="w-full relative">

      {/* ---------------- MOBILE FILTER ---------------- */}
      <div className="md:hidden relative">
        <button
          onClick={() => setOpen(!open)}
          className="absolute -top-8 left-9 flex items-center gap-2 border border-white/50 px-3 py-1 text-[10px] uppercase tracking-widest font-akira bg-bg"
        >
          <img src="/event/filter.svg" className="w-4 h-4" />
          Filter
        </button>

        {open && (
          <div className="absolute top-12 left-4 backdrop-blur-md p-4 grid gap-2 z-30 w-48">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => {
                  setActive(cat)
                  setOpen(false)
                }}
                className={`py-2 text-xs uppercase tracking-widest text-white font-akira ${categoryColors[cat]}`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ---------------- DESKTOP HEADER ---------------- */}
      <div className="hidden md:flex items-center px-6 pb-4 border-b border-white/40 text-xs sticky top-0 z-10 bg-bg">

        <div className="flex-[7] flex items-center gap-8 pl-4 relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 border border-white/50 px-4 py-2 uppercase tracking-widest font-akira"
          >
            <img src="/event/filter.svg" className="w-4 h-4" />
            Filter
          </button>

          <span className="uppercase tracking-[0.25em] text-sm font-akira">
            Event
          </span>

          {open && (
            <div className="absolute top-12 left-4 backdrop-blur-md p-8 grid grid-cols-2 gap-x-10 gap-y-6 z-30">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => {
                    setActive(cat)
                    setOpen(false)
                  }}
                  className={`w-48 py-3 uppercase tracking-widest text-white font-akira ${categoryColors[cat]}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex-[2] uppercase tracking-wide font-semibold">Time</div>
        <div className="flex-[2] uppercase tracking-wide font-semibold">Venue</div>
        <div className="flex-[1]" />
      </div>

      {/* ---------------- EVENTS LIST ---------------- */}
      <div className="max-h-[65vh] overflow-y-auto pr-2">
        {dayFilteredEvents.map(event => (
          <div
            key={event.id}
            onClick={() => {
              setSelectedEvent(event)
              onModalChange(true)
            }}
            className="flex flex-col md:flex-row md:items-center px-6 py-8 md:py-10 border-b border-white/30 cursor-pointer hover:bg-white/5 transition"
          >

            {/* LEFT */}
            <div className="flex-[7] flex gap-6">

              <img
                src={event.poster}
                alt={event.title}
                className="w-24 md:w-32 h-32 md:h-44 object-cover border border-white/30 flex-shrink-0"
              />

              <div>

                {/* CATEGORY BADGE (Akira) */}
                <span
                  className={`inline-flex justify-center items-center mb-4 w-32 md:w-48 py-1.5 text-[10px] md:text-xs uppercase tracking-widest font-akira text-white ${categoryColors[event.category]}`}
                >
                  {event.category}
                </span>

                {/* TITLE (Akira only) */}
                <h3 className="text-sm md:text-2xl font-akira uppercase tracking-wide">
                  {event.title}
                </h3>

                {/* DESCRIPTION (normal readable font) */}
                <p className="mt-2 text-xs md:text-sm text-gray-300 font-sans max-w-[360px] line-clamp-3">
                  {event.description}
                </p>

              </div>
            </div>

            {/* TIME */}
            <div className="hidden md:flex md:flex-[2] text-sm font-semibold">
              {event.time}
            </div>

            {/* VENUE */}
            <div className="hidden md:flex md:flex-[2] text-sm font-semibold">
              {event.venue}
            </div>

            {/* REGISTER BUTTON */}
            <div className="flex md:flex-[1] md:justify-end mt-3 md:mt-0">
              <button className="bg-red-600 px-5 py-2 text-xs uppercase tracking-widest font-akira hover:bg-red-700 transition">
                Register
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* ---------------- MODAL ---------------- */}
      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          onClose={() => {
            setSelectedEvent(null)
            onModalChange(false)
          }}
        />
      )}
    </div>
  )
}
