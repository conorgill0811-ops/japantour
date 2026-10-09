/* TOUR DATA — coordinates must be verified by me before use.
   Longitude comes first. Unverified coordinates stay null; checked stays blank.
   City is a jump-button group; the Mikasa stop is grouped with Tokyo. */
const PLACES = [
  {
    name: "Haneda Airport, Tokyo",
    lon: 139.77911773258015, lat: 35.54808538946331,
    description: "Haneda is an airport serving Tokyo.",
    photo: "", photoAlt: "",
    source: "https://www.google.com/maps/place/Haneda+Airport/@35.5477009,139.7684885,15z/data=!3m1!4b1!4m6!3m5!1s0x6018640ba43192e3:0xd32c3a9d146f8df!8m2!3d35.5482964!4d139.7779951!16zL20vMDFubG1t?entry=ttu&g_ep=EgoyMDI2MTAwNS4wIKXMDSoASAFQAw%3D%3D", checked: "2026-10-08",
    city: "Tokyo"
  },
  {
    name: "Akihabara",
    lon: 139.7713823972792, lat: 35.700204603110684,
    description: "Akihabara is a district in Tokyo.",
    photo: "", photoAlt: "",
    source: "https://www.google.com/maps/place/Akihabara,+Taito+City,+Tokyo+110-0006,+Japan/@35.7021768,139.7719771,17z/data=!3m1!4b1!4m6!3m5!1s0x60188ea73ea6f4ff:0x5eb9f1e50fe061e3!8m2!3d35.7022589!4d139.7744733!16s%2Fg%2F11bc6tf5hn?entry=ttu&g_ep=EgoyMDI2MTAwNS4wIKXMDSoASAFQAw%3D%3D", checked: "2026-10-08",
    city: "Tokyo"
  },
  {
    name: "Yokosuka Bay – Mikasa Museum (Memorial Ship Mikasa)",
    lon: 139.6743156769027, lat: 35.28513437825534,
    description: "Needs verification.",
    photo: "", photoAlt: "",
    source: "https://www.google.com/maps/place/Mikasa+Memorial+Warship/@35.2851513,139.6694931,17z/data=!3m1!4b1!4m6!3m5!1s0x6018400b92528b0f:0x5f4e4fc77c4aeef0!8m2!3d35.285147!4d139.674364!16zL20vMDQxMmQ5?entry=ttu&g_ep=EgoyMDI2MTAwNS4wIKXMDSoASAFQAw%3D%3D", checked: "2026-10-08",
    city: "Tokyo"
  },
  {
    name: "Tokyo Skytree",
    lon: 139.8106188766512, lat: 35.70994580596424,
    description: "Tokyo Skytree is a broadcasting tower in Tokyo.",
    photo: "", photoAlt: "",
    source: "https://www.google.com/maps/place/Tokyo+Skytree/@35.710067,139.8081255,17z/data=!3m2!4b1!5s0x60188ed65efdab8f:0x73c3daecfb7877f2!4m6!3m5!1s0x60188ed0d12f9adf:0x7d1d4fb31f43f72a!8m2!3d35.7100627!4d139.8107004!16zL20vMDd0aGty?entry=ttu&g_ep=EgoyMDI2MTAwNS4wIKXMDSoASAFQAw%3D%3D", checked: "2026-10-08",
    city: "Tokyo"
  },
  {
    name: "Yushukan Museum",
    lon: 139.74358505730999, lat:  35.69497914235892,
    description: "Needs verification.",
    photo: "", photoAlt: "",
    source: "https://www.google.com/maps/place/Yushukan+Museum/@35.6949991,139.7410414,17z/data=!3m1!4b1!4m6!3m5!1s0x60188ddec973a031:0xeeb1eede2dcb876!8m2!3d35.6949948!4d139.7436163!16s%2Fm%2F047c8pg?entry=ttu&g_ep=EgoyMDI2MTAwNS4wIKXMDSoASAFQAw%3D%3D", checked: "2026-10-08",
    city: "Tokyo"
  },
  {
    name: "Imperial Palace",
    lon: 139.75220930416498, lat: 35.68453050391329,
    description: "The Imperial Palace is in Tokyo.",
    photo: "", photoAlt: "",
    source: "https://www.google.com/maps/search/imperial+palace+1-1+chiyoda+chiyoda+city+tokyo+japan/@35.6859112,139.7543053,17z/data=!3m1!4b1!4m8!2m7!3m6!1simperial+palace+1-1+chiyoda+chiyoda+city+tokyo+japan!2sHosei+University!3s0x60188c5d470c50a9:0x995f857ffd2943a0!4m2!1d139.74161!2d35.6958117?entry=ttu&g_ep=EgoyMDI2MTAwNS4wIKXMDSoASAFQAw%3D%3D", checked: "2026-10-08",
    city: "Tokyo"
  },
  {
    name: "Ueno Zoo",
    lon: 139.77259569970312, lat: 35.716398142184914,
    description: "Ueno Zoo is a zoo in Tokyo.",
    photo: "", photoAlt: "",
    source: "https://www.google.com/maps/place/Ueno+Zoological+Gardens/@35.7164519,139.7700077,17z/data=!3m1!4b1!4m6!3m5!1s0x60188c28f7766d7f:0x76b8b5efa1988ef4!8m2!3d35.7164476!4d139.7725826!16zL20vMDN6Zm5t?entry=ttu&g_ep=EgoyMDI2MTAwNS4wIKXMDSoASAFQAw%3D%3D", checked: "2026-10-08",
    city: "Tokyo"
  },
  {
    name: "Shibuya Crossing",
    lon: 139.70053156798596, lat: 35.65947387566443,
    description: "Shibuya Crossing is a pedestrian crossing in Tokyo.",
    photo: "", photoAlt: "",
    source: "https://www.google.com/maps/place/Shibuya+Scramble+Crossing/@35.6594847,139.6989864,17z/data=!3m2!4b1!5s0x60188b57f546295f:0x486cece41a7b21b0!4m6!3m5!1s0x60188bcaeb0cd12b:0x20e563a2e0aec969!8m2!3d35.659482!4d139.7005596!16s%2Fg%2F11shy4scrj?entry=ttu&g_ep=EgoyMDI2MTAwNS4wIKXMDSoASAFQAw%3D%3D", checked: "2026-10-08",
    city: "Tokyo"
  },
  {
    name: "Osaka (city center)",
    lon: 135.4983178990497, lat: 34.694984093594584,
    description: "Osaka is a city in Japan. The city-center reference point needs verification.",
    photo: "", photoAlt: "",
    source: "https://www.google.com/maps/place/Osaka,+Japan/@34.6777116,135.4036357,12z/data=!3m1!4b1!4m6!3m5!1s0x6000e6553406e2e1:0xc55bc16ee46a2fe7!8m2!3d34.6952474!4d135.5012079!16zL20vMGRxeXc?entry=ttu&g_ep=EgoyMDI2MTAwNS4wIKXMDSoASAFQAw%3D%3D", checked: "2026-10-08",
    city: "Osaka"
  },
  {
    name: "Osaka Castle",
    lon: 135.52580095165408, lat: 34.68735411494743,
    description: "Osaka Castle is a castle in Osaka.",
    photo: "", photoAlt: "",
    source: "https://www.google.com/maps/place/Osaka+Castle/@34.6777116,135.4036357,12z/data=!4m6!3m5!1s0x6000e0cd5c283afd:0xf01d07d5ca11e41!8m2!3d34.6872571!4d135.5258546!16zL20vMDI0Yl9n?entry=ttu&g_ep=EgoyMDI2MTAwNS4wIKXMDSoASAFQAw%3D%3D", checked: "2026-10-08",
    city: "Osaka"
  },
  {
    name: "Osaka Aquarium",
    lon: 135.42898595354848, lat: 34.654685857165326,
    description: "Osaka Aquarium is an aquarium in Osaka.",
    photo: "", photoAlt: "",
    source: "https://www.google.com/maps/place/Osaka+Aquarium+Kaiyukan/@34.6545226,135.4263896,17z/data=!3m2!4b1!5s0x6000e8f48fa243ff:0x25fc1f29292f7889!4m6!3m5!1s0x6000e8f48c0da9cd:0x6f83c520ae082ccc!8m2!3d34.6545182!4d135.4289645!16zL20vMDJjeW13?entry=ttu&g_ep=EgoyMDI2MTAwNS4wIKXMDSoASAFQAw%3D%3D", checked: "2026-10-08",
    city: "Osaka"
  },
  {
    name: "Hiroshima (city center)",
    lon: 132.45449112928503, lat: 34.38485056613671,
    description: "Hiroshima is a city in Japan. The city-center reference point needs verification.",
    photo: "", photoAlt: "",
    source: "https://www.google.com/maps/place/Hiroshima,+Japan/@34.4561105,132.2724915,11z/data=!3m1!4b1!4m6!3m5!1s0x355a9908eef34fbb:0x7e4ce50cfc1f772!8m2!3d34.3852894!4d132.4553055!16zL20vMGczY3c?entry=ttu&g_ep=EgoyMDI2MTAwNS4wIKXMDSoASAFQAw%3D%3D", checked: "2026-10-08",
    city: "Hiroshima"
  },
  {
    name: "Atomic Bomb Dome",
    lon: 132.45361303976728, lat: 34.395445103813024,
    description: "The Atomic Bomb Dome is a memorial site in Hiroshima.",
    photo: "", photoAlt: "",
    source: "https://www.google.com/maps/place/Atomic+Bomb+Dome/@34.4561105,132.2724915,11z/data=!4m6!3m5!1s0x355aa20cdb2780a9:0x34e6677ae0c6c096!8m2!3d34.395483!4d132.453592!16zL20vMDFmYnoy?entry=ttu&g_ep=EgoyMDI2MTAwNS4wIKXMDSoASAFQAw%3D%3D", checked: "2026-10-08",
    city: "Hiroshima"
  },
  {
    name: "Hiroshima Peace Memorial Museum",
    lon: 132.45289343928593, lat: 34.391616656993925,
    description: "Hiroshima Peace Memorial Museum is a museum in Hiroshima.",
    photo: "", photoAlt: "",
    source: "https://www.google.com/maps/place/Hiroshima+Peace+Memorial+Museum/@34.3915071,132.4505829,17z/data=!3m1!4b1!4m6!3m5!1s0x355aa212cbda2bb7:0xf13067716a928180!8m2!3d34.3915027!4d132.4531578!16s%2Fm%2F025tsky?entry=ttu&g_ep=EgoyMDI2MTAwNS4wIKXMDSoASAFQAw%3D%3D", checked: "2026-10-08",
    city: "Hiroshima"
  },
  {
    name: "JFK Airport, New York (return home)",
    lon: -73.7795302766786, lat: 40.64518151463758,
    description: "JFK is an airport serving New York City.",
    photo: "", photoAlt: "",
    source: "https://www.google.com/maps/place/John+F.+Kennedy+International+Airport/@40.6437325,-73.7941215,15z/data=!3m1!4b1!4m6!3m5!1s0x89c26650d5404947:0xec4fb213489f11f0!8m2!3d40.6446124!4d-73.7797278!16zL20vMHAxbDI?entry=ttu&g_ep=EgoyMDI2MTAwNS4wIKXMDSoASAFQAw%3D%3D", checked: "2026-10-08",
    city: "Home"
  }

  /* MISSING-DATA EXERCISE: on a copy, delete this line and the END line below, then reload.
  ,{
    name: "Unverified Stop",
    lon: null, lat: null,
    description: "Coordinates not verified yet.",
    photo: "", photoAlt: "",
    source: "UNVERIFIED – coordinates pending", checked: "",
    city: "Tokyo"
  }
  END OF EXERCISE */
];
if (typeof module !== 'undefined') module.exports = PLACES;


