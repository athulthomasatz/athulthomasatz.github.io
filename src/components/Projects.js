import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { FaGoogle, FaPython } from "react-icons/fa";
import { SiDatacamp, SiCoursera, SiGoogle } from "react-icons/si";
import "./Project.css";

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const projectList = [
    {
      title: "Bit-Dash",
      shortDescription:
        "Built a Python-based dashboard to analyze Bitcoin-related sentiment using CSV datasets Applied NLP to classify sentiments and visualized trends with interactive chart",
      fullDescription:
        "This Bitcoin Sentiment Analysis Dashboard processes and analyzes historical Bitcoin news and price data spanning two years. Using advanced NLP techniques like FinBERT and VADER, it provides insights into how news sentiment correlates with Bitcoin price movements over time through interactive visualizations.",
      techStack: ["StreamLit", "Python", "NLP", "FinBERT", "VADER"],
      githubLink: "https://github.com/athulthomasatz/BiT_DasH",
      // liveLink: "#",
      image: "/path-to-project-image.jpg",
    },
    {
      title: "Hostel Management System",
      shortDescription:
        "A digital platform for managing hostel accommodations, student records and fee payments.",
      fullDescription:
        "The Hostel Management project aims to streamline and enhance the efficiency of managing hostel operations through a dedicated web application. This application is designed to improve the experience for both administrators and students by simplifying essential tasks such as room allocation, maintenance requests, fee payments, and communication.",
      techStack: ["React", "Node.js", "MongoDB", "Express"],
      githubLink: "https://github.com/yourusername/project-one",
      // liveLink: "#",
      image: "/path-to-project-image.jpg",
    },
    {
      title: "Work-Item Scheduler",
      shortDescription: "OnGoing Project...",
      fullDescription: "OnGoing Project...",
      techStack: ["React", "Node.js", "MongoDB", "Google API"],
      githubLink: "https://github.com/yourusername/project-one",
      // liveLink: "#",
      image: "/path-to-project-image.jpg",
    },
    // {
    //   title: "Portfolio Website",
    //   shortDescription: "A personal portfolio website to showcase my projects and skills.",
    //   fullDescription:
    //     "This portfolio website serves as a digital resume, showcasing my skills, projects, and experiences. It is designed to be visually appealing and user-friendly, allowing potential employers and collaborators to easily navigate through my work.",
    //   techStack: ["React", "CSS", "JavaScript"],
    // }
  ];

  const certificates = [
    {
      title: "Associate Python Developer",
      issuer: "Datacamp",
      date: "Ongoing",
      ProviderIcon: SiDatacamp,
      // credentialLink:
      // "https://www.coursera.org/account/accomplishments/verify/99ENTPBYX4RJ",
      // image: "/images/certificates/python.jpg",
    },
    {
      title: "GitHub Foundations",
      issuer: "Datacamp",
      date: "June 2025",
      ProviderIcon: SiDatacamp,
      credentialLink:
        "https://www.datacamp.com/completed/statement-of-accomplishment/track/18dc3a9dc87bc0ac6d6a9d1e64b5bdaa89e3c413",
      // image: "/images/certificates/python.jpg",
    },
    {
      title: "Intermediate Python for Developers",
      issuer: "Datacamp",
      date: "June 2025",
      ProviderIcon: SiDatacamp,
      credentialLink:
        "https://www.datacamp.com/completed/statement-of-accomplishment/course/79a5e71f5141dfe28a027f5247134a052757b08e",
      // image: "/images/certificates/python.jpg",
    },

    {
      title: "Intermediate SQL",
      issuer: "Datacamp",
      date: "June 2025",
      ProviderIcon: SiDatacamp,
      credentialLink:
        "https://www.datacamp.com/completed/statement-of-accomplishment/course/1c2c378a882340ec916734791503b47c0a1edf58",
      // image: "/images/certificates/python.jpg",
    },

    {
      title: "Connect and Protect: Networks and Network Security",
      issuer: "Google & Coursera",
      date: "September 2024",
      ProviderIcons: [SiGoogle, SiCoursera],
      credentialLink:
        "https://www.coursera.org/account/accomplishments/verify/99ENTPBYX4RJ",
      // image: "/images/certificates/python.jpg",
    },
    {
      title: "Cloud Computing",
      issuer: "NPTEL",
      date: "November 2024",
      // ProviderIcon: SiNptel,
      credentialLink:
        "https://archive.nptel.ac.in/content/noc/NOC24/SEM2/Ecertificates/106/noc24-cs118/Course/NPTEL24CS118S95870006903982864.pdf",
      image: "/images/certificates/web-dev.jpg",
    },

    {
      title: "Tools of the Trade: Linux and SQL",
      issuer: "Google & Coursera",
      date: "July 2024",
      ProviderIcons: [SiGoogle, SiCoursera],
      credentialLink:
        "https://www.coursera.org/account/accomplishments/verify/A75YUKLQQG8H",
      image: "/images/certificates/python.jpg",
    },
    {
      title: "Foundations of Cybersecurity",
      issuer: "Google & Coursera",
      date: "June 2024",
      ProviderIcons: [SiGoogle, SiCoursera],
      credentialLink:
        "https://www.coursera.org/account/accomplishments/verify/3GM8K2NNLTMQ",
      image: "/images/certificates/python.jpg",
    },
  ];
  return (
    <>
      <section id="projects" className="projects-section">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          My Projects
        </motion.h2>
        <div className="projects-container">
          {projectList.map((project, index) => (
            <motion.div
              key={index}
              className="project-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              onClick={() => setSelectedProject(project)}
            >
              <h3>{project.title}</h3>
              <p>{project.shortDescription}</p>
              <div className="tech-stack">
                {project.techStack.map((tech, i) => (
                  <span key={i} className="tech-tag">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedProject && (
            <motion.div
              className="popup-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                className="popup-content"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="close-button"
                  onClick={() => setSelectedProject(null)}
                >
                  <FaTimes />
                </button>
                <h3>{selectedProject.title}</h3>
                <p>{selectedProject.fullDescription}</p>
                <div className="tech-stack">
                  {selectedProject.techStack.map((tech, i) => (
                    <span key={i} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="project-links">
                  <a
                    href={selectedProject.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaGithub /> Source Code
                  </a>
                  <a
                    href={selectedProject.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaExternalLinkAlt /> Live Demo
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
      {/* Certificates Section */}

      <section id="certificates" className="certificates-section">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Certificates
        </motion.h2>
        <div className="certificates-container">
          {certificates.map((cert, index) => (
            <motion.a
              key={index}
              href={cert.credentialLink}
              target="_blank"
              rel="noopener noreferrer"
              className="certificate-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div className="certificate-content">
                <h3>{cert.title}</h3>
                <p className="issuer">{cert.issuer}</p>
                <p className="date">{cert.date}</p>
              </div>
              {(cert.ProviderIcon || cert.ProviderIcons) && (
                <div className="provider-logo">
                  {cert.ProviderIcon && <cert.ProviderIcon />}
                  {cert.ProviderIcons && (
                    <div className="provider-icons">
                      {cert.ProviderIcons.map((Icon, i) => (
                        <Icon key={i} />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </motion.a>
          ))}
        </div>
      </section>
    </>
  );
};

export default Projects;
