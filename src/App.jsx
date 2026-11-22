import { useState } from "react";
import Header from "./components/Header";
import SummaryCards from "./components/SummaryCards";
import ResourceForm from "./components/ResourceForm";
import BillBreakdown from "./components/BillBreakdown";
import CostCharts from "./components/CostCharts";
import TeamMembers from "./components/TeamMembers";
import Footer from "./components/Footer";
import { calculateBill } from "./utils/billing";
import "./App.css";

const INITIAL_RESOURCES = {
  dataTransfer: "0",
  vmHours: "0",
  numberOfVMs: "1",
  storage: "0",
};

function App() {
  const [resources, setResources] = useState(INITIAL_RESOURCES);
  const [bill, setBill] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setResources((previous) => ({
      ...previous,
      [name]: value,
    }));
    setBill(null);
    setError("");
  };

  const handleCalculate = () => {
    const values = Object.values(resources);

    if (values.some((value) => value.trim() === "")) {
      setError("Please fill in all resource fields.");
      return;
    }

    const data = Object.fromEntries(
      Object.entries(resources).map(([key, value]) => [
        key,
        Number(value),
      ])
    );

    if (
      Object.values(data).some(
        (value) => !Number.isFinite(value) || value < 0
      )
    ) {
      setError("Please enter valid non-negative values.");
      return;
    }

    if (!Number.isInteger(data.numberOfVMs) || data.numberOfVMs < 1) {
      setError("Number of VMs must be a positive whole number.");
      return;
    }

    setBill(calculateBill(data));
    setError("");
  };

  const handleReset = () => {
    setResources(INITIAL_RESOURCES);
    setBill(null);
    setError("");
  };

  const formatCurrency = (amount) =>
    amount.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const handleDownload = () => {
    if (!bill) return;

    const rows = [
      ["Cloud Bill Calculator Report"],
      ["Resource", "Usage", "Estimated Cost"],
      ["Data Transfer", `${resources.dataTransfer} GB`, bill.dataTransferCost],
      ["Virtual Machines", `${resources.numberOfVMs} VMs × ${resources.vmHours} hours`, bill.vmCost],
      ["Storage", `${resources.storage} GB`, bill.storageCost],
      ["Subtotal", "", bill.subtotal],
      [`Discount (${bill.discountRate * 100}%)`, "", bill.discountAmount],
      ["Final Estimated Bill", "", bill.total],
    ];
    const csv = rows
      .map((row) =>
        row
          .map((value) => `"${String(value).replaceAll('"', '""')}"`)
          .join(",")
      )
      .join("\n");
    const url = URL.createObjectURL(
      new Blob([csv], { type: "text/csv;charset=utf-8" })
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = "cloud-bill-report.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="app">
      <Header />

      <main className="container">
        <section className="welcome">
          <h1>Cloud Cost Dashboard</h1>
          <p>Calculate and monitor your cloud resource expenses.</p>
        </section>

        <SummaryCards
          resources={resources}
          bill={bill}
          formatCurrency={formatCurrency}
        />

        <ResourceForm
          resources={resources}
          error={error}
          onChange={handleChange}
          onCalculate={handleCalculate}
          onReset={handleReset}
        />

        <BillBreakdown
          bill={bill}
          resources={resources}
          formatCurrency={formatCurrency}
          onDownload={handleDownload}
        />

        <CostCharts bill={bill} formatCurrency={formatCurrency} />
        <TeamMembers />
      </main>

      <Footer />
    </div>
  );
}

export default App;
