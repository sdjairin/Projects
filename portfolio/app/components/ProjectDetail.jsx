"use client";
import { workData } from "@/assets/assets";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function ProjectDetail({ params }) {
  const { slug } = React.use(params);
  console.log("Project slug:", slug);
  const project = workData.find((p) => p.slug === slug);

  if (!project) {
    return <div className="text-center text-red-500">Project not found</div>;
  }

  return (
    <div className="w-11/12 max-w-6xl mx-auto py-5">
      <div className="flex justify-start">
        <Link href="/projects" passHref>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.1 }}
            className="w-max flex items-center justify-center gap-2 text-gray-700 border-[0.5px] border-gray-700 rounded-full py-3 px-10 mx-auto my-20 hover:bg-lightHover duration-500 font-Outfit dark:text-white dark:hover:bg-darkHover dark:border-white"
          >
            Back
          </motion.div>
        </Link>
      </div>
      <div className="h-full w-full">
        <div className="text-center mb-10">
          <motion.h3
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl md:text-2xl font-Ovo mb-3"
          >
            {project.category}
          </motion.h3>
          <motion.h1
            initial={{ y: -30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-3xl sm:text-6xl font-Ovo"
          >
            {project.title}
          </motion.h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-11/12 mx-auto mb-5">
          {project.images.map((image, index) => {
            return (
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
                key={index}
                className={`relative group col-span-1 h-64 md:h-96`}
              >
                <Image
                  src={image}
                  alt={`Project Image ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                  width={500}
                  height={500}
                />
              </motion.div>
            );
          })}
        </div>
        <div className="flex flex-col md:flex-row w-11/12 mx-auto justify-between  gap-2">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="w-full md:w-2/5 flex flex-col gap-2"
          >
            <h2 className="text-xl md:text-3xl font-semibold">Overview</h2>
            <p className="text-sm text-gray-700 dark:text-white/80">
              {project.description}
            </p>
            <Link href={project.link} target="_blank" passHref>
              <motion.div className="w-max flex items-center gap-2 text-gray-700 border-[0.5px] border-gray-700 rounded-full py-2 px-8 mt-4 hover:bg-lightHover duration-500 font-Outfit dark:text-white dark:hover:bg-darkHover dark:border-white">
                DEMO
              </motion.div>
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="w-full md:w-2/5 flex flex-col gap-5 text-lg mt-5 md:mt-0"
          >
            <h4>
              <span className="font-semibold">TechStack: </span>
              <ul className="flex items-center gap-3 sm:gap-2">
                {project.stack.map((tech, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-center w-8 sm:w-10 aspect-square border border-gray-400 rounded-lg cursor-pointer hover:-translate-y-1 duration-500"
                  >
                    <Image
                      src={tech}
                      alt={`Tech Stack ${index + 1}`}
                      className="w-5 sm:w-7"
                    />
                  </li>
                ))}
              </ul>
            </h4>
            <h4>
              <span className="font-semibold">Functionality: </span>
              <div className="flex flex-wrap gap-2 mt-2">
                {project.functionality.map((feature, index) => (
                  <span
                    key={index}
                    className="px-4 py-1 text-sm border border-gray-400 text-gray-600 rounded-full dark:text-white/80 dark:border-white/80"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </h4>
          </motion.div>
        </div>

        <div>
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="w-11/12 mx-auto mt-10"
          >
            <h3 className="text-2xl font-semibold mt-10 mb-5">
              Project Details
            </h3>
            <p className="text-gray-700 dark:text-white/80">
              {project.summary}
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetail;
