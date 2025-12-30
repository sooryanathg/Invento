"use client";

import Image from "next/image";
import main from "@/public/main.png";
import AboutText from "@/src/components/about";

export default function About() {
  return (
    <section className="bg-white min-w-screen min-h-screen">
      <div className=" relative">
        <Image
          src={main}
          className="min-w-screen min-h-screen "
          alt="Picture of the author"
        />

        <AboutText/>
      </div>
    </section>
  );
}
