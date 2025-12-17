import { useState } from "react";

export default function TempMail() {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const generateEmail = async () => {
    setMessages([]);

    const domainRes = await fetch("https://api.mail.tm/domains");
    const domainData = await domainRes.json();
    const domain = domainData["hydra:member"][0].domain;

    const address = `user${Date.now()}@${domain}`;
    const password = "password123";

    await fetch("https://api.mail.tm/accounts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ address, password })
    });

    const loginRes = await fetch("https://api.mail.tm/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ address, password })
    });

    const loginData = await loginRes.json();
    setEmail(address);
    setToken(loginData.token);
  };

  const loadInbox = async () => {
    setLoading(true);
    const res = await fetch("https://api.mail.tm/messages", {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    setMessages(data["hydra:member"]);
    setLoading(false);
  };

  return (
    <section className="card">
      <h3>Temporary Mail</h3>

      <button onClick={generateEmail}>
        Generate Temporary Email
      </button>

      {email && (
        <>
          <p style={{ marginTop: "10px" }}>
            <b>Email:</b> {email}
          </p>

          <button onClick={loadInbox}>
            {loading ? "Checking..." : "Check Inbox"}
          </button>
        </>
      )}

      {messages.length > 0 && (
        <div style={{ marginTop: "12px", fontSize: "14px" }}>
          <h4>Inbox</h4>
          {messages.map((msg) => (
            <div
              key={msg.id}
              style={{
                borderBottom: "1px solid #333",
                marginBottom: "8px",
                paddingBottom: "6px"
              }}
            >
              <p><b>From:</b> {msg.from.address}</p>
              <p><b>Subject:</b> {msg.subject}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}