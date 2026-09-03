(() => {
    "use strict";

    const rawElements = [
        "1|H|Hydrogen|1|1|s|2|1", "2|He|Helium|1|18|s|2|18",
        "3|Li|Lithium|2|1|s|3|1", "4|Be|Beryllium|2|2|s|3|2", "5|B|Boron|2|13|p|3|13", "6|C|Carbon|2|14|p|3|14", "7|N|Nitrogen|2|15|p|3|15", "8|O|Oxygen|2|16|p|3|16", "9|F|Fluorine|2|17|p|3|17", "10|Ne|Neon|2|18|p|3|18",
        "11|Na|Sodium|3|1|s|4|1", "12|Mg|Magnesium|3|2|s|4|2", "13|Al|Aluminium|3|13|p|4|13", "14|Si|Silicon|3|14|p|4|14", "15|P|Phosphorus|3|15|p|4|15", "16|S|Sulfur|3|16|p|4|16", "17|Cl|Chlorine|3|17|p|4|17", "18|Ar|Argon|3|18|p|4|18",
        "19|K|Potassium|4|1|s|5|1", "20|Ca|Calcium|4|2|s|5|2", "21|Sc|Scandium|4|3|d|5|3", "22|Ti|Titanium|4|4|d|5|4", "23|V|Vanadium|4|5|d|5|5", "24|Cr|Chromium|4|6|d|5|6", "25|Mn|Manganese|4|7|d|5|7", "26|Fe|Iron|4|8|d|5|8", "27|Co|Cobalt|4|9|d|5|9", "28|Ni|Nickel|4|10|d|5|10", "29|Cu|Copper|4|11|d|5|11", "30|Zn|Zinc|4|12|d|5|12", "31|Ga|Gallium|4|13|p|5|13", "32|Ge|Germanium|4|14|p|5|14", "33|As|Arsenic|4|15|p|5|15", "34|Se|Selenium|4|16|p|5|16", "35|Br|Bromine|4|17|p|5|17", "36|Kr|Krypton|4|18|p|5|18",
        "37|Rb|Rubidium|5|1|s|6|1", "38|Sr|Strontium|5|2|s|6|2", "39|Y|Yttrium|5|3|d|6|3", "40|Zr|Zirconium|5|4|d|6|4", "41|Nb|Niobium|5|5|d|6|5", "42|Mo|Molybdenum|5|6|d|6|6", "43|Tc|Technetium|5|7|d|6|7", "44|Ru|Ruthenium|5|8|d|6|8", "45|Rh|Rhodium|5|9|d|6|9", "46|Pd|Palladium|5|10|d|6|10", "47|Ag|Silver|5|11|d|6|11", "48|Cd|Cadmium|5|12|d|6|12", "49|In|Indium|5|13|p|6|13", "50|Sn|Tin|5|14|p|6|14", "51|Sb|Antimony|5|15|p|6|15", "52|Te|Tellurium|5|16|p|6|16", "53|I|Iodine|5|17|p|6|17", "54|Xe|Xenon|5|18|p|6|18",
        "55|Cs|Caesium|6|1|s|7|1", "56|Ba|Barium|6|2|s|7|2", "57|La|Lanthanum|6|3|f|10|4", "58|Ce|Cerium|6|3|f|10|5", "59|Pr|Praseodymium|6|3|f|10|6", "60|Nd|Neodymium|6|3|f|10|7", "61|Pm|Promethium|6|3|f|10|8", "62|Sm|Samarium|6|3|f|10|9", "63|Eu|Europium|6|3|f|10|10", "64|Gd|Gadolinium|6|3|f|10|11", "65|Tb|Terbium|6|3|f|10|12", "66|Dy|Dysprosium|6|3|f|10|13", "67|Ho|Holmium|6|3|f|10|14", "68|Er|Erbium|6|3|f|10|15", "69|Tm|Thulium|6|3|f|10|16", "70|Yb|Ytterbium|6|3|f|10|17", "71|Lu|Lutetium|6|3|f|10|18", "72|Hf|Hafnium|6|4|d|7|4", "73|Ta|Tantalum|6|5|d|7|5", "74|W|Tungsten|6|6|d|7|6", "75|Re|Rhenium|6|7|d|7|7", "76|Os|Osmium|6|8|d|7|8", "77|Ir|Iridium|6|9|d|7|9", "78|Pt|Platinum|6|10|d|7|10", "79|Au|Gold|6|11|d|7|11", "80|Hg|Mercury|6|12|d|7|12", "81|Tl|Thallium|6|13|p|7|13", "82|Pb|Lead|6|14|p|7|14", "83|Bi|Bismuth|6|15|p|7|15", "84|Po|Polonium|6|16|p|7|16", "85|At|Astatine|6|17|p|7|17", "86|Rn|Radon|6|18|p|7|18",
        "87|Fr|Francium|7|1|s|8|1", "88|Ra|Radium|7|2|s|8|2", "89|Ac|Actinium|7|3|f|11|4", "90|Th|Thorium|7|3|f|11|5", "91|Pa|Protactinium|7|3|f|11|6", "92|U|Uranium|7|3|f|11|7", "93|Np|Neptunium|7|3|f|11|8", "94|Pu|Plutonium|7|3|f|11|9", "95|Am|Americium|7|3|f|11|10", "96|Cm|Curium|7|3|f|11|11", "97|Bk|Berkelium|7|3|f|11|12", "98|Cf|Californium|7|3|f|11|13", "99|Es|Einsteinium|7|3|f|11|14", "100|Fm|Fermium|7|3|f|11|15", "101|Md|Mendelevium|7|3|f|11|16", "102|No|Nobelium|7|3|f|11|17", "103|Lr|Lawrencium|7|3|f|11|18", "104|Rf|Rutherfordium|7|4|d|8|4", "105|Db|Dubnium|7|5|d|8|5", "106|Sg|Seaborgium|7|6|d|8|6", "107|Bh|Bohrium|7|7|d|8|7", "108|Hs|Hassium|7|8|d|8|8", "109|Mt|Meitnerium|7|9|d|8|9", "110|Ds|Darmstadtium|7|10|d|8|10", "111|Rg|Roentgenium|7|11|d|8|11", "112|Cn|Copernicium|7|12|d|8|12", "113|Nh|Nihonium|7|13|p|8|13", "114|Fl|Flerovium|7|14|p|8|14", "115|Mc|Moscovium|7|15|p|8|15", "116|Lv|Livermorium|7|16|p|8|16", "117|Ts|Tennessine|7|17|p|8|17", "118|Og|Oganesson|7|18|p|8|18"
    ];

    const elements = rawElements.map((line) => {
        const [z, symbol, name, period, group, block, row, col] = line.split("|");
        return { z: Number(z), symbol, name, period: Number(period), group: Number(group), block, row: Number(row), col: Number(col) };
    });

    const byNumber = new Map(elements.map((element) => [element.z, element]));
    const filter = {
        field: (field, value) => (element) => element[field] === value,
        keep: (...numbers) => (element) => numbers.includes(element.z),
        all: (...tests) => (element) => tests.every((test) => test(element))
    };

    const cases = [
        {
            title: "The Block District Case",
            brief: "Locate the missing element using its position in the table.",
            mysteries: [
                {
                    z: 11,
                    opening: ["Location report", "The element is in Period 3.", filter.field("period", 3)],
                    evidence: [
                        ["Block scan", "Its differentiating electron enters an s-orbital: it belongs to the s-block.", filter.field("block", "s")],
                        ["Family record", "It is an alkali metal in Group 1 (hydrogen is the non-metal exception in this column).", filter.keep(3, 11, 19, 37, 55, 87)],
                        ["Ion report", "It commonly loses one electron to form an M⁺ ion.", filter.keep(3, 11, 19, 37, 55, 87)]
                    ],
                    explanation: "Sodium is the Period 3, Group 1 s-block element. Its 3s¹ valence electron is readily lost to form Na⁺."
                },
                {
                    z: 13,
                    opening: ["Location report", "The element is in Period 3.", filter.field("period", 3)],
                    evidence: [
                        ["Block scan", "Its differentiating electron enters a p-orbital: it belongs to the p-block.", filter.field("block", "p")],
                        ["Family record", "It is in Group 13, the boron family.", filter.field("group", 13)],
                        ["Ion report", "Its common oxidation state is +3.", filter.keep(5, 13, 31, 49, 81)]
                    ],
                    explanation: "Aluminium lies in Period 3 and Group 13. Its valence configuration is 3s²3p¹ and it commonly forms Al³⁺."
                }
            ]
        },
        {
            title: "The Electron File",
            brief: "Use valence-electron evidence to identify the missing element.",
            mysteries: [
                {
                    z: 17,
                    opening: ["Orbital scan", "The differentiating electron enters a p-orbital.", filter.field("block", "p")],
                    evidence: [
                        ["Shell count", "Its valence shell is the third shell (n = 3).", filter.field("period", 3)],
                        ["Valence file", "It has seven valence electrons: ns²np⁵.", filter.field("group", 17)],
                        ["Ion report", "It commonly gains one electron to complete an octet and forms X⁻.", filter.keep(9, 17, 35, 53, 85, 117)]
                    ],
                    explanation: "Chlorine has the valence configuration 3s²3p⁵. It is the Period 3 halogen and commonly forms Cl⁻."
                },
                {
                    z: 7,
                    opening: ["Shell count", "The atom has two occupied electron shells.", filter.field("period", 2)],
                    evidence: [
                        ["Orbital scan", "Its differentiating electron enters a p-orbital.", filter.field("block", "p")],
                        ["Valence file", "Its valence configuration is ns²np³: five valence electrons.", filter.field("group", 15)],
                        ["Bond record", "It commonly forms three covalent bonds to complete its octet.", filter.keep(7, 15, 33, 51)]
                    ],
                    explanation: "Nitrogen is the Period 2, Group 15 element. Its 2s²2p³ valence configuration gives five valence electrons."
                }
            ]
        },
        {
            title: "The Trend Trail",
            brief: "Follow changes in atomic size and electronegativity across the table.",
            mysteries: [
                {
                    z: 8,
                    opening: ["Location report", "The element is a p-block member of Period 2.", filter.all(filter.field("period", 2), filter.field("block", "p"))],
                    evidence: [
                        ["Electronegativity trail", "Across Period 2, its electronegativity is greater than nitrogen's but less than fluorine's.", filter.keep(8)],
                        ["Family record", "It heads Group 16, the chalcogen family.", filter.field("group", 16)],
                        ["Ion report", "It commonly gains two electrons and has oxidation state −2 in ionic oxides.", filter.keep(8, 16, 34, 52, 84)]
                    ],
                    explanation: "Oxygen is the Period 2, Group 16 element between nitrogen and fluorine. It is highly electronegative and commonly forms O²⁻."
                },
                {
                    z: 19,
                    opening: ["Family record", "The element is an alkali metal in Group 1.", filter.keep(3, 11, 19, 37, 55, 87)],
                    evidence: [
                        ["Shell count", "It has four occupied electron shells.", filter.field("period", 4)],
                        ["Atomic-radius trail", "Down Group 1, its atomic radius is larger than sodium's but smaller than rubidium's.", filter.keep(19)],
                        ["Electron file", "Its ground-state configuration ends in 4s¹.", filter.keep(19)]
                    ],
                    explanation: "Potassium is the Period 4 alkali metal. Its [Ar]4s¹ configuration and position below sodium explain its larger atomic radius."
                }
            ]
        },
        {
            title: "The Neighbourhood Case",
            brief: "Read the surrounding addresses: periods, groups and neighbouring elements.",
            mysteries: [
                {
                    z: 14,
                    opening: ["Street map", "The element is in Period 3, between aluminium and phosphorus.", filter.keep(14)],
                    evidence: [
                        ["Vertical address", "Carbon is directly above it in Group 14.", filter.all(filter.field("period", 3), filter.field("group", 14))],
                        ["Valence file", "It has four valence electrons: ns²np².", filter.field("group", 14)],
                        ["Property report", "It is a metalloid widely used as a semiconductor.", filter.keep(14, 32)]
                    ],
                    explanation: "Silicon occupies Period 3, Group 14—between aluminium and phosphorus and directly below carbon."
                },
                {
                    z: 35,
                    opening: ["Street map", "The element is in Period 4, between selenium and krypton.", filter.keep(35)],
                    evidence: [
                        ["Vertical address", "Chlorine is directly above it in Group 17.", filter.all(filter.field("period", 4), filter.field("group", 17))],
                        ["Valence file", "It has seven valence electrons: ns²np⁵.", filter.field("group", 17)],
                        ["Physical report", "It is the only non-metal that is liquid near room temperature.", filter.keep(35)]
                    ],
                    explanation: "Bromine is the Period 4 halogen between selenium and krypton, directly below chlorine."
                }
            ]
        },
        {
            title: "The Master Case",
            brief: "Combine location, configuration and chemical evidence to close the final case.",
            mysteries: [
                {
                    z: 26,
                    opening: ["District report", "The missing element is a Period 4 transition element in the d-block.", filter.all(filter.field("period", 4), filter.field("block", "d"))],
                    evidence: [
                        ["Group address", "It occupies Group 8.", filter.field("group", 8)],
                        ["Electron file", "Its ground-state configuration is [Ar] 3d⁶ 4s².", filter.keep(26)],
                        ["Oxidation record", "Its most common oxidation states are +2 and +3.", filter.keep(26)]
                    ],
                    explanation: "Iron is the Period 4, Group 8 d-block element with configuration [Ar]3d⁶4s² and common +2 and +3 states."
                },
                {
                    z: 29,
                    opening: ["District report", "The missing element is a Period 4 transition element in the d-block.", filter.all(filter.field("period", 4), filter.field("block", "d"))],
                    evidence: [
                        ["Group address", "It occupies Group 11, above silver.", filter.all(filter.field("period", 4), filter.field("group", 11))],
                        ["Electron file", "Its exceptional ground-state configuration is [Ar] 3d¹⁰ 4s¹.", filter.keep(29)],
                        ["Property report", "It is a reddish metal and an excellent conductor used in electrical wiring.", filter.keep(29)]
                    ],
                    explanation: "Copper is the Period 4, Group 11 element above silver. Its stable filled 3d subshell gives [Ar]3d¹⁰4s¹."
                }
            ]
        }
    ];

    const ui = Object.fromEntries([
        "periodicTable", "mapStatus", "tileSizeButton", "caseLabel", "caseTitle", "caseBrief", "caseFileNumber",
        "attemptsValue", "quantaMessage", "evidenceList", "evidenceButtons", "suspectCount", "solvedCount",
        "suspectEmpty", "suspectSelected", "suspectNumber", "suspectSymbol", "suspectName", "suspectAddress",
        "accuseButton", "feedbackModal", "feedbackIcon", "feedbackLabel", "feedbackTitle", "feedbackText",
        "answerReveal", "feedbackContinue", "helpButton", "helpModal", "closeHelp", "finishModal",
        "correctAccusations", "playAgain"
    ].map((id) => [id, document.getElementById(id)]));

    let caseIndex = 0;
    let mystery;
    let candidates = new Set();
    let usedEvidence = new Set();
    let wrongGuesses = new Set();
    let selectedNumber = null;
    let attempts = 3;
    let solved = 0;
    let correctAccusations = 0;
    let continueAction = null;

    function buildTable() {
        for (let group = 1; group <= 18; group += 1) {
            const label = document.createElement("span");
            label.className = "group-label";
            label.textContent = group;
            label.style.gridColumn = group;
            label.style.gridRow = 1;
            ui.periodicTable.append(label);
        }

        [[7, "57–71"], [8, "89–103"]].forEach(([row, text]) => {
            const marker = document.createElement("span");
            marker.className = "series-marker";
            marker.textContent = text;
            marker.style.gridRow = row;
            marker.style.gridColumn = 3;
            ui.periodicTable.append(marker);
        });

        const lanthanideLabel = document.createElement("span");
        lanthanideLabel.className = "series-label";
        lanthanideLabel.textContent = "Lanthanides";
        lanthanideLabel.style.gridRow = 10;
        lanthanideLabel.style.gridColumn = "1 / 4";
        ui.periodicTable.append(lanthanideLabel);

        const actinideLabel = lanthanideLabel.cloneNode(true);
        actinideLabel.textContent = "Actinides";
        actinideLabel.style.gridRow = 11;
        ui.periodicTable.append(actinideLabel);

        elements.forEach((element) => {
            const tile = document.createElement("button");
            tile.type = "button";
            tile.className = `element-tile block-${element.block}`;
            tile.dataset.z = element.z;
            tile.style.gridRow = element.row;
            tile.style.gridColumn = element.col;
            tile.setAttribute("aria-label", `${element.name}, atomic number ${element.z}`);
            tile.innerHTML = `<small class="atomic-number">${element.z}</small><strong class="symbol">${element.symbol}</strong><span class="element-name">${element.name}</span>`;
            tile.addEventListener("click", () => selectSuspect(element.z));
            ui.periodicTable.append(tile);
        });
    }

    function pickMystery(stage) {
        const options = stage.mysteries;
        return options[Math.floor(Math.random() * options.length)];
    }

    function startCase(index) {
        caseIndex = index;
        const stage = cases[caseIndex];
        mystery = pickMystery(stage);
        candidates = new Set(elements.map((element) => element.z));
        usedEvidence = new Set();
        wrongGuesses = new Set();
        selectedNumber = null;
        attempts = 3;

        ui.caseLabel.textContent = `CASE ${caseIndex + 1} OF ${cases.length}`;
        ui.caseTitle.textContent = stage.title;
        ui.caseBrief.textContent = stage.brief;
        ui.caseFileNumber.textContent = `PT–0${caseIndex + 1}`;
        ui.evidenceList.replaceChildren();
        addClue(mystery.opening[0], mystery.opening[1], mystery.opening[2]);
        renderEvidenceButtons();
        updateCaseSteps();
        updateInterface();
        clearSelection();
        ui.quantaMessage.textContent = "I found the first piece of evidence. Watch which tiles remain illuminated.";
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function addClue(label, clue, test) {
        candidates = new Set(elements.filter((element) => candidates.has(element.z) && test(element)).map((element) => element.z));
        const item = document.createElement("li");
        const heading = document.createElement("strong");
        const detail = document.createElement("span");
        heading.textContent = label;
        detail.textContent = clue;
        item.append(heading, detail);
        ui.evidenceList.append(item);
    }

    function renderEvidenceButtons() {
        ui.evidenceButtons.replaceChildren();
        mystery.evidence.forEach(([label, clue, test], index) => {
            const button = document.createElement("button");
            button.type = "button";
            button.className = "evidence-button";
            button.textContent = label;
            button.disabled = usedEvidence.has(index);
            button.addEventListener("click", () => {
                usedEvidence.add(index);
                addClue(label, clue, test);
                renderEvidenceButtons();
                clearSelection();
                updateInterface();
                ui.quantaMessage.textContent = candidates.size === 1
                    ? "Only one suspect remains. Check every clue, then make your accusation."
                    : `${candidates.size} suspects still match. Choose another lead or inspect a tile.`;
            });
            ui.evidenceButtons.append(button);
        });
    }

    function updateInterface() {
        document.querySelectorAll(".element-tile").forEach((tile) => {
            const z = Number(tile.dataset.z);
            const eliminated = !candidates.has(z);
            tile.classList.toggle("eliminated", eliminated);
            tile.classList.toggle("wrong-suspect", wrongGuesses.has(z));
            tile.classList.toggle("selected", selectedNumber === z);
            tile.disabled = eliminated;
        });
        ui.suspectCount.textContent = candidates.size;
        ui.solvedCount.textContent = `${solved} / ${cases.length}`;
        ui.mapStatus.textContent = `${candidates.size} of 118 elements remain possible`;
        ui.attemptsValue.textContent = Array.from({ length: 3 }, (_, index) => index < attempts ? "●" : "○").join(" ");
    }

    function updateCaseSteps() {
        document.querySelectorAll("[data-case-step]").forEach((step) => {
            const index = Number(step.dataset.caseStep);
            step.classList.toggle("active", index === caseIndex);
            step.classList.toggle("complete", index < caseIndex);
        });
    }

    function selectSuspect(z) {
        if (!candidates.has(z)) return;
        selectedNumber = z;
        const element = byNumber.get(z);
        ui.suspectNumber.textContent = element.z;
        ui.suspectSymbol.textContent = element.symbol;
        ui.suspectName.textContent = element.name;
        ui.suspectAddress.textContent = `Period ${element.period} • Group ${element.group} • ${element.block}-block`;
        ui.suspectEmpty.hidden = true;
        ui.suspectSelected.hidden = false;
        updateInterface();
    }

    function clearSelection() {
        selectedNumber = null;
        ui.suspectEmpty.hidden = false;
        ui.suspectSelected.hidden = true;
        updateInterface();
    }

    function comparativeEvidence(guess, answer) {
        const atomicDirection = answer.z > guess.z ? "higher" : "lower";
        let location;
        if (answer.period < guess.period) location = "in a period above your suspect";
        else if (answer.period > guess.period) location = "in a period below your suspect";
        else if (answer.group < guess.group) location = "to the left of your suspect in the same period";
        else location = "to the right of your suspect in the same period";
        return `The missing element has a ${atomicDirection} atomic number and is ${location}.`;
    }

    function makeAccusation() {
        if (selectedNumber === null) return;
        const guess = byNumber.get(selectedNumber);
        const answer = byNumber.get(mystery.z);
        if (guess.z === answer.z) {
            solved += 1;
            correctAccusations += 1;
            showFeedback({
                icon: "✅",
                label: "CASE SOLVED",
                title: `${answer.name} recovered!`,
                text: mystery.explanation,
                reveal: `${answer.z}  ${answer.symbol}  •  Period ${answer.period}, Group ${answer.group}`,
                button: caseIndex === cases.length - 1 ? "View detective result" : "Open next case",
                action: () => {
                    closeModal(ui.feedbackModal);
                    if (caseIndex === cases.length - 1) finishGame();
                    else startCase(caseIndex + 1);
                }
            });
            return;
        }

        attempts -= 1;
        wrongGuesses.add(guess.z);
        candidates.delete(guess.z);
        clearSelection();
        updateInterface();
        if (attempts === 0) {
            showFeedback({
                icon: "📁",
                label: "CASE FILE CLOSED",
                title: `The missing element was ${answer.name}`,
                text: mystery.explanation,
                reveal: `${answer.z}  ${answer.symbol}  •  Period ${answer.period}, Group ${answer.group}`,
                button: "Retry this case",
                action: () => { closeModal(ui.feedbackModal); startCase(caseIndex); }
            });
        } else {
            showFeedback({
                icon: "🔎",
                label: "NEW COMPARATIVE EVIDENCE",
                title: `${guess.name} is not the missing element`,
                text: comparativeEvidence(guess, answer),
                reveal: "",
                button: "Continue investigation",
                action: () => {
                    closeModal(ui.feedbackModal);
                    ui.quantaMessage.textContent = "Use the comparison with your last suspect and re-check the evidence before accusing again.";
                }
            });
        }
    }

    function showFeedback({ icon, label, title, text, reveal, button, action }) {
        ui.feedbackIcon.textContent = icon;
        ui.feedbackLabel.textContent = label;
        ui.feedbackTitle.textContent = title;
        ui.feedbackText.textContent = text;
        ui.answerReveal.textContent = reveal;
        ui.answerReveal.hidden = !reveal;
        ui.feedbackContinue.textContent = button;
        continueAction = action;
        openModal(ui.feedbackModal);
    }

    function finishGame() {
        ui.correctAccusations.textContent = correctAccusations;
        openModal(ui.finishModal);
    }

    function openModal(modal) {
        modal.hidden = false;
        document.body.classList.add("modal-open");
        modal.querySelector("button, a")?.focus();
    }

    function closeModal(modal) {
        modal.hidden = true;
        if (![ui.feedbackModal, ui.helpModal, ui.finishModal].some((item) => !item.hidden)) {
            document.body.classList.remove("modal-open");
        }
    }

    ui.accuseButton.addEventListener("click", makeAccusation);
    ui.feedbackContinue.addEventListener("click", () => continueAction?.());
    ui.helpButton.addEventListener("click", () => openModal(ui.helpModal));
    ui.closeHelp.addEventListener("click", () => closeModal(ui.helpModal));
    ui.tileSizeButton.addEventListener("click", () => {
        const large = ui.periodicTable.classList.toggle("large");
        ui.tileSizeButton.setAttribute("aria-pressed", String(large));
        ui.tileSizeButton.textContent = large ? "Compact tiles" : "Larger tiles";
    });
    ui.playAgain.addEventListener("click", () => {
        closeModal(ui.finishModal);
        solved = 0;
        correctAccusations = 0;
        startCase(0);
    });
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && !ui.helpModal.hidden) closeModal(ui.helpModal);
    });

    buildTable();
    startCase(0);
})();
