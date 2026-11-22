function BillBreakdown({
  bill,
  resources,
  formatCurrency,
  onDownload,
}) {
  if (!bill) return null;

  return (
    <section className="content-card">
      <h2>Cloud Bill Breakdown</h2>

      <div className="bill-table-wrapper">
        <table className="bill-table">
          <thead>
            <tr>
              <th>Resource</th>
              <th>Usage</th>
              <th>Estimated Cost</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Data Transfer</td>
              <td>{resources.dataTransfer} GB</td>
              <td>{formatCurrency(bill.dataTransferCost)}</td>
            </tr>
            <tr>
              <td>Virtual Machines</td>
              <td>
                {resources.numberOfVMs} VMs × {resources.vmHours} hours
              </td>
              <td>{formatCurrency(bill.vmCost)}</td>
            </tr>
            <tr>
              <td>Storage</td>
              <td>{resources.storage} GB</td>
              <td>{formatCurrency(bill.storageCost)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="bill-summary">
        <div>
          <span>Subtotal</span>
          <strong>{formatCurrency(bill.subtotal)}</strong>
        </div>
        <div>
          <span>Discount ({bill.discountRate * 100}%)</span>
          <strong className="discount">
            - {formatCurrency(bill.discountAmount)}
          </strong>
        </div>
        <div className="final-total">
          <span>Final Estimated Bill</span>
          <strong>{formatCurrency(bill.total)}</strong>
        </div>
      </div>

      <div className="discount-info">
        <h3>Discount Applied</h3>
        <p>{bill.discountReason}</p>
      </div>

      <button
        className="download-btn"
        type="button"
        onClick={onDownload}
      >
        Download Bill Report
      </button>
    </section>
  );
}

export default BillBreakdown;
