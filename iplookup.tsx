import { useState } from "react";

export default function IPLookup() {
  const [ip, setIp] = useState("");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const lookupIP = async () => {
    setLoading(true);
    setData(null);

    const res = await fetch(
      `https://ipapi.co/${ip || "json"}/json/`
    );
    const result = await res.json();
    setData(result);
    setLoading(false);
  };

  return (
    <section className="card">
      <h3>IP Lookup</h3>

      <input
        placeholder="Enter IP or leave empty"
        value={ip}
        onChange={(e) => setIp(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
      />

      <button onClick={lookupIP}>
        {loading ? "Scanning..." : "Lookup IP"}
      </button>

      {data && (
        <div style={{ marginTop: "12px", fontSize: "14px" }}>
          <p><b>IP:</b> {data.ip}</p>
          <p><b>Country:</b> {data.country_name}</p>
          <p><b>Region:</b> {data.region}</p>
          <p><b>City:</b> {data.city}</p>
          <p><b>ISP:</b> {data.org}</p>
          <p><b>ASN:</b> {data.asn}</p>
        </div>
      )}
    </section>
  );
}