(function () {
    "use strict";

    const rooms = [
        {
            title: "Rutherford’s Chamber",
            objective: "Use experimental evidence to locate the hidden structure of the atom.",
            emblem: "α",
            sceneClass: "room-rutherford",
            positions: ["top", "right", "bottom", "left"],
            tiers: [
                [
                    { type: "choice", question: "Most α-particles crossed the gold foil, a few were deflected and very few rebounded. Which model best explains all three observations?", options: ["Positive charge spread uniformly throughout the atom", "A tiny, dense, positively charged nucleus surrounded by mostly empty space", "Electrons packed tightly inside a large nucleus"], correct: 1, explanation: "A small dense nucleus explains the rare strong deflections, while mostly empty space explains why most α-particles passed through." },
                    { type: "choice", question: "Which conclusion follows specifically from the very small number of α-particles that rebounded?", options: ["The atom has no positive charge", "Nearly all the mass and positive charge occupy a very small volume", "Electrons are heavier than the nucleus"], correct: 1, explanation: "Only a concentrated, massive, positive centre could reverse the motion of a fast positive α-particle." },
                    { type: "sequence", question: "Arrange the reasoning from observation to conclusion.", items: ["Most α-particles pass through", "Very few rebound", "Most of the atom is empty space", "Positive charge is concentrated in a tiny nucleus"], correct: ["Most α-particles pass through", "Most of the atom is empty space", "Very few rebound", "Positive charge is concentrated in a tiny nucleus"], explanation: "Rutherford connected the common straight paths with empty space and the rare rebounds with a tiny concentrated nucleus." }
                ],
                [
                    { type: "input", question: "Complete Rutherford’s conclusion: Most of the volume of an atom is ______.", answers: ["empty", "empty space", "mostly empty", "mostly empty space"], placeholder: "Type one or two words", explanation: "The large majority of α-particles passed through the foil without deflection, showing that most atomic volume is empty space." },
                    { type: "choice", question: "Why were positively charged α-particles deflected when they passed close to the nucleus?", options: ["Like charges repel each other", "Opposite charges repel each other", "The electrons pulled them backwards"], correct: 0, explanation: "Both the α-particle and nucleus are positively charged, so electrostatic repulsion changes the particle’s path." },
                    { type: "choice", question: "Which part of the atom contains almost all of its mass?", options: ["The electron cloud", "The nucleus", "The empty space between shells"], correct: 1, explanation: "Protons and neutrons are in the nucleus and account for nearly all atomic mass." }
                ],
                [
                    { type: "choice", question: "Match the particle with its charge.", options: ["Electron: negative", "Electron: positive", "Electron: neutral"], correct: 0, explanation: "An electron carries one unit of negative charge." },
                    { type: "input", question: "Name the positively charged particle found inside the nucleus.", answers: ["proton", "a proton"], placeholder: "Particle name", explanation: "The proton carries positive charge and is located in the nucleus." },
                    { type: "choice", question: "Where are electrons found in the atomic model?", options: ["Outside the nucleus", "Inside protons", "Only at the centre of the nucleus"], correct: 0, explanation: "Electrons occupy the region surrounding the nucleus." }
                ],
                [
                    { type: "choice", question: "What is the charge of the nucleus?", options: ["Positive", "Negative", "Always zero"], correct: 0, explanation: "The nucleus is positive because it contains positively charged protons." },
                    { type: "input", question: "Fill the blank: The central part of an atom is called the ______.", answers: ["nucleus", "the nucleus"], placeholder: "One word", explanation: "The nucleus is the small central region containing protons and neutrons." },
                    { type: "choice", question: "Which scientist performed the gold-foil scattering experiment?", options: ["Rutherford", "Bohr", "Planck"], correct: 0, explanation: "Rutherford interpreted the α-particle scattering experiment to propose the nuclear model." }
                ]
            ]
        },
        {
            title: "Bohr’s Energy Tower",
            objective: "Control electron transitions and decode the light released or absorbed.",
            emblem: "hν",
            sceneClass: "room-bohr",
            positions: ["top", "right", "left"],
            tiers: [
                [
                    { type: "input", question: "For hydrogen, Eₙ = −13.6/n² eV. Calculate the energy of the n = 2 level in eV.", answers: ["-3.4", "−3.4", "-3.40", "−3.40", "-3.4 ev", "−3.4 ev"], placeholder: "Energy in eV", explanation: "E₂ = −13.6/2² = −13.6/4 = −3.4 eV." },
                    { type: "choice", question: "A hydrogen electron falls from n = 4 to n = 2. Identify both the process and the spectral series.", options: ["Absorption, Lyman", "Emission, Balmer", "Emission, Paschen"], correct: 1, explanation: "A downward transition emits a photon. Every transition ending at n = 2 belongs to the Balmer series." },
                    { type: "choice", question: "Which transition releases the highest-energy photon?", options: ["n = 2 → 1", "n = 3 → 2", "n = 4 → 3"], correct: 0, explanation: "Hydrogen levels are farthest apart close to the nucleus, making the 2 → 1 energy gap the largest here." }
                ],
                [
                    { type: "sequence", question: "Arrange these hydrogen states in increasing order of energy.", items: ["n = 3", "n = 1", "n = 2"], correct: ["n = 1", "n = 2", "n = 3"], explanation: "Energy increases as the principal quantum number n increases." },
                    { type: "input", question: "An electron moves from n = 2 to n = 5. Is the photon absorbed or emitted?", answers: ["absorbed", "absorption", "it is absorbed", "photon is absorbed"], placeholder: "Absorbed or emitted?", explanation: "Moving to a higher level requires energy, so the atom absorbs a photon." },
                    { type: "choice", question: "A transition ends at n = 1. Which series is produced?", options: ["Lyman", "Balmer", "Paschen"], correct: 0, explanation: "All hydrogen transitions terminating at n = 1 form the Lyman series." }
                ],
                [
                    { type: "choice", question: "What happens when an electron drops to a lower permitted energy level?", options: ["It emits a photon", "It absorbs a photon", "Its charge changes"], correct: 0, explanation: "The lost energy leaves the atom as a photon." },
                    { type: "choice", question: "Which move requires the electron to absorb energy?", options: ["n = 3 → 2", "n = 2 → 4", "n = 2 → 1"], correct: 1, explanation: "The 2 → 4 move takes the electron to a higher-energy state, so energy must be absorbed." },
                    { type: "input", question: "Fill the blank: The Balmer series contains transitions that end at n = __.", answers: ["2", "n=2", "n = 2", "two"], placeholder: "Final level", explanation: "The common final level for the Balmer series is n = 2." }
                ]
            ]
        },
        {
            title: "Quantum Vault",
            objective: "Verify quantum addresses before the vault removes another exit.",
            emblem: "ψ",
            sceneClass: "room-quantum",
            positions: ["right", "left"],
            tiers: [
                [
                    { type: "choice", question: "Which complete set of quantum numbers is allowed?", options: ["(2, 2, 0, +½)", "(3, 1, −1, −½)", "(1, 0, +1, +½)"], correct: 1, explanation: "For n = 3, l = 1 is allowed; mₗ may be −1, 0 or +1, and mₛ may be ±½." },
                    { type: "input", question: "An electron has n = 4 and l = 2. Type the orbital designation.", answers: ["4d", "4 d"], placeholder: "For example: 3p", explanation: "n = 4 gives the shell number and l = 2 denotes a d subshell, so the designation is 4d." },
                    { type: "sequence", question: "Arrange these subshells in increasing (n + l) value. Break a tie using the lower n first.", items: ["3d", "4s", "3p"], correct: ["3p", "4s", "3d"], explanation: "Their (n+l) values are 4, 4 and 5. The 3p–4s tie is resolved by the lower n, giving 3p < 4s < 3d." }
                ],
                [
                    { type: "choice", question: "How many orbitals are present in a p subshell?", options: ["2", "3", "6"], correct: 1, explanation: "For l = 1, mₗ has the three values −1, 0 and +1, representing three orbitals." },
                    { type: "input", question: "For an s orbital, what is the value of the azimuthal quantum number l?", answers: ["0", "zero", "l=0", "l = 0"], placeholder: "Value of l", explanation: "The subshell mapping begins s = 0, p = 1, d = 2 and f = 3." },
                    { type: "choice", question: "Which two values are permitted for the spin quantum number mₛ?", options: ["0 and 1", "+½ and −½", "+1 and −1"], correct: 1, explanation: "Electron spin has only the two allowed orientations +½ and −½." }
                ]
            ]
        },
        {
            title: "Configuration Gate",
            objective: "Build one final orbital pattern using Aufbau, Hund and Pauli rules.",
            emblem: "↿⇂",
            sceneClass: "room-config",
            positions: ["top"],
            tiers: [
                [
                    { type: "orbital", question: "Carbon has 2p². Build its ground-state 2p orbital pattern.", electrons: 2, target: [1,1,0], explanation: "Hund’s rule places the two electrons singly with parallel spins in separate 2p orbitals." },
                    { type: "orbital", question: "Nitrogen has 2p³. Build its ground-state 2p orbital pattern.", electrons: 3, target: [1,1,1], explanation: "Each of the three degenerate 2p orbitals receives one electron with parallel spin before pairing." },
                    { type: "orbital", question: "Oxygen has 2p⁴. Build its ground-state 2p orbital pattern.", electrons: 4, target: [2,1,1], explanation: "Three electrons first occupy separate orbitals; the fourth pairs in one orbital with opposite spin." },
                    { type: "orbital", question: "Fluorine has 2p⁵. Build its ground-state 2p orbital pattern.", electrons: 5, target: [2,2,1], explanation: "Two 2p orbitals contain pairs while the third contains one unpaired electron." },
                    { type: "orbital", question: "Boron has 2p¹. Build its ground-state 2p orbital pattern.", electrons: 1, target: [1,0,0], explanation: "Boron’s single 2p electron occupies one of the three equivalent p orbitals." }
                ]
            ]
        }
    ];

    const $ = id => document.getElementById(id);
    const elements = {
        roomCounter: $("roomCounter"), shieldStatus: $("shieldStatus"), clueCounter: $("clueCounter"),
        roomLabel: $("roomLabel"), roomTitle: $("roomTitle"), roomObjective: $("roomObjective"),
        roomScene: $("roomScene"), roomEmblem: $("roomEmblem"), attemptsLeft: $("attemptsLeft"),
        quanta: $("quanta"), speech: $("quantaSpeech"), questionDialog: $("questionDialog"),
        challengeLevel: $("challengeLevel"), questionText: $("questionText"), answerArea: $("answerArea"),
        feedback: $("questionFeedback"), submit: $("submitAnswer"), continueButton: $("continueButton"),
        cancel: $("cancelDoor"), dialogDoorMark: $("dialogDoorMark"), result: $("resultScreen")
    };

    const zoneIds = { top: "doorTop", right: "doorRight", bottom: "doorBottom", left: "doorLeft" };
    const numberWords = ["ONE", "TWO", "THREE", "FOUR"];
    let roomIndex = 0;
    let attemptIndex = 0;
    let sealed = new Set();
    let currentDoor = null;
    let currentQuestion = null;
    let selectedChoice = null;
    let sequenceSelection = [];
    let orbitalState = [0,0,0];
    let shieldCharge = 0;
    let shieldReady = false;
    let clues = 0;
    let soundOn = true;
    let continueAction = null;

    function sample(list) { return list[Math.floor(Math.random() * list.length)]; }
    function normalize(value) {
        return String(value).trim().toLowerCase().replace(/−/g, "-").replace(/\s+/g, " ").replace(/[.,]$/g, "");
    }
    function playTone(frequency, duration, type) {
        if (!soundOn) return;
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            const context = new AudioContext();
            const oscillator = context.createOscillator();
            const gain = context.createGain();
            oscillator.type = type || "sine";
            oscillator.frequency.value = frequency;
            gain.gain.setValueAtTime(.05, context.currentTime);
            gain.gain.exponentialRampToValueAtTime(.001, context.currentTime + duration);
            oscillator.connect(gain).connect(context.destination);
            oscillator.start();
            oscillator.stop(context.currentTime + duration);
        } catch (_) { /* Sound is optional. */ }
    }

    function updateStatus() {
        elements.roomCounter.textContent = `${Math.min(roomIndex + 1, 4)} / 4`;
        elements.shieldStatus.textContent = shieldReady ? "READY" : `${shieldCharge} / 2`;
        elements.clueCounter.textContent = clues;
        document.querySelectorAll(".path-step").forEach((step, index) => {
            step.classList.toggle("active", index === roomIndex);
            step.classList.toggle("complete", index < roomIndex);
            if (index < roomIndex) step.querySelector("span").textContent = "✓";
            else step.querySelector("span").textContent = index + 1;
        });
    }

    function makeDoor(position, index) {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "door";
        button.dataset.position = position;
        button.dataset.door = index;
        button.setAttribute("aria-label", `Try door ${String.fromCharCode(65 + index)}`);
        button.innerHTML = `<span class="door-letter">${String.fromCharCode(65 + index)}</span><span class="lock-label">LOCKED</span>`;
        if (sealed.has(index)) {
            button.classList.add("sealed");
            button.disabled = true;
            button.querySelector(".lock-label").textContent = "SEALED";
        }
        button.addEventListener("click", () => openChallenge(button));
        return button;
    }

    function renderRoom() {
        const room = rooms[roomIndex];
        attemptIndex = Math.min(attemptIndex, room.positions.length - 1);
        currentQuestion = null;
        elements.roomCounter.textContent = `${roomIndex + 1} / 4`;
        elements.roomLabel.textContent = `ROOM ${roomIndex + 1} • ${numberWords[room.positions.length - 1]} POSSIBLE ${room.positions.length === 1 ? "EXIT" : "EXITS"}`;
        elements.roomTitle.textContent = room.title;
        elements.roomObjective.textContent = room.objective;
        elements.roomEmblem.textContent = room.emblem;
        elements.roomScene.className = `room-scene ${room.sceneClass}`;
        elements.quanta.className = "quanta";
        elements.speech.textContent = roomIndex === 3 ? "One gate. Trust what you’ve learned!" : "Choose any door. I’ll scan the lock!";
        room.positions.forEach((position, index) => {
            const zone = $(zoneIds[position]);
            zone.innerHTML = "";
            zone.appendChild(makeDoor(position, index));
        });
        Object.keys(zoneIds).filter(position => !room.positions.includes(position)).forEach(position => { $(zoneIds[position]).innerHTML = ""; });
        elements.attemptsLeft.textContent = room.positions.length - sealed.size;
        updateStatus();
    }

    function questionForAttempt() {
        const tiers = rooms[roomIndex].tiers;
        return sample(tiers[Math.min(attemptIndex, tiers.length - 1)]);
    }

    function openChallenge(door) {
        currentDoor = door;
        if (!currentQuestion) currentQuestion = questionForAttempt();
        selectedChoice = null;
        sequenceSelection = [];
        orbitalState = [0,0,0];
        elements.dialogDoorMark.textContent = String.fromCharCode(65 + Number(door.dataset.door));
        const labels = ["CHALLENGE LOCK", "GUIDED LOCK", "SUPPORT LOCK", "FOUNDATION LOCK"];
        elements.challengeLevel.textContent = labels[Math.min(attemptIndex, labels.length - 1)];
        elements.questionText.textContent = currentQuestion.question;
        elements.feedback.className = "question-feedback";
        elements.feedback.textContent = "";
        elements.submit.hidden = false;
        elements.submit.disabled = false;
        elements.continueButton.hidden = true;
        elements.cancel.hidden = false;
        renderAnswerControl();
        elements.questionDialog.hidden = false;
        const firstControl = elements.answerArea.querySelector("button, input");
        if (firstControl) firstControl.focus();
    }

    function renderAnswerControl() {
        elements.answerArea.innerHTML = "";
        if (currentQuestion.type === "choice") {
            const list = document.createElement("div");
            list.className = "choice-list";
            currentQuestion.options.forEach((option, index) => {
                const button = document.createElement("button");
                button.type = "button";
                button.className = "choice-option";
                button.textContent = option;
                button.addEventListener("click", () => {
                    selectedChoice = index;
                    list.querySelectorAll("button").forEach(item => item.classList.remove("selected"));
                    button.classList.add("selected");
                });
                list.appendChild(button);
            });
            elements.answerArea.appendChild(list);
        } else if (currentQuestion.type === "input") {
            const input = document.createElement("input");
            input.id = "textResponse";
            input.className = "text-answer";
            input.type = "text";
            input.autocomplete = "off";
            input.placeholder = currentQuestion.placeholder || "Type your answer";
            input.setAttribute("aria-label", "Your answer");
            input.addEventListener("keydown", event => { if (event.key === "Enter") elements.submit.click(); });
            elements.answerArea.appendChild(input);
            const help = document.createElement("p");
            help.className = "answer-help";
            help.textContent = "Spelling and capital letters are not graded.";
            elements.answerArea.appendChild(help);
        } else if (currentQuestion.type === "sequence") {
            const answer = document.createElement("div");
            answer.className = "sequence-answer";
            answer.id = "sequenceAnswer";
            answer.textContent = "Select the first step…";
            const bank = document.createElement("div");
            bank.className = "sequence-bank";
            currentQuestion.items.forEach(item => {
                const button = document.createElement("button");
                button.type = "button";
                button.className = "sequence-token";
                button.textContent = item;
                button.addEventListener("click", () => {
                    if (sequenceSelection.length === 0) answer.textContent = "";
                    sequenceSelection.push(item);
                    const chosen = document.createElement("span");
                    chosen.className = "sequence-token";
                    chosen.textContent = `${sequenceSelection.length}. ${item}`;
                    answer.appendChild(chosen);
                    button.disabled = true;
                });
                bank.appendChild(button);
            });
            const reset = document.createElement("button");
            reset.type = "button";
            reset.className = "secondary-button";
            reset.textContent = "Reset order";
            reset.addEventListener("click", () => {
                sequenceSelection = [];
                renderAnswerControl();
            });
            elements.answerArea.append(answer, bank, reset);
        } else if (currentQuestion.type === "orbital") {
            const builder = document.createElement("div");
            builder.className = "orbital-builder";
            orbitalState.forEach((_, index) => {
                const button = document.createElement("button");
                button.type = "button";
                button.className = "orbital-box";
                button.setAttribute("aria-label", `Orbital ${index + 1}, empty. Tap to add electrons.`);
                button.addEventListener("click", () => {
                    orbitalState[index] = (orbitalState[index] + 1) % 3;
                    updateOrbitalBoxes(builder);
                });
                builder.appendChild(button);
            });
            elements.answerArea.appendChild(builder);
            const help = document.createElement("p");
            help.className = "answer-help";
            help.textContent = `Tap each orbital box to cycle: empty → ↑ → ↑↓. Place ${currentQuestion.electrons} electron${currentQuestion.electrons === 1 ? "" : "s"}.`;
            elements.answerArea.appendChild(help);
            updateOrbitalBoxes(builder);
        }
    }

    function updateOrbitalBoxes(builder) {
        const symbols = ["", "↑", "↑↓"];
        [...builder.querySelectorAll(".orbital-box")].forEach((button, index) => {
            button.textContent = symbols[orbitalState[index]];
            button.setAttribute("aria-label", `Orbital ${index + 1}: ${orbitalState[index] === 0 ? "empty" : orbitalState[index] === 1 ? "one electron" : "two opposite-spin electrons"}`);
        });
    }

    function isCorrect() {
        if (currentQuestion.type === "choice") return selectedChoice === currentQuestion.correct;
        if (currentQuestion.type === "input") {
            const input = $("textResponse");
            return input && currentQuestion.answers.map(normalize).includes(normalize(input.value));
        }
        if (currentQuestion.type === "sequence") return JSON.stringify(sequenceSelection) === JSON.stringify(currentQuestion.correct);
        if (currentQuestion.type === "orbital") {
            const actual = [...orbitalState].sort((a,b) => b-a);
            const target = [...currentQuestion.target].sort((a,b) => b-a);
            return JSON.stringify(actual) === JSON.stringify(target);
        }
        return false;
    }

    function lockAnswerControls() {
        elements.answerArea.querySelectorAll("button, input").forEach(control => { control.disabled = true; });
        elements.submit.hidden = true;
        elements.cancel.hidden = true;
        elements.continueButton.hidden = false;
    }

    function submitAnswer() {
        const answered = currentQuestion.type === "choice" ? selectedChoice !== null
            : currentQuestion.type === "input" ? Boolean($("textResponse")?.value.trim())
            : currentQuestion.type === "sequence" ? sequenceSelection.length === currentQuestion.items.length
            : orbitalState.reduce((sum,value) => sum + value, 0) > 0;
        if (!answered) {
            elements.feedback.textContent = "Complete the challenge before checking the lock.";
            elements.feedback.className = "question-feedback bad";
            return;
        }

        if (isCorrect()) handleCorrect();
        else handleWrong();
    }

    function handleCorrect() {
        playTone(660,.12,"sine");
        setTimeout(() => playTone(880,.18,"sine"),110);
        clues += 1;
        if (attemptIndex === 0 && !shieldReady) {
            shieldCharge = Math.min(2, shieldCharge + 1);
            if (shieldCharge === 2) shieldReady = true;
        }
        currentDoor.classList.add("open");
        currentDoor.querySelector(".lock-label").textContent = "OPEN";
        elements.feedback.innerHTML = `<strong>Door unlocked!</strong> ${currentQuestion.explanation}${attemptIndex === 0 && shieldReady ? " <strong>Your Energy Shield is now ready.</strong>" : ""}`;
        elements.feedback.className = "question-feedback good";
        elements.continueButton.textContent = roomIndex === rooms.length - 1 ? "Escape the facility" : "Enter the next room";
        continueAction = advanceRoom;
        lockAnswerControls();
        updateStatus();
    }

    function handleWrong() {
        playTone(180,.22,"square");
        if (roomIndex === rooms.length - 1 && shieldReady) {
            shieldReady = false;
            shieldCharge = 0;
            attemptIndex = 1;
            elements.feedback.innerHTML = `<strong>The answer did not open the gate—but your Energy Shield activated.</strong> ${currentQuestion.explanation} The gate will generate one replacement challenge.`;
            elements.feedback.className = "question-feedback bad";
            elements.continueButton.textContent = "Use shield and retry";
            continueAction = () => {
                closeQuestion();
                currentQuestion = null;
                elements.speech.textContent = "Shield used. The final lock has reset!";
                updateStatus();
            };
            lockAnswerControls();
            updateStatus();
            return;
        }

        const doorNumber = Number(currentDoor.dataset.door);
        sealed.add(doorNumber);
        currentDoor.classList.add("sealed");
        currentDoor.querySelector(".lock-label").textContent = "SEALED";
        currentDoor.disabled = true;
        attemptIndex += 1;
        elements.feedback.innerHTML = `<strong>This door is now sealed.</strong> ${currentQuestion.explanation}`;
        elements.feedback.className = "question-feedback bad";
        lockAnswerControls();
        updateStatus();

        if (sealed.size >= rooms[roomIndex].positions.length) {
            elements.continueButton.textContent = "View mission result";
            continueAction = () => showResult(false);
        } else {
            elements.continueButton.textContent = "Try another door";
            continueAction = () => {
                closeQuestion();
                currentQuestion = null;
                elements.attemptsLeft.textContent = rooms[roomIndex].positions.length - sealed.size;
                elements.speech.textContent = "That route is sealed. Another lock may be easier to decode.";
            };
        }
    }

    function closeQuestion() {
        elements.questionDialog.hidden = true;
        if (currentDoor && !currentDoor.disabled) currentDoor.focus();
    }

    function advanceRoom() {
        closeQuestion();
        const direction = currentDoor.dataset.position;
        elements.speech.textContent = "Door open—moving forward!";
        elements.quanta.classList.add(`move-${direction}`);
        const delay = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 50 : 850;
        setTimeout(() => {
            if (roomIndex === rooms.length - 1) {
                showResult(true);
                return;
            }
            roomIndex += 1;
            attemptIndex = 0;
            sealed = new Set();
            currentDoor = null;
            currentQuestion = null;
            renderRoom();
        }, delay);
    }

    function showResult(won) {
        elements.questionDialog.hidden = true;
        $("resultIcon").textContent = won ? "🌤️" : "🔒";
        $("resultLabel").textContent = won ? "MISSION COMPLETE" : "MISSION INCOMPLETE";
        $("resultTitle").textContent = won ? "Quanta escaped!" : "The room is sealed—for now.";
        $("resultMessage").textContent = won
            ? "You connected experimental evidence, energy levels, quantum numbers and electron-filling rules to reach the outside."
            : "Review the explanation from the final lock you tried, then replay. New questions will create a different route through the facility.";
        $("roomsCleared").textContent = won ? 4 : roomIndex;
        $("finalClues").textContent = clues;
        $("finalShield").textContent = shieldReady ? "Ready" : shieldCharge ? `${shieldCharge}/2` : "Used / empty";
        elements.result.hidden = false;
        $("restartGame").focus();
    }

    function restart() {
        roomIndex = 0;
        attemptIndex = 0;
        sealed = new Set();
        currentDoor = null;
        currentQuestion = null;
        shieldCharge = 0;
        shieldReady = false;
        clues = 0;
        elements.result.hidden = true;
        renderRoom();
    }

    elements.submit.addEventListener("click", submitAnswer);
    elements.cancel.addEventListener("click", closeQuestion);
    elements.continueButton.addEventListener("click", () => { if (continueAction) continueAction(); });
    $("howToPlay").addEventListener("click", () => { $("instructionsDialog").hidden = false; $("closeInstructions").focus(); });
    $("closeInstructions").addEventListener("click", () => { $("instructionsDialog").hidden = true; });
    $("restartGame").addEventListener("click", restart);
    $("soundToggle").addEventListener("click", event => {
        soundOn = !soundOn;
        event.currentTarget.setAttribute("aria-pressed", String(soundOn));
        event.currentTarget.textContent = soundOn ? "🔊 Sound on" : "🔇 Sound off";
    });
    document.addEventListener("keydown", event => {
        if (event.key !== "Escape") return;
        if (!$("instructionsDialog").hidden) $("instructionsDialog").hidden = true;
        else if (!elements.questionDialog.hidden && !elements.cancel.hidden) closeQuestion();
    });

    renderRoom();
}());
