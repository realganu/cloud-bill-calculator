function SummaryCards({ resources, bill, formatCurrency }) {
  return (
    <section className="summary-grid">
      <div className="summary-card">
        <h3>Total Estimated Bill</h3>
        <h2>{formatCurrency(bill ? bill.total : 0)}</h2>
        <p>Current estimated cost</p>
      </div>

      <div className="summary-card">
        <h3>Total VM Hours</h3>
        <h2>
          {Number(resources.vmHours) * Number(resources.numberOfVMs)}
        </h2>
        <p>Hours across all VMs</p>
      </div>

      <div className="summary-card">
        <h3>Data Transfer</h3>
        <h2>{Number(resources.dataTransfer)} GB</h2>
        <p>Network usage</p>
      </div>

      <div className="summary-card">
        <h3>Storage</h3>
        <h2>{Number(resources.storage)} GB</h2>
        <p>Storage consumption</p>
      </div>
    </section>
  );
}

export default SummaryCards;
