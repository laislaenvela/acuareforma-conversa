export const themes = [
  {
    id: 1,
    title: "Participación y democracia comunitaria",
    articles: [9, 10, 11, 12, 13, 14, 17, 20, 21],
  },
  {
    id: 2,
    title: "Gobierno y dirección",
    articles: [25, 26, 27, 28, 29, 30, 31, 32, 33, 34],
  },
  {
    id: 3,
    title: "Transparencia y control",
    articles: [38, 39, 40, 41, 42],
  },
  {
    id: 4,
    title: "Patrimonio y sostenibilidad",
    articles: [45, 46, 47, 48],
  },
  {
    id: 5,
    title: "Futuro del acueducto",
    articles: [49, 50, 51],
  },
];
export const chapters = [
  {
    id: 1,
    codigo: "I",
    orden: 1,
    nombre_vigente: "Nombre, naturaleza jurídica y objeto social",
    nombre_propuesto: "Nombre, naturaleza jurídica y objeto social",
    slug: "nombre-naturaleza-juridica",
    number: "I",
    title: "Nombre, naturaleza jurídica y objeto social",
    previousTitle: "",
    summary:
      "Define la identidad de la organización, su naturaleza jurídica, principios y objeto social.",
    articles: [
      {
        id: 1,
        title: "Nombre de la Asociación",
      },
      {
        id: 2,
        title: "Naturaleza jurídica",
      },
      {
        id: 3,
        title: "Domicilio",
      },
    ],
  },

  {
    id: 2,
    codigo: "II",
    orden: 2,
    nombre_vigente: "Asociados y participación",
    nombre_propuesto: "Asociados y participación",
    slug: "asociados-participacion",
    number: "II",
    title: "Asociados y participación",
    previousTitle: "",
    summary:
      "Regula quiénes pueden participar, sus derechos, deberes y mecanismos de vinculación.",
    articles: [
      {
        id: 9,
        title: "Asociados",
      },
      {
        id: 10,
        title: "Suscriptores",
      },
      {
        id: 11,
        title: "Ingreso de asociados",
      },
    ],
  },

  {
    id: 3,
    codigo: "III",
    orden: 3,
    nombre_vigente: "Administración y control",
    nombre_propuesto: "Gobierno y dirección",
    slug: "gobierno-direccion",
    number: "III",
    title: "Gobierno y dirección",
    previousTitle: "Administración y control",
    summary:
      "Organiza los órganos de dirección, representación y toma de decisiones.",
    articles: [
      {
        id: 25,
        title: "Junta Administradora",
      },
      {
        id: 26,
        title: "Elección de la Junta",
      },
      {
        id: 30,
        title: "Funciones de la Junta",
      },
    ],
  },
];
export const articles = [
  {
    id: 1,
    numero: 1,
    title: "Nombre de la Asociación",
    chapterId: 1,
    currentText:
      "Texto vigente del artículo 1.",
    proposedText:
      "Texto propuesto del artículo 1.",
    rationale:
      "Explicación de por qué se propone este cambio.",
    communityQuestion:
      "¿Consideras adecuada esta formulación?",
    status: "active",
  },

  {
    id: 2,
    numero: 2,
    title: "Naturaleza jurídica",
    chapterId: 1,
    currentText:
      "Texto vigente del artículo 2.",
    proposedText:
      "Texto propuesto del artículo 2.",
    rationale:
      "Explicación de por qué se propone este cambio.",
    communityQuestion:
      "¿Cómo valoras esta modificación?",
    status: "active",
  },

  {
    id: 25,
    numero: 25,
    title: "Junta Administradora",
    chapterId: 3,
    currentText:
      "La Junta Administradora estará conformada por cinco miembros.",
    proposedText:
      "La Junta Administradora estará conformada por siete miembros.",
    rationale:
      "Se busca ampliar la representación de la comunidad.",
    communityQuestion:
      "¿Consideras adecuado aumentar el número de integrantes?",
    status: "active",
  },
];