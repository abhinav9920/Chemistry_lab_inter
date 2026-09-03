(function () {
    "use strict";

    const data = window.PUZZLE_DATA;
    if (!data || !Array.isArray(data.challenges)) return;

    const key = `chemistry-puzzles-${data.slug}`;
    const saved = readProgress();
    let active = Math.max(0, data.challenges.findIndex(item => item.id === location.hash.slice(1)));
    let round = 0;
    let challengeScore = 0;
    let totalXP = saved.totalXP || 0;
    let streak = 0;
    let attempts = 0;
    let hintUsed = false;
    let locked = false;

    const el = {
        tabs: document.getElementById("challengePicker"),
        xp: document.getElementById("xpValue"),
        streak: document.getElementById("streakValue"),
        mastery: document.getElementById("masteryValue"),
        round: document.getElementById("roundValue"),
        progress: document.getElementById("progressFill"),
        label: document.getElementById("missionLabel"),
        question: document.getElementById("questionText"),
        clue: document.getElementById("clueText"),
        answers: document.getElementById("answers"),
        feedback: document.getElementById("feedback"),
        hint: document.getElementById("hintBox"),
        hintButton: document.getElementById("hintButton"),
        nextButton: document.getElementById("nextButton"),
        goals: document.getElementById("goalList"),
        playArea: document.getElementById("playArea")
    };

    function readProgress() {
        try { return JSON.parse(localStorage.getItem(key)) || { stars: {}, totalXP: 0 }; }
        catch (_) { return { stars: {}, totalXP: 0 }; }
    }

    function saveProgress() {
        localStorage.setItem(key, JSON.stringify({ stars: saved.stars || {}, totalXP }));
    }

    function starsText(count) {
        return "★".repeat(count) + "☆".repeat(3 - count);
    }

    function renderTabs() {
        el.tabs.innerHTML = "";
        data.challenges.forEach((challenge, index) => {
            const button = document.createElement("button");
            button.className = "challenge-tab";
            button.type = "button";
            button.setAttribute("role", "tab");
            button.setAttribute("aria-selected", String(index === active));
            button.innerHTML = `<span class="tab-icon">${challenge.icon}</span><strong>${challenge.title}</strong><small>${challenge.summary}</small><span class="tab-stars" aria-label="${saved.stars?.[challenge.id] || 0} of 3 stars">${starsText(saved.stars?.[challenge.id] || 0)}</span>`;
            button.addEventListener("click", () => startChallenge(index));
            el.tabs.appendChild(button);
        });
        updateScoreboard();
    }

    function updateScoreboard() {
        const starValues = Object.values(saved.stars || {});
        const earned = starValues.reduce((sum, value) => sum + value, 0);
        el.xp.textContent = totalXP;
        el.streak.textContent = streak;
        el.mastery.textContent = `${earned}/${data.challenges.length * 3}`;
        document.getElementById("topProgress").textContent = `${earned} mastery stars earned`;
    }

    function startChallenge(index) {
        active = index;
        history.replaceState(null, "", `#${data.challenges[index].id}`);
        round = 0;
        challengeScore = 0;
        streak = 0;
        renderTabs();
        renderRound();
    }

    function renderRound() {
        const challenge = data.challenges[active];
        const item = challenge.rounds[round];
        attempts = 0;
        hintUsed = false;
        locked = false;
        el.round.textContent = `Round ${round + 1} of ${challenge.rounds.length}`;
        el.progress.style.width = `${((round + 1) / challenge.rounds.length) * 100}%`;
        el.label.textContent = challenge.title;
        el.question.innerHTML = item.question;
        el.clue.innerHTML = item.clue;
        el.hint.textContent = item.hint;
        el.hint.className = "hint-box";
        el.feedback.className = "feedback";
        el.feedback.textContent = "";
        el.nextButton.disabled = true;
        el.nextButton.textContent = round === challenge.rounds.length - 1 ? "See results" : "Next mission";
        el.hintButton.disabled = false;
        el.goals.innerHTML = challenge.goals.map(goal => `<li>${goal}</li>`).join("");
        el.answers.innerHTML = "";

        item.answers.forEach((answer, index) => {
            const button = document.createElement("button");
            button.type = "button";
            button.className = "answer";
            button.innerHTML = answer;
            button.addEventListener("click", () => checkAnswer(button, index));
            el.answers.appendChild(button);
        });
    }

    function checkAnswer(button, answerIndex) {
        if (locked) return;
        const item = data.challenges[active].rounds[round];
        attempts += 1;
        if (answerIndex === item.correct) {
            locked = true;
            button.classList.add("correct");
            el.answers.querySelectorAll("button").forEach(choice => { choice.disabled = true; });
            const gained = Math.max(25, 100 - (attempts - 1) * 20 - (hintUsed ? 25 : 0));
            challengeScore += gained;
            totalXP += gained;
            streak += 1;
            el.feedback.innerHTML = `<strong>Lock opened! +${gained} XP.</strong> ${item.explanation}`;
            el.feedback.className = "feedback show good";
            el.nextButton.disabled = false;
            el.hintButton.disabled = true;
            saveProgress();
        } else {
            button.classList.add("wrong");
            button.disabled = true;
            streak = 0;
            el.feedback.innerHTML = "<strong>Not yet.</strong> Recheck the clue and try another answer.";
            el.feedback.className = "feedback show try";
        }
        updateScoreboard();
    }

    function finishChallenge() {
        const challenge = data.challenges[active];
        const possible = challenge.rounds.length * 100;
        const stars = challengeScore >= possible * .82 ? 3 : challengeScore >= possible * .60 ? 2 : 1;
        saved.stars = saved.stars || {};
        saved.stars[challenge.id] = Math.max(saved.stars[challenge.id] || 0, stars);
        saveProgress();
        renderTabs();
        el.playArea.innerHTML = `<div class="finish"><div class="finish-stars">${starsText(stars)}</div><h2>${challenge.title} complete</h2><p>You earned ${challengeScore} XP in this attempt. Open every lock with fewer hints to reach three stars.</p><div class="actions" style="justify-content:center"><button class="btn btn-primary" id="retryButton" type="button">Retry challenge</button><button class="btn btn-secondary" id="nextChallengeButton" type="button">Try another challenge</button></div></div>`;
        document.getElementById("retryButton").addEventListener("click", () => location.reload());
        document.getElementById("nextChallengeButton").addEventListener("click", () => {
            location.hash = data.challenges[(active + 1) % data.challenges.length].id;
            location.reload();
        });
    }

    el.hintButton.addEventListener("click", () => {
        hintUsed = true;
        el.hint.classList.add("show");
        el.hintButton.disabled = true;
    });

    el.nextButton.addEventListener("click", () => {
        const last = data.challenges[active].rounds.length - 1;
        if (round >= last) finishChallenge();
        else { round += 1; renderRound(); }
    });

    document.getElementById("resetProgress").addEventListener("click", () => {
        if (!window.confirm("Reset all mastery stars and XP for this chapter?")) return;
        localStorage.removeItem(key);
        location.reload();
    });

    renderTabs();
    renderRound();
}());
