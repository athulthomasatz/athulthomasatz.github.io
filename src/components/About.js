import React from "react";
import {
  FaReact,
  FaNode,
  FaPython,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaGit,
} from "react-icons/fa";
import { SiMongodb, SiExpress, SiMysql } from "react-icons/si";
import { motion } from "framer-motion";

import "./About.css";

const About = () => {
  const skills = [
    { name: "JavaScript", icon: <FaJs />, color: "#F7DF1E" },
    { name: "React", icon: <FaReact />, color: "#61DAFB" },
    { name: "Node.js", icon: <FaNode />, color: "#339933" },
    { name: "Python", icon: <FaPython />, color: "#3776AB" },
    { name: "HTML5", icon: <FaHtml5 />, color: "#E34F26" },
    { name: "CSS3", icon: <FaCss3Alt />, color: "#1572B6" },
    { name: "MongoDB", icon: <SiMongodb />, color: "#47A248" },
    { name: "Express", icon: <SiExpress />, color: "#FFFF00" },
    { name: "SQL", icon: <SiMysql />, color: "#4479A1" },
    { name: "Git", icon: <FaGit />, color: "#F05032" },
  ];

  return (
    <section id="about" className="about">
      <div className="about-container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          About Me
        </motion.h2>
        <motion.div
          className="about-content"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="about-text">
            I enjoy turning complex problems into simple,
            elegant solutions through code. My journey has included building
            full-stack applications using technologies like React, Node.js, and
            MongoDB, and now I’m excited to apply that same passion to
            data-driven projects. I’m actively looking for opportunities where I
            can grow as a developer and analyst, contribute to impactful work,
            and collaborate with like-minded professionals.
          </p>
        </motion.div>
        <motion.div
          className="skills-section"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="skills-title">Skills</h3>
          <div className="skills-grid">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                className="skill-item"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.1 }}
              >
                <div className="skill-icon" style={{ color: skill.color }}>
                  {skill.icon}
                </div>
                <span className="skill-name">{skill.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
