import { workData } from "@/assets/assets";
import { motion } from "motion/react";
import Link from "next/link";

import React from "react";

function BentoBox() {
  const gridSpans = [
    "col-span-1 md:col-span-2 row-span-1",
    "col-span-1",
    "col-span-1",
    "col-span-1 md:col-span-2",
  ];
  return (
    <div className="w-11/12 max-w-6xl mx-auto py-30">
      <div className="text-center mb-10">
        <motion.h3
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-xl md:text-2xl font-Ovo mb-3"
        >
          My portfolio
        </motion.h3>
        <motion.h1
          initial={{ y: -30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-3xl sm:text-6xl font-Ovo"
        >
          My latest work
        </motion.h1>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.7 }}
        className="grid grid-cols-1 md:grid-cols-3 auto-rows-[300px] md:auto-rows-[500px] gap-4 h-full w-full"
      >
        {workData.map((project, index) => {
          const spanClass = gridSpans[index % gridSpans.length] || "col-span-1";

          return (
            <Link
              href={`/projects/${project.slug}`}
              key={index}
              className={`relative group ${spanClass}`}
            >
              <motion.div className="relative flex h-full flex-col overflow-hidden rounded-xl transform transition-transform duration-300 group-hover:-translate-y-1">
                <img
                  src={project.bgImage}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover rounded-b-xl"
                />
                <div className="bg-white w-10/12 rounded-md absolute bottom-5 left-1/2 -translate-x-1/2 py-3 px-5 flex items-center duration-500 group-hover:bottom-7 font-Outfit">
                  <div>
                    <h3 className="text-xl font-semibold dark:text-black">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-700">{project.category}</p>
                  </div>
                </div>
              </motion.div>
            </Link>
          );
        })}
      </motion.div>
    </div>
  );
}

export default BentoBox;
