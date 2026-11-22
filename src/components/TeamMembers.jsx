import { teamMembers } from "../data/teamMembers";

function TeamMembers() {
  if (teamMembers.length === 0) return null;

  return (
    <section className="content-card team-section">
      <h2>Project Team</h2>
      <div className="team-grid">
        {teamMembers.map((member) => (
          <div className="team-member" key={member.name}>
            <strong>{member.name}</strong>
            {member.role && <span>{member.role}</span>}
          </div>
        ))}
      </div>
    </section>
  );
}

export default TeamMembers;
