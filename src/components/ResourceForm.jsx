function ResourceForm({
  resources,
  error,
  onChange,
  onCalculate,
  onReset,
}) {
  return (
    <section className="content-card">
      <h2>Cloud Resource Calculator</h2>
      <p className="section-description">
        Enter your cloud resource consumption.
        VM hours are entered per individual VM.
      </p>

      <div className="input-grid">
        <div className="form-group">
          <label>Data Transfer (GB)</label>
          <input
            type="number"
            name="dataTransfer"
            min="0"
            step="any"
            value={resources.dataTransfer}
            onChange={onChange}
            placeholder="Enter data transfer"
          />
        </div>

        <div className="form-group">
          <label>VM Running Hours (per VM)</label>
          <input
            type="number"
            name="vmHours"
            min="0"
            step="any"
            value={resources.vmHours}
            onChange={onChange}
            placeholder="Enter VM hours"
          />
        </div>

        <div className="form-group">
          <label>Number of Virtual Machines</label>
          <input
            type="number"
            name="numberOfVMs"
            min="1"
            step="1"
            value={resources.numberOfVMs}
            onChange={onChange}
            placeholder="Enter number of VMs"
          />
        </div>

        <div className="form-group">
          <label>Storage (GB)</label>
          <input
            type="number"
            name="storage"
            min="0"
            step="any"
            value={resources.storage}
            onChange={onChange}
            placeholder="Enter storage"
          />
        </div>
      </div>

      <div className="button-group">
        <button
          className="calculate-btn"
          type="button"
          onClick={onCalculate}
        >
          Calculate Bill
        </button>
        <button
          className="reset-btn"
          type="button"
          onClick={onReset}
        >
          Reset
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}
    </section>
  );
}

export default ResourceForm;
