import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement);

// Define types
interface Project {
  name: string;
  link: string;
}

interface CardProps {
  title: string;
  content: React.ReactNode;
}

// Define KPI type
interface KPI {
  name: string;
  percentage: number;
}

// Splash screen component with animation
const SplashScreen: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
  useEffect(() => {
    setTimeout(onFinish, 3000);
  }, [onFinish]);

  return (
    <div style={splashStyle}>
      <h1 style={titleStyle}>Welcome to Mgee Dashboard</h1>
      <p style={textStyle}>Loading projects and tasks...</p>
    </div>
  );
};

// Card component
const Card: React.FC<CardProps> = ({ title, content }) => {
  return (
    <div style={cardStyle}>
      <h3>{title}</h3>
      {content}
    </div>
  );
};

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [todoList, setTodoList] = useState<string[]>([]);
  const [newTodo, setNewTodo] = useState<string>(""); // State for input field
  const [projects, setProjects] = useState<Project[]>([]);
  const [kpis, setKpis] = useState<KPI[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setTodoList(["Complete React project", "Master APIs", "Master styled components", "Master Typescript"]);
      setKpis([
        { name: "HTML", percentage: 100 },
        { name: "CSS", percentage: 100 },
        { name: "JavaScript", percentage: 100 },
        { name: "React", percentage: 80 },
        { name: "Redux", percentage: 0 },
      ]);
      setProjects([
        { name: "Project 1: Submit Form", link: "https://submit-form-seven.vercel.app/" },
        { name: "Project 2: To-Do-List", link: "https://mgeetech.com" },
        { name: "Project 3:Sneaker-culture", link: "https://sneaker-culture.vercel.app/" },
        { name: "Project 4:Grow-sphere", link: "https://grow-sphere-lemon.vercel.app/" },
        { name: "Project 5:Submit-form(Typescript)", link: "https://typscript-form.vercel.app/" },
        { name: "Project 3:My React Portfolio", link: "https://react-portfolio-omega-indol.vercel.app/" },
      ]);
    }, 2000);
  }, []);

  // Pie chart data for KPIs
  const pieData = {
    labels: kpis.map(kpi => kpi.name),
    datasets: [
      {
        data: kpis.map(kpi => kpi.percentage),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      },
    ],
  };

  // Handle adding new todo
  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      setTodoList([...todoList, newTodo]);
      setNewTodo(""); 
    }
  };

  return isLoading ? (
    <SplashScreen onFinish={() => setIsLoading(false)} />
  ) : (
    <div style={containerStyle}>
      {/* Title Section */}
      <div style={headerStyle}>
        <h1>My to do list</h1>
        <p>Manage tasks, track progress, and explore projects efficiently.</p>
      </div>

      <div style={appStyle}>
        <Card
          title="To-Do List"
          content={
            <div>
              <form onSubmit={handleAddTodo} style={formStyle}>
                <input
                  type="text"
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                  placeholder="Add new task"
                  style={inputStyle}
                />
                <button type="submit" style={buttonStyle}>
                  Add
                </button>
              </form>
              <ul>
                {todoList.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          }
        />

        <Card
          title="Progress"
          content={
            <div style={chartContainerStyle}>
              <h4>KPI Pie Chart</h4>
              <Pie data={pieData} width={200} height={200} options={{ responsive: true }} />
            </div>
          }
        />

        <Card
          title="Projects"
          content={
            <ul>
              {projects.map((project, index) => (
                <li key={index}>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none", color: "#000", fontWeight: "300" }}
                  >
                    {project.name}
                  </a>
                </li>
              ))}
            </ul>
          }
        />
      </div>
    </div>
  );
};

// Styling
const containerStyle: React.CSSProperties = {
  textAlign: "center",
  padding: "10px",
};

const headerStyle: React.CSSProperties = {
  marginBottom: "20px",
};

const appStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  gap: "10px",
 
};

const cardStyle: React.CSSProperties = {
  border: "1px solid #ccc",
  padding: "30px",
  width: "30%",
  boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.281)",
  borderRadius: "10px",
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: "20px",
};

const splashStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.8)",
  color: "#fff",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  fontSize: "24px",
  animation: "fadeIn 1.5s forwards",
};

const titleStyle: React.CSSProperties = {
  animation: "slideUp 1s ease-out",
};

const textStyle: React.CSSProperties = {
  animation: "fadeInText 2s ease-out 1s",
};

const chartContainerStyle: React.CSSProperties = {
  marginBottom: "20px",
  width: "250px",
  height: "250px",
};

const formStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  gap: "10px",
  marginBottom: "20px",
};

const inputStyle: React.CSSProperties = {
  padding: "10px",
  width: "200px",
  fontSize: "16px",
  border: "1px solid #ccc",
  borderRadius: "5px",
};

const buttonStyle: React.CSSProperties = {
  padding: "10px 15px",
  fontSize: "16px",
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

// Media Queries for responsiveness
const responsiveStyles = `
  @media (max-width: 768px) {
    .cardStyle {
      width: 90%;  // Stack cards on small screens
      margin-bottom: 20px;
    }
    .appStyle {
      flex-direction: column;
    }
  }
`;

export default App;
