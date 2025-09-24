import React from "react";
import Container from "./Container";
import "./tools.css";
const AgentsHero = () => {
  return (
    <div className="agents-hero min-h-96 grid place-items-center">
      <Container>
        <div className="flex gap-5 items-center text-center">
          <div>
            {/* <img
              src="https://actionagents.co/api/public/agent/logos/gift%20finder_20250714_165905.png"
              alt="AI Agents Hero"
            /> */}
          </div>
          <div>
            <h1 className="text-4xl mb-5">AI Agents for System Improvement</h1>
            <p className="leading-relaxed text-lg">
              This project explores the development and deployment of AI agents designed to monitor, analyze, and enhance the performance of complex systems. By leveraging machine learning, real-time data analysis, and autonomous decision-making, these agents can identify inefficiencies, predict system failures, and implement optimization strategies across various domains such as IT infrastructure, manufacturing, logistics, and business operations. The goal is to create adaptive, self-improving systems that require minimal human intervention while ensuring robustness, scalability, and continuous improvement.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AgentsHero;
