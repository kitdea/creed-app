export const APOSTLES_SEGMENTS = [
  { id: "a0",  text: "I believe in God, the Father Almighty, Creator of heaven and earth;" },
  { id: "a1",  text: " and in Jesus Christ, His only Son our Lord," },
  { id: "a2",  text: "\n\nWho was conceived by the Holy Spirit," },
  { id: "a3",  text: " born of the Virgin Mary," },
  { id: "a4",  text: " suffered under Pontius Pilate," },
  { id: "a5",  text: " was crucified, died, and was buried." },
  { id: "a6",  text: "\n\nHe descended into hell;" },
  { id: "a7",  text: " on the third day He rose again from the dead;" },
  { id: "a8",  text: "\n\nHe ascended into heaven," },
  { id: "a9",  text: " and is seated at the right hand of God, the Father almighty;" },
  { id: "a10", text: " from there He shall come to judge the living and the dead." },
  { id: "a11", text: "\n\nI believe in the Holy Spirit," },
  { id: "a12", text: " the holy catholic Church," },
  { id: "a13", text: " the communion of saints," },
  { id: "a14", text: " the forgiveness of sins," },
  { id: "a15", text: " the resurrection of the body" },
  { id: "a16", text: " and life everlasting." },
  { id: "a17", text: " Amen." },
];

export const NICENE_SEGMENTS = [
  { id: "n0",  text: "I believe in one God," },
  { id: "n1",  text: " the Father almighty," },
  { id: "n2",  text: " maker of heaven and earth," },
  { id: "n3",  text: " of all things visible and invisible." },
  { id: "n4",  text: "\n\nI believe in one Lord Jesus Christ," },
  { id: "n5",  text: " the only begotten Son of God," },
  { id: "n6",  text: " born of the Father before all ages." },
  { id: "n7",  text: " God from God, Light from Light," },
  { id: "n8",  text: " true God from true God," },
  { id: "n9",  text: " begotten, not made, consubstantial with the Father;" },
  { id: "n10", text: " through Him all things were made." },
  { id: "n11", text: "\n\nFor us men and for our salvation" },
  { id: "n12", text: " He came down from heaven," },
  { id: "n13", text: " and by the Holy Spirit was incarnate of the virgin Mary," },
  { id: "n14", text: " and became man." },
  { id: "n15", text: "\n\nFor our sake He was crucified under Pontius Pilate," },
  { id: "n16", text: " He suffered death and was buried," },
  { id: "n17", text: " and rose again on the third day" },
  { id: "n18", text: " in accordance with the Scriptures." },
  { id: "n19", text: "\n\nHe ascended into heaven" },
  { id: "n20", text: " and is seated at the right hand of the Father." },
  { id: "n21", text: " He will come again in glory" },
  { id: "n22", text: " to judge the living and the dead" },
  { id: "n23", text: " and His kingdom will have no end." },
  { id: "n24", text: "\n\nI believe in the Holy Spirit, the Lord, the giver of life," },
  { id: "n25", text: " who proceeds from the Father [and the Son]," },
  { id: "n26", text: " who with the Father and the Son is adored and glorified," },
  { id: "n27", text: " who has spoken through the prophets." },
  { id: "n28", text: "\n\nI believe in one, holy, catholic and apostolic Church." },
  { id: "n29", text: " I confess one Baptism for the forgiveness of sins" },
  { id: "n30", text: " and I look forward to the resurrection of the dead" },
  { id: "n31", text: " and the life of the world to come. Amen." },
];

export const APOSTLES_BLANKABLE = [
  "a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","a10","a11","a12","a13","a14","a15","a16"
];

export const NICENE_BLANKABLE = [
  "n0","n1","n2","n3","n4","n5","n6","n7","n8","n9","n10","n11","n12","n13",
  "n14","n15","n16","n17","n18","n19","n20","n21","n22","n23","n24","n25","n26","n27","n28","n29","n30","n31"
];

export const DIFFICULTY_OPTIONS = [
  { key: "read",   label: "Read",   ratio: 0,    icon: "📖", desc: "Full text — read & study" },
  { key: "easy",   label: "Easy",   ratio: 0.25, icon: "🌱", desc: "~25% of phrases blanked" },
  { key: "normal", label: "Normal", ratio: 0.50, icon: "✦",  desc: "~50% of phrases blanked" },
  { key: "hard",   label: "Hard",   ratio: 1.0,  icon: "🔥", desc: "All phrases blanked" },
];
