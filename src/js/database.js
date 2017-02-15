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
            label: "Jus d'orange",
            desc: "Quand c'est trop c'est tropico.",
            prix: 1,
            img: "jus-d-orange.jpg"
        }, {
            label: "Perrier",
            desc: "Un sirop dedans ?",
            prix: 1,
            img: "perrier.jpg"
        }]
    }, {
        label: "Binouze",
        icon: "&#xE544;",
        articles: [{
            label: "Grim bouteille",
            desc: "La bière des hommes",
            prix: 1.5,
            img: "grimbergen.jpg"
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
            desc: "Préciser \"Hallal\" si possible",
            prix: 1.9,
            img: "saucisson.jpg"
        }]
    }, {
        label: "Boissons Chaudes",
        icon: "local_cafe",
        articles: [{
            label: "Espresso",
            desc: "Du bon nectar.",
            prix: 0.5,
            img: "espresso.jpg"
        }]
    }
]);