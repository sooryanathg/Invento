import EventTable from "@/src/components/events/EventTable"

export default function EventsPage() {
  return (
    <div
      className="min-h-screen w-full bg-[length:100%_auto] bg-center bg-no-repeat text-white"
      style={{ backgroundImage: "url('/eventbg.svg')" }}
    >
      <div className="min-h-screen w-full">
        <div className="flex w-full min-h-screen">

          <div className="w-[15%]" />

          <div className="w-[85%] pr-10 py-16 relative">

            <div className="absolute top-15 right-[18%] text-left leading-[0.6]">
              <h2 className="text-6xl font-extrabold uppercase text-red-600 font-akira tracking-[0.1em]">
                Day 1
              </h2>
              <span className="block text-7xl font-extrabold uppercase text-red-600 font-akira tracking-[0.1em]">
                29 Jan
              </span>
            </div>

            <div className="mb-20 pl-10">
              <h1 className="text-7xl font-extrabold uppercase text-white font-akira">
                Event
              </h1>
              <h1 className="text-7xl font-extrabold uppercase text-white font-akira">
                Schedule
              </h1>
            </div>

            <EventTable />

          </div>
        </div>
      </div>
    </div>
  )
}
