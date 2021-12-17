const drivers = [
    {
        number: 44,
        name: "Lewis Hamilton",
        team: "Mercedes",
        helmet: "./assets/helmets/hamilton_helmet.png"
    },
    {
        number: 77,
        name: "Valtteri Bottas",
        team: "Mercedes",
        helmet: "./assets/helmets/bottas_helmet.png"
    },
    {
        number: 33,
        name: "Max Verstappen",
        team: "Red Bull Racing",
        helmet: "./assets/helmets/verstappen_helmet.png"
    },
    {
        number: 11,
        name: "Sergio Perez",
        team: "Red Bull Racing",
        helmet: "./assets/helmets/perez_helmet.png"
    },
    {
        number: 16,
        name: "Charles Leclerc",
        team: "Ferrari",
        helmet: "./assets/helmets/leclerc_helmet.png"
    },
    {
        number: 55,
        name: "Carlos Sainz",
        team: "Ferrari",
        helmet: "./assets/helmets/sainz_helmet.png"
    },
    {
        number: 4,
        name: "Lando Norris",
        team: "McLaren",
        helmet: "./assets/helmets/norris_helmet.png"
    },
    {
        number: 3,
        name: "Daniel Ricciardo",
        team: "McLaren",
        helmet: "./assets/helmets/ricciardo_helmet.png"
    },
    {
        number: 31,
        name: "Esteban Ocon",
        team: "Alpine",
        helmet: "./assets/helmets/ocon_helmet.png"
    },
    {
        number: 14,
        name: "Fernando Alonso",
        team: "Alpine",
        helmet: "./assets/helmets/alonso_helmet.png"
    },
    {
        number: 10,
        name: "Pierre Gasly",
        team: "Alpha Tauri",
        helmet: "./assets/helmets/gasly_helmet.png"
    },
    {
        number: 22,
        name: "Yuki Tsunoda",
        team: "Alpha Tauri",
        helmet: "./assets/helmets/tsunoda_helmet.png"
    },
    {
        number: 5,
        name: "Sebastien Vettel",
        team: "Aston Martin",
        helmet: "./assets/helmets/vettel_helmet.png"
    },
    {
        number: 18,
        name: "Lance Stroll",
        team: "Aston Martin",
        helmet: "./assets/helmets/stroll_helmet.png"
    },
    {
        number: 7,
        name: "Kimi Räikkönen",
        team: "Alfa Romeo",
        helmet: "./assets/helmets/raikkonen_helmet.png"
    },
    {
        number: 99,
        name: "Antonio Giovinazzi",
        team: "Alfa Romeo",
        helmet: "./assets/helmets/giovinazzi_helmet.png"
    },
    {
        number: 63,
        name: "George Russell",
        team: "Williams",
        helmet: "./assets/helmets/russell_helmet.png"
    },
    {
        number: 6,
        name: "Nicholas Latifi",
        team: "Williams",
        helmet: "./assets/helmets/latifi_helmet.png"
    },
    {
        number: 47,
        name: "Mick Schumacher",
        team: "Haas",
        helmet: "./assets/helmets/schumacher_helmet.png"
    },
    {
        number: 9,
        name: "Nikita Mazepin",
        team: "Haas",
        helmet: "./assets/helmets/mazepin_helmet.png"
    }
]

const teams = [
    {
        id: 1,
        name: "Mercedes",
        image: "./assets/cars/mercedes.png"
    },
    {
        id: 2,
        name: "Red Bull Racing",
        image: "./assets/cars/redbull.png"
    },
    {
        id: 3,
        name: "Ferrari",
        image: "./assets/cars/ferrari.png"
    },
    {
        id: 4,
        name: "McLaren",
        image: "./assets/cars/mclaren.png"
    },
    {
        id: 5,
        name: "Alpine",
        image: "./assets/cars/alpine.png"
    },
    {
        id: 6,
        name: "Alpha Tauri",
        image: "./assets/cars/alphatauri.png"
    },
    {
        id: 7,
        name: "Aston Martin",
        image: "./assets/cars/aston.png"
    },
    {
        id: 8,
        name: "Alfa Romeo",
        image: "./assets/cars/alfaromeo.png"
    },
    {
        id: 9,
        name: "Williams",
        image: "./assets/cars/williams.png"
    },
    {
        id: 10,
        name: "Haas",
        image: "./assets/cars/haas.png"
    }
]

const tracks = [
    {
        id: 1,
        name: "Circuit de Barcelona-Catalunya",
        image: "./assets/tracks/barcelona.svg"
    },
    {
        id: 2,
        name: "Circuit de Monaco",
        image: "./assets/tracks/monaco.svg"
    },
    {
        id: 3,
        name: "Circuit de Spa-Francorchamps",
        image: "./assets/tracks/spa.svg"
    },
    {
        id: 4,
        name: "Red Bull Ring",
        image: "./assets/tracks/austria.svg"
    },
    {
        id: 5,
        name: "Baku City Circuit",
        image: "./assets/tracks/baku.svg"
    },
    {
        id: 6,
        name: "Shanghai International Circuit",
        image: "./assets/tracks/china.svg"
    },
    {
        id: 7,
        name: "Circuit of the Americas",
        image: "./assets/tracks/cota.svg"
    },
    {
        id: 8,
        name: "Autodromo Internazionale Enzo e Dino Ferrari",
        image: "./assets/tracks/imola.svg"
    },
    {
        id: 9,
        name: "Autódromo José Carlos Pace",
        image: "./assets/tracks/interlagos.svg"
    },
    {
        id: 10,
        name: "Sepang International Circuit",
        image: "./assets/tracks/malaysia.svg"
    },
    {
        id: 11,
        name: "Albert Park Circuit",
        image: "./assets/tracks/melbourne.svg"
    },
    {
        id: 12,
        name: "Autódromo Hermanos Rodríguez",
        image: "./assets/tracks/mexico.svg"
    },
    {
        id: 13,
        name: "Circuit Gilles-Villeneuve",
        image: "./assets/tracks/montreal.svg"
    },
    {
        id: 14,
        name: "Autodromo Nazionale di Monza",
        image: "./assets/tracks/monza.svg"
    },
    {
        id: 15,
        name: "Nürburgring",
        image: "./assets/tracks/nurburgring.svg"
    },
    {
        id: 16,
        name: "Silverstone Circuit",
        image: "./assets/tracks/silverstone.svg"
    },
    {
        id: 17,
        name: "Marina Bay Street Circuit",
        image: "./assets/tracks/singapore.svg"
    },
    {
        id: 18,
        name: "Sochi Autodrom",
        image: "./assets/tracks/sochi.svg"
    },
    {
        id: 19,
        name: "Suzuka International Racing Course",
        image: "./assets/tracks/suzuka.svg"
    },
    {
        id: 20,
        name: "Circuit Zandvoort",
        image: "./assets/tracks/zandvoort.svg"
    }
]

const initialData = {
    event : {
        id: 1,
        title: "Testing event",
        date: "2020-01-01",
    },
    allLaptimes: [
        {
            id: 1,
            driverNumber: 44,
            time: {
                minutes: 1,
                seconds: 12,
                fractions: 123
            },
            tyres: "S",
            eventId: 1
        },
        {
            id: 2,
            driverNumber: 33,
            time: {
                minutes: 1,
                seconds: 12,
                fractions: 45,
            },
            tyres: "M",
            eventId: 1
        },
        {
            id: 3,
            driverNumber: 14,
            time: {
                minutes: 1,
                seconds: 13,
                fractions: 678,
            },
            tyres: "S",
            eventId: 1
        },
        {
            id: 4,
            driverNumber: 22,
            time: {
                minutes: 1,
                seconds: 13,
                fractions: 444,
            },
            tyres: "M",
            eventId: 1
        },
        {
            id: 5,
            driverNumber: 3,
            time: {
                minutes: 1,
                seconds: 14,
                fractions: 555,
            },
            tyres: "H",
            eventId: 1
        }
    ]
}