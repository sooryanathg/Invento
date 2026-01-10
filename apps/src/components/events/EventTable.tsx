"use client"

import { useEvents } from "@/src/context/EventContext"

export default function EventTable() {
  const { events } = useEvents()

  return (
    <div className="w-full">

      <div className="flex items-center px-6 pb-4 border-b border-white/40 text-sm">
        <div className="flex-[7] flex items-center gap-4 pl-4">
          <button className="flex items-center gap-2 border border-white/50 px-3 py-1 text-xs uppercase font-semibold">
             Filter
            <img src="/filter.svg" alt="filter" className="w-4 h-4" />
           
          </button>
          <span className="uppercase tracking-wide">Event</span>
        </div>
        <div className="flex-[2] uppercase tracking-wide -ml-6">Time</div>
        <div className="flex-[2] uppercase tracking-wide text-center">Venue</div>
        <div className="flex-[1]" />
      </div>

      {events.map(event => (
        <div
          key={event.id}
          className="flex items-center px-6 py-8 border-b border-white/30"
        >
          <div className="flex-[7] flex gap-6 pl-4">
            <img
              src={event.poster}
              alt={event.title}
              className="w-32 h-44 object-cover border border-white/30"
            />

            <div>
              <span className="inline-flex justify-center items-center mb-3 bg-red-600 px-6 py-1 text-xs font-bold uppercase font-akira min-w-[140px]">
                {event.category}
              </span>

              <h3 className="text-2xl font-extrabold uppercase font-akira ml-2">
                {event.title}
              </h3>

                <p className="mt-2 max-w-[320px] text-xs text-gray-300 font-flood leading-tight">
                {event.description}
              </p>
            </div>
          </div>

          <div className="flex-[2] text-sm font-semibold -ml-6">
            {event.time}
          </div>

          <div className="flex-[2] text-sm font-semibold text-center pr-6">
            {event.venue}
          </div>

          <div className="flex-[1] text-right pl-6">
            <button className="bg-red-600 px-6 py-2 text-xs font-bold uppercase hover:bg-red-700">
              Register
            </button>
          </div>
        </div>
      ))}

    </div>
  )
}
