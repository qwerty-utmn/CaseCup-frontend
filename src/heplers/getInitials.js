const getInitials = (person) => (
  `${person.surname ? person.surname[0] : ''}${person.name ? person.name[0] : ''}${person.middlename ? person.middlename[0] : ''}`
);

export default getInitials;
