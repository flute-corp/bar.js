/**
 * Created by ralphy on 15/02/17.
 */

/**
 * Les identifiant étant purement techniques, on les calcule à la volée
 * en début de programme
 */

O2.createObject('bar.database', [
    {
        label: "Soft",
        icon: "&#xEB41;",
        articles: [{
            label: "Coca-cola",
            desc: "Attention aux bulles !",
            prix: 1,
            img: "coca.jpg"
        }, {
            label: "Coca zero",
            desc: "Les bulles sont sans sucre !",
            prix: 1,
            img: "coca-zero.jpg"
        }, {
            label: "Jus d'orange",
            desc: "Quand c'est trop c'est tropico.",
            prix: 1,
            img: "jus-orange.jpg"
        }, {
            label: "Jus de pomme",
            desc: "C'est trognon comme boisson.",
            prix: 1,
            img: "jus-pomme.jpg"
        }, {
            label: "Jus d'abricot",
            desc: "Sans noyau.",
            prix: 1,
            img: "jus-abricot.jpg"
        }, {
            label: "Jus d'ananas",
            desc: "Les ananas de la belle...",
            prix: 1,
            img: "jus-ananas.jpg"
        }, {
            label: "Jus de pamplemousse",
            desc: "Meilleur avec du vin blanc.",
            prix: 1,
            img: "jus-pamplemousse.jpg"
        }, {
            label: "Jus de tomate",
            desc: "La tomate est un fruit, c'est un fait.",
            prix: 1,
            img: "jus-tomate.jpg"
        }, {
            label: "Jus de fraise",
            desc: "La boisson de charlotte.",
            prix: 1,
            img: "jus-fraise.jpg"
        }, {
            label: "Orangina",
            desc: "Secouez, sinon la pulpe, elle reste en bas.",
            prix: 1,
            img: "orangina.jpg"
        }, {
            label: "Schweppes agrum",
            desc: "What did you expect.",
            prix: 1,
            img: "schweppes-agrum.jpg"
        }, {
            label: "Limonade",
            desc: "Bulle + citron + eau.",
            prix: 1,
            img: "limonade.jpg"
        }, {
            label: "Perrier",
            desc: "Un sirop dedans ?",
            prix: 1,
            img: "perrier.jpg"
        }, {
            label: "Evian",
            desc: "(De quel massif montagneux ca vient çà déjà ?)",
            prix: 1,
            img: "evian.jpg"
        }, {
            label: "Cristaline",
            desc: "C'est clair",
            prix: 0.5,
            img: "cristaline.jpg"
        }, {
            label: "la Seinoise",
            desc: "Riche en urinium, et en oligo-excréments.",
            prix: 0.5,
            img: "seinoise.jpg"
        }]
    }, {
        label: "Binouzes",
        icon: "&#xE544;",
        articles: [{
            label: "Grim (bouteille)",
            desc: "La bière des hommes",
            prix: 1.5,
            img: "grimbergen.jpg"
        }, {
            label: "Grim Rouge",
            desc: "La bière des femmes",
            prix: 1.5,
            img: "grim-rouge.jpg"
        }, {
            label: "1664",
            desc: "Idéal avant de retourner sur le chantier",
            prix: 1.3,
            img: "1664-pression.jpg"
        }, {
            label: "1664 (bouteille)",
            desc: "Idéal avant de retourner sur le chantier",
            prix: 1.5,
            img: "1664.jpg"
        }, {
            label: "Panaché",
            desc: "Servi avec panache !",
            prix: 1.3,
            img: "panache.jpg"
        }, {
            label: "Monaco",
            desc: "Une peu de fruit pour les vitamines !",
            prix: 1.3,
            img: "monaco.jpg"
        }, {
            label: "PCB",
            desc: "Un picon ch'tit biloute !",
            prix: 1.8,
            img: "picon.jpg"
        }, {
            label: "Bière du mois",
            desc: "Selon arrivages",
            prix: 1.5,
            img: "bdm.jpg"
        }]
    }, {
        label: "Boissons alcoolisées",
        icon: "&#xE540;",
        articles: [{
            label: "Martini",
            desc: "Martini dry... Avec ou sans olives ?",
            prix: 1.5,
            img: "martini.jpg"
        }, {
            label: "Muscat",
            desc: "Une velle robe dorée",
            prix: 1.5,
            img: "muscat.jpg"
        }, {
            label: "Pineau",
            desc: "À commander en charentaises",
            prix: 1.5,
            //img: "grimbergen.jpg"
        }, {
            label: "Rosé pamplemousse",
            desc: "Teneur en fruit non garantie",
            prix: 1.4,
            //img: "grimbergen.jpg"
        }, {
            label: "Vin blanc",
            desc: "Belle robe dorée",
            prix: 1.4,
            //img: "grimbergen.jpg"
        }, {
            label: "Vin mousseux",
            desc: "Le vin qui pique !",
            prix: 1.4,
            //img: "grimbergen.jpg"
        }, {
            label: "Cidre (75cl)",
            desc: "Mangez des pommes !",
            prix: 5,
            //img: "grimbergen.jpg"
        }, {
            label: "Kir vin blanc",
            prix: 1.5,
            //img: "grimbergen.jpg"
        }, {
            label: "Kir royal",
            desc: "Mure ou cassis ?",
            prix: 1.5,
            //img: "grimbergen.jpg"
        }]
    }, {
        label: "Miam-miam",
        icon: "&#xE552;",
        articles: [{
            label: "Chips",
            desc: "Le roi de la pomme de terre",
            prix: 2,
            img: "chips.jpg"
        }, {
            label: "Saucisson",
            desc: "Préciser \"A l'ail\" si possible",
            prix: 2.9,
            img: "saucisson.jpg"
        }, {
            label: "Chorizo",
            desc: "Aux épices",
            prix: 2.9,
            //img: "saucisson.jpg"
        }, {
            label: "Olives",
            desc: "Fraichement cueillies dans le bocal",
            prix: 2,
            //img: "saucisson.jpg"
        },  {
            label: "Carre filet",
            desc: "Aucune idée mais c'est sur la carte....",
            prix: 3.5,
            //img: "saucisson.jpg"
        }]
    }, {
        label: "Boissons Chaudes",
        icon: "&#xE541;",
        articles: [{
            label: "Espresso",
            desc: "Du bon nectar.",
            prix: 0.5,
            img: "espresso.jpg"
        }, {
            label: "Double Espresso",
            desc: "Que j'aime ta couleur...",
            prix: 1,
            img: "doubleEspresso.jpg"
        }, {
            label: "Décaféiné",
            desc: "C'est pas du café en gros ?",
            prix: 0.5,
            img: "decafeine.jpg"
        }, {
            label: "Chocolat",
            desc: "Le meilleurs c'est choky !",
            prix: 0.5,
            img: "chocolat.jpg"
        }, {
            label: "Capuccino",
            desc: "À l'italienne",
            prix: 0.5,
            img: "capuccino.jpg"
        }, {
			label: "Thé",
			desc: "Tea time",
			prix: 0.5,
			img: "the.jpg"
		}]
    }
]);
