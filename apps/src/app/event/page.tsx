"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import EventTable from "@/src/components/events/EventTable"
import EventScheduleHeader from "@/src/components/events/EventScheduleHeader"

const FallingLeaves = dynamic(
  () => import("@/src/components/events/fallingleaves"),
  { ssr: false }
)

export default function EventsPage() {
  const [activeDay, setActiveDay] = useState<1 | 2 | 3>(1)

  return (
    <div
      className="min-h-screen w-full relative text-white
                 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('event/eventbg.svg')" }}
    >
      <FallingLeaves />

      <div className="relative z-[5] min-h-screen w-full">
        <div className="flex w-full min-h-screen">
          <div className="w-[15%]" />
          <div className="w-[85%] pr-10 py-16 relative">
            <EventScheduleHeader
              activeDay={activeDay}
              setActiveDay={setActiveDay}
            />
            <EventTable activeDay={activeDay} />
          </div>
        </div>
      </div>
    </div>
  )
}
