import React, { useEffect, useState ,useMemo } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import "./Hero.css";

const HeroContainer = styled.div`
  height: 60vh;
  min-height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--background);
  padding: 0 5%;
  font-family: "JetBrains Mono", monospace;
  transition: all 0.3s ease;
  @media (max-width: 768px) {
    height: 100vh;
    padding: 2rem 5%;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
`;

const LeftSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-top: 1rem;
`;

const TextContent = styled.div`
  margin-bottom: 2rem;
`;

const RightSection = styled.div`
  flex: 1;
  padding-top: 5rem;
`;

const Title = styled(motion.h1)`
  font-size: 4rem;
  color: var(--text);
  margin-bottom: 1rem;
  text-align: left;
  font-family: "JetBrains Mono", monospace;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 2.5rem;
    text-align: center;
  }
`;

const TypedText = styled(motion.span)`
  font-size: 2rem;
  color: var(--accent);
  display: block;
  margin-bottom: 2rem;
  text-align: left;
  font-family: "JetBrains Mono", monospace;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    text-align: center;
  }
`;

const Description = styled(motion.p)`
  color: var(--secondary-text);
  font-size: 1.1rem;
  line-height: 1.6;
  text-align: justify;
  font-family: "JetBrains Mono", monospace;
  font-weight: 400;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const Hero = () => {
  const [displayText, setDisplayText] = useState("");
  const skills = useMemo(() => [
  "Software Engineer",
  "Web Developer",
  "Front-end Developer",
  "Back-end Developer",
  // ... other skills
], []);
  const [skillIndex, setSkillIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const currentSkill = skills[skillIndex];

    const handleTyping = () => {
      setDisplayText((current) => {
        if (!isDeleting) {
          // Typing
          if (current === currentSkill) {
            setIsDeleting(true);
            setTypingSpeed(2000); // Pause before deleting
            return current;
          }

          setTypingSpeed(150);
          return currentSkill.slice(0, current.length + 1);
        } else {
          // Deleting
          if (current === "") {
            setIsDeleting(false);
            setSkillIndex((prev) => (prev + 1) % skills.length);
            setTypingSpeed(150);
            return "";
          }

          setTypingSpeed(100);
          return currentSkill.slice(0, current.length - 1);
        }
      });
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, skillIndex, skills, typingSpeed]);

  return (
    <HeroContainer id="hero">
      <ContentWrapper>
        <LeftSection>
          <TextContent>
            <Title
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              ATHUL THOMAS
            </Title>
            <TypedText
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {displayText}
              <span className="cursor">|</span>
            </TypedText>
          </TextContent>
        </LeftSection>
        <RightSection>
          <Description
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            Hello! I’ve recently completed my Master of Computer Applications
            (MCA) and am currently focused on expanding my skill set in Python
            programming and data analysis. With a strong foundation in web
            development and academic projects, I'm now diving deeper into the
            world of data—exploring how insights can drive smarter decisions and
            meaningful solutions.
          </Description>
        </RightSection>
      </ContentWrapper>
    </HeroContainer>
  );
};

export default Hero;
