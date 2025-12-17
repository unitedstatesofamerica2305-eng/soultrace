import { useState } from "react";
import Navbar from "./components/Navbar";
import ToolCard from "./components/ToolCard";
import IPLookup from "./components/IPLookup";
import TempMail from "./components/TempMail";
import Footer from "./components/Footer";

export default function App() {
  const [dark, setDark] = useState(true);

  return (
    <div className={dark ? "dark" : ""}>
      <Navbar dark={dark} setDark={setDark} />

      <section className="hero">
        <h1>OSINT & Cyber Tools Platform</h1>
        <p>Ethical intelligence tools for learning and testing</p>
      </section>

      <section className="grid">
        <ToolCard
          title="IP Intelligence"
          desc="Public IP info, ISP, ASN and location"
        />
        <ToolCard
          title="Username OSINT"
          desc="Check public username availability"
        />
        <ToolCard
          title="Password Analyzer"
          desc="Password strength & entropy"
        />
      </section>

      <IPLookup />
      <TempMail />
      <Footer />
    </div>
  );
}