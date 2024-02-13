import { Person } from "./person";
import { Address } from "./adress";
import { Telephone } from "./telephone";
import { Email } from "./email";

export const PEOPLE: Person[] = [
  { id: 1,
    firstname: 'Nils',
    lastname: 'Jansen',
    tel: [
      <Telephone>{
        desc: "Mobil",
        number: 157383832,
      }
    ],
    email: [
      <Email>{
        desc: 'Privat',
        address: 'nj@gmail.com'
      },
      <Email>{
        desc: 'Arbeit',
        address: 'abcd@gmx.net'
      }
    ],
    address: <Address>{
      street: "Josefstr. 62",
      postcode: 41462,
      city: "Neuss",
      country: "Deutschland"
    },
  },
  { id: 2,
    firstname: 'Eva',
    lastname: 'Schäfer',
    tel: [
      <Telephone>{
        desc: 'Festnetz',
        number: 12173839
      }
    ],
    email: [
      <Email>{
        desc: 'Schule',
        address: 'eva@hsd.edu'
      }
    ],
    address: <Address>{
      street: "Zinsäckerstr. 8",
      postcode: 76540,
      city: "Gernsbach",
      country: "Deutschland"
    },
  },
  { id: 3,
    firstname: 'Ella',
    lastname: 'Petrossowa',
    tel: [
      <Telephone>{
        desc: 'Privat',
        number: 15157892222
      }
    ],
    email: [],
    address: <Address>{
      street: "Meisenkopfstr. 3",
      postcode: 76530,
      city: "Baden-Baden",
      country: "Deutschland"
    },
  },
  { id: 4,
    firstname: 'Philipp',
    lastname: 'Avtonoschkin',
    tel: [
      <Telephone>{
        desc: 'Mobil',
        number: 15751996534
      }
    ],
    email: [
      <Email>{
        desc: 'Arbeit',
        address: 'dilipp@gmail.com'
      }
    ],
    address: <Address>{
      street: "Meisenkopfstr. 3",
      postcode: 76530,
      city: "Baden-Baden",
      country: "Deutschland"
    },
  },
  { id: 7,
    firstname: 'Artur',
    lastname: 'Gerbersgagen',
    tel: [
      <Telephone>{
        desc: 'Mobil',
        number: 122177728
      },
      <Telephone>{
        desc: 'Arbeit',
        number: 122188728
      },
    ],
    email: [

    ],
    address: <Address>{
      street: "Bahnhofstr. 25",
      postcode: 41783,
      city: "Mönchengladbach",
      country: "Deutschland"
    },
  },
  { id: 9,
    firstname: 'Felicitas',
    lastname: 'Ruiter',
    tel: [

    ],
    email: [
      <Email>{
        desc: 'Privat',
        address: 'feli@gmail.com'
      }
    ],
    address: <Address>{
      street: "Monheimerstr. 82",
      postcode: 45028,
      city: "Leverkusen",
      country: "Deutschland"
    }
  }
]
