type Person = { name?: string; role: string; organization?: string; badge?: string; photo: string; desc?: string };

export function PersonDirectory({ people }: { people: Person[] }) {
  return <div className="person-directory">{people.map((person, index) => <article className={`person-profile ${index === 0 ? "person-profile-featured" : ""}`} key={`${person.name}-${index}`}><div className="person-portrait"><img src={person.photo} alt={person.name || person.role} loading="lazy" /></div><div className="person-profile-copy">{person.badge && <span className="premium-eyebrow">{person.badge}</span>}<h3>{person.name}</h3><strong>{person.role}</strong>{person.organization && <p className="person-organization">{person.organization}</p>}{person.desc && <p>{person.desc}</p>}<span className="person-directory-note">Bhutan Health Trust Fund</span></div></article>)}</div>;
}
