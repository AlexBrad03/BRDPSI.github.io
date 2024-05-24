//#region Configurația Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDoEnwRcEmuoqRNwL4dreIZ1ETpwUMpf8c",
    authDomain: "psi-brd.firebaseapp.com",
    projectId: "psi-brd",
    storageBucket: "psi-brd.appspot.com",
    messagingSenderId: "93242273300",
    appId: "1:93242273300:web:1ebe983e824e49fd8b4101",
    measurementId: "G-SY234NP33D"
};


// Inițializarea Firebase
const app = firebase.initializeApp(firebaseConfig);
const analytics = firebase.analytics();
const db = firebase.firestore();
//#endregion Configurația Firebase


//#region Depresie
// Întrebările pentru testul de depresie
const questions = [
    "Simți că nu mai poți să te bucuri de lucrurile care altădată îți plăceau?",
    "Ai avut dificultăți în a dormi sau ai avut un somn neodihnitor în ultima vreme?",
    "Simți o lipsă de energie sau o stare constantă de oboseală?",
    "Ai observat o schimbare semnificativă în greutatea ta în ultima vreme (creștere sau scădere)?",
    "Te simți lipsit de speranță sau deznădăjduit în privința viitorului?",
    "Ai avut gânduri sau idei despre a face rău propriei persoane?",
    "Ai observat o scădere a interesului sau a plăcerii în activitățile pe care obișnuiai să le apreciezi?",
    "Ai simțit o dificultate în concentrare sau luarea deciziilor?",
    "Te-ai simțit inutil sau lipsit de valoare în ultima vreme?",
    "Ai avut schimbări de comportament sau de dispoziție care au fost observate de ceilalți din jurul tău?"
];

// Generarea întrebărilor pe pagină
window.addEventListener('DOMContentLoaded', function() {
    const questionsContainer = document.getElementById("questionsContainerDepression");
    if (questionsContainer) {
        generateQuestions();
    }
});

function generateQuestions() {
    const questionsContainer = document.getElementById("questionsContainerDepression");
    if (!questionsContainer) {
        return; // Verificăm din nou dacă containerul există
    }
    
    questions.forEach((question, index) => {
        const div = document.createElement("div");
        div.innerHTML = `
        <p>${question}</p>
        <input type="radio" id="q${index}a" name="q${index}" value="a" required>
        <label for="q${index}a">Da</label>
        <input type="radio" id="q${index}b" name="q${index}" value="b" required>
        <label for="q${index}b">Uneori</label>
        <input type="radio" id="q${index}c" name="q${index}" value="c" required>
        <label for="q${index}c">Nu</label>
    `;
        questionsContainer.appendChild(div);
    });
}

// Calcularea rezultatului testului de depresie
function calculateDepressionResult(answers) {
    let score = 0;

    for (const key in answers) {
        if (answers[key] === 'a') {
            score += 2; // 'Da' are o valoare de 2 puncte
        } else if (answers[key] === 'b') {
            score += 1; // 'Uneori' are o valoare de 1 punct
        }
    }

    if (score >= 15) {
        return "Depresie Severă";
    } else if (score >= 10) {
        return "Depresie moderată";
    } else if (score >= 5) {
        return "Depresie ușoară";
    } else {
        return "Fără Depresie";
    }
}

// Funcția pentru trimiterea testului
function submitTest() {
    const form = document.getElementById("depressionTest");
    const formData = new FormData(form);
    const name = formData.get("name");
    const prename = formData.get("prename");
    const age = formData.get("age");
    const answers = {};

    for (const [key, value] of formData.entries()) {
        if (key !== "name" && key !== "prename" && key !== "age") {
            answers[key] = value;
        }
    }

    const result = calculateDepressionResult(answers);

    // Actualizează elementul testResult
    const testResultDiv = document.getElementById("testResult");
    testResultDiv.textContent = "Rezultatul tău este: " + result;

    saveDataToFirestore(name, prename, age, answers, result);
}

// Funcția pentru salvarea datelor în Firestore
async function saveDataToFirestore(name, prename, age, answers, result) {
    try {
        await db.collection("test_results").add({
            name: name,
            prename: prename,
            age: age,
            answers: answers,
            result: result
        });
        alert("Testul a fost trimis cu succes! Rezultatul tău este: " + result);
    } catch (error) {
        console.error("A apărut o eroare în timpul trimiterii testului:", error);
        alert("A apărut o eroare în timpul trimiterii testului.");
    }
}



//#endregion Depresie


//#region Anxietate
const questions1 = [
    "Simți o senzație constantă de neliniște sau frică?",
    "Ai dificultăți în controlul temerilor tale?",
    "Te simți ușurat(o) doar după ce scapi de o situație stresantă?",
    "Ai avut palpitații sau bătăi rapide ale inimii fără un motiv aparent?",
    "Ai senzația de sufocare sau dificultăți în respirație?",
    "Te confrunți cu tulburări de somn, cum ar fi insomniea sau coșmarurile frecvente?",
    "Ai dificultăți în concentrare din cauza preocupărilor tale?",
    "Ai experimentat senzații de tremur sau amețeli în mod frecvent?",
    "Te-ai simțit că nu poți scăpa de gânduri negative sau îngrijorări persistente?",
    "Ai observat schimbări bruște în greutatea corporală sau în apetitul tău alimentar din cauza anxietății?"
];

window.addEventListener('DOMContentLoaded', function() {
    const questionsContainer1 = document.getElementById("questionsContainer1");
    if (questionsContainer1) {
        generateQuestions1();
    }
});

function generateQuestions1() {
    const questionsContainer1 = document.getElementById("questionsContainer1");
    if (!questionsContainer1) {
        return;
    }
    
    questions1.forEach((question, index) => {
        const div = document.createElement("div");
        div.innerHTML = `
        <p>${question}</p>
        <input type="radio" id="q1${index}a" name="q1${index}" value="a" required>
        <label for="q1${index}a">Da</label>
        <input type="radio" id="q1${index}b" name="q1${index}" value="b" required>
        <label for="q1${index}b">Uneori</label>
        <input type="radio" id="q1${index}c" name="q1${index}" value="c" required>
        <label for="q1${index}c">Nu</label>
    `;
        questionsContainer1.appendChild(div);
    });
}

function calculateAnxietyResult(answers) {
    let score = 0;

    for (const key in answers) {
        if (answers[key] === 'a') {
            score += 2; 
        } else if (answers[key] === 'b') {
            score += 1; 
        }
    }

    if (score >= 15) {
        return "Anxietate severă";
    } else if (score >= 10) {
        return "Anxietate moderată";
    } else if (score >= 5) {
        return "Anxietate ușoară";
    } else {
        return "Fără anxietate";
    }
}

function submitTest1() {
    const form = document.getElementById("anxietyTest");
    const formData = new FormData(form);
    const name = formData.get("name");
    const prename = formData.get("prename");
    const age = formData.get("age");
    const answers = {};

    for (const [key, value] of formData.entries()) {
        if (key !== "name" && key !== "prename" && key !== "age") {
            answers[key] = value;
        }
    }

    const result1 = calculateAnxietyResult(answers);

    const testResult1 = document.getElementById("testResultAnxiety");
    testResult1.textContent = "Rezultatul tău este: " + result1;
    saveDataToFirestore(name, prename, age, answers, result1);
}
//#endregion Anxietate


//#region Schizofrenie
const questions2 = [
    "Ai auzit voci care nu pot fi atribuite unei surse externe?",
    "Ai avut senzația că gândurile tale sunt controlate de o forță exterioară?",
    "Ai avut vreodată iluzii sau halucinații vizuale?",
    "Ai simțit vreodată că ești urmărit sau că cineva îți pune la cale ceva?",
    "Ai avut dificultăți în menținerea unei conexiuni logice între gânduri?",
    "Ai avut perioade în care ai avut o activitate anormală în ceea ce privește crearea sau credința în lucruri care nu sunt reale?",
    "Ai avut vreodată sentimente puternice de paranoia?",
    "Ai avut dificultăți în relațiile sociale din cauza unor credințe neobișnuite sau a comportamentului ciudat?",
    "Ai avut perioade în care ai simțit că ești deosebit de special sau că ai puteri sau abilități speciale?",
    "Ai avut dificultăți în menținerea concentrării sau a atenției pentru perioade lungi de timp?"
];

window.addEventListener('DOMContentLoaded', function() {
    const questionsContainer2 = document.getElementById("questions2");
    if (questionsContainer2) {
        generateQuestions2();
    }
});

function generateQuestions2() {
    const questionsContainer2 = document.getElementById("questions2");
    if (!questionsContainer2) {
        return;
    }
    
    questions2.forEach((question, index) => {
        const div = document.createElement("div");
        div.innerHTML = `
        <p>${question}</p>
        <input type="radio" id="q2${index}a" name="q2${index}" value="a" required>
        <label for="q2${index}a">Da</label>
        <input type="radio" id="q2${index}b" name="q2${index}" value="b" required>
        <label for="q2${index}b">Uneori</label>
        <input type="radio" id="q2${index}c" name="q2${index}" value="c" required>
        <label for="q2${index}c">Nu</label>
    `;
        questionsContainer2.appendChild(div);
    });
}

function calculateSchizophreniaResult(answers) {
    let score = 0;

    for (const key in answers) {
        if (answers[key] === 'a') {
            score += 2; 
        } else if (answers[key] === 'b') {
            score += 1; 
        }
    }

    if (score >= 15) {
        return "Schizofrenie severă";
    } else if (score >= 10) {
        return "Schizofrenie moderată";
    } else if (score >= 5) {
        return "Schizofrenie ușoară";
    } else {
        return "Fără schizofrenie";
    }
}

function submitTest2() {
    const form = document.getElementById("schizofrenyTest");
    const formData = new FormData(form);
    const name = formData.get("name");
    const prename = formData.get("prename");
    const age = formData.get("age");
    const answers = {};

    for (const [key, value] of formData.entries()) {
        if (key !== "name" && key !== "prename" && key !== "age") {
            answers[key] = value;
        }
    }

    const result2 = calculateSchizophreniaResult(answers);

    const testResult2 = document.getElementById("testResultSchizophrenia");
    testResult2.textContent = "Rezultatul tău este: " + result2;

    saveDataToFirestore(name, prename, age, answers, result2);
}
//#endregion


//#region TDP
const questions3 = [
    "Ai avut dificultăți în menținerea relațiilor stabile și de lungă durată?",
    "Ai avut schimbări bruște și intense în dispoziție, fără un motiv evident?",
    "Te simți deseori izolat sau exclus din societate?",
    "Ai avut perioade în care ai simțit că nu ai o identitate clară sau un scop în viață?",
    "Te confrunți frecvent cu sentimente intense de furie sau iritabilitate?",
    "Ai tendința de a vedea lucrurile în termeni extremi, ca alb-negru, fără nuanțe de gri?",
    "Ai avut comportamente riscante, cum ar fi cheltuieli excesive, abuz de substanțe sau comportament sexual imprudent?",
    "Ai experimentat sentimente persistente de neîncredere față de ceilalți, crezând că au intenții ascunse?",
    "Te simți deseori nesigur în privința propriilor abilități și ai nevoie constantă de aprobare și laude din partea altora?",
    "Ai avut gânduri repetitive și intruzive despre a fi trădat sau abandonat de cei apropiați?"
];

window.addEventListener('DOMContentLoaded', function() {
    const questionsContainer3 = document.getElementById("questions3");
    if (questionsContainer3) {
        generateQuestions3();
    }
});

function generateQuestions3() {
    const questionsContainer3 = document.getElementById("questions3");
    if (!questionsContainer3) {
        return;
    }
    
    questions3.forEach((question, index) => {
        const div = document.createElement("div");
        div.innerHTML = `
        <p>${question}</p>
        <input type="radio" id="q3${index}a" name="q3${index}" value="a" required>
        <label for="q3${index}a">Da</label>
        <input type="radio" id="q3${index}b" name="q3${index}" value="b" required>
        <label for="q3${index}b">Uneori</label>
        <input type="radio" id="q3${index}c" name="q3${index}" value="c" required>
        <label for="q3${index}c">Nu</label>
    `;
        questionsContainer3.appendChild(div);
    });
}

function calculateTDPResult(answers) {
    let score = 0;

    for (const key in answers) {
        if (answers[key] === 'a') {
            score += 2; 
        } else if (answers[key] === 'b') {
            score += 1; 
        }
    }

    if (score >= 15) {
        return "Tulburare de personalitate dependentă severă";
    } else if (score >= 10) {
        return "Tulburare de personalitate dependentă moderată";
    } else if (score >= 5) {
        return "Tulburare de personalitate dependentă ușoară";
    } else {
        return "Fără tulburare de personalitate dependentă";
    }
}

function submitTest3() {
    const form = document.getElementById("tdpTest");
    const formData = new FormData(form);
    const name = formData.get("name");
    const prename = formData.get("prename");
    const age = formData.get("age");
    const answers = {};

    for (const [key, value] of formData.entries()) {
        if (key !== "name" && key !== "prename" && key !== "age") {
            answers[key] = value;
        }
    }

    const result3 = calculateTDPResult(answers);

    const testResult3 = document.getElementById("testResultTDP");
    testResult3.textContent = "Rezultatul tău este: " + result3;

    saveDataToFirestore(name, prename, age, answers, result3);
}

//#endregion


//#region Bipolaritate
const questions4 = [
    "Ai avut perioade în care te-ai simțit extrem de fericit și plin de energie, chiar și fără un motiv evident?",
    "Ai avut perioade în care te-ai simțit extrem de trist și lipsit de energie, fără un motiv evident?",
    "Ai avut schimbări bruște de dispoziție, trecând de la o stare de euforie la una de depresie în decurs de câteva zile sau săptămâni?",
    "Ai avut perioade în care ai fost foarte iritabil sau agitat?",
    "Ai avut perioade în care ai avut un comportament imprudent sau riscant?",
    "Ai avut dificultăți în a dormi sau ai dormit prea mult în timpul acestor perioade de schimbări de dispoziție?",
    "Ai avut perioade în care ai fost foarte vorbăreț sau ai simțit nevoia să vorbești mult?",
    "Ai avut dificultăți în a-ți concentra gândurile sau a te organiza în timpul acestor perioade?",
    "Ai avut perioade în care ai avut gânduri de grandoare sau ai crezut că ai abilități speciale?",
    "Ai avut dificultăți în menținerea relațiilor din cauza acestor schimbări de dispoziție?"
];

window.addEventListener('DOMContentLoaded', function() {
    const questionsContainer4 = document.getElementById("questions4");
    if (questionsContainer4) {
        generateQuestions4();
    }
});

function generateQuestions4() {
    const questionsContainer4 = document.getElementById("questions4");
    if (!questionsContainer4) {
        return;
    }
    
    questions4.forEach((question, index) => {
        const div = document.createElement("div");
        div.innerHTML = `
        <p>${question}</p>
        <input type="radio" id="q4${index}a" name="q4${index}" value="a" required>
        <label for="q4${index}a">Da</label>
        <input type="radio" id="q4${index}b" name="q4${index}" value="b" required>
        <label for="q4${index}b">Uneori</label>
        <input type="radio" id="q4${index}c" name="q4${index}" value="c" required>
        <label for="q4${index}c">Nu</label>
    `;
        questionsContainer4.appendChild(div);
    });
}

function calculateBipolarResult(answers) {
    let score = 0;

    for (const key in answers) {
        if (answers[key] === 'a') {
            score += 2; 
        } else if (answers[key] === 'b') {
            score += 1; 
        }
    }

    if (score >= 15) {
        return "Bipolaritate severă";
    } else if (score >= 10) {
        return "Bipolaritate moderată";
    } else if (score >= 5) {
        return "Bipolaritate ușoară";
    } else {
        return "Fără bipolaritate";
    }
}

function submitTest4() {
    const form = document.getElementById("bipolarityTest");
    const formData = new FormData(form);
    const name = formData.get("name");
    const prename = formData.get("prename");
    const age = formData.get("age");
    const answers = {};

    for (const [key, value] of formData.entries()) {
        if (key !== "name" && key !== "prename" && key !== "age") {
            answers[key] = value;
        }
    }

    const result4 = calculateBipolarResult(answers);

    const testResult4 = document.getElementById("testResultBipolarity");
    testResult4.textContent = "Rezultatul tău este: " + result4;

    saveDataToFirestore(name, prename, age, answers, result4);
}
//#endregion


//#region TOC
const questions5 = [
    "Ai gânduri intruzive sau obsesive care sunt greu de controlat?",
    "Ai comportamente repetitive pe care simți că trebuie să le faci pentru a reduce anxietatea?",
    "Ai petrecut o cantitate semnificativă de timp în fiecare zi realizând ritualuri sau verificări?",
    "Ai evitat anumite situații sau obiecte de teamă că vei avea gânduri obsesive?",
    "Ai simțit nevoia să păstrezi lucrurile într-o anumită ordine sau simetrie?",
    "Ai avut gânduri sau imagini mentale violente, indecente sau înfricoșătoare?",
    "Ai avut dificultăți în a te concentra pe activitățile zilnice din cauza acestor gânduri sau comportamente?",
    "Ai repetat anumite cuvinte, fraze sau rugăciuni pentru a-ți reduce anxietatea?",
    "Ai avut ritualuri complexe de spălare a mâinilor sau curățenie?",
    "Ai avut dificultăți în a împărtăși aceste gânduri sau comportamente cu alții din cauza rușinii sau fricii de judecată?"
];

window.addEventListener('DOMContentLoaded', function() {
    const questionsContainer5 = document.getElementById("questions5");
    if (questionsContainer5) {
        generateQuestions5();
    }
});

function generateQuestions5() {
    const questionsContainer5 = document.getElementById("questions5");
    if (!questionsContainer5) {
        return;
    }
    
    questions5.forEach((question, index) => {
        const div = document.createElement("div");
        div.innerHTML = `
        <p>${question}</p>
        <input type="radio" id="q5${index}a" name="q5${index}" value="a" required>
        <label for="q5${index}a">Da</label>
        <input type="radio" id="q5${index}b" name="q5${index}" value="b" required>
        <label for="q5${index}b">Uneori</label>
        <input type="radio" id="q5${index}c" name="q5${index}" value="c" required>
        <label for="q5${index}c">Nu</label>
    `;
        questionsContainer5.appendChild(div);
    });
}

function calculateOCDResult(answers) {
    let score = 0;

    for (const key in answers) {
        if (answers[key] === 'a') {
            score += 2; 
        } else if (answers[key] === 'b') {
            score += 1; 
        }
    }

    if (score >= 15) {
        return "Tulburare obsesiv-compulsivă severă";
    } else if (score >= 10) {
        return "Tulburare obsesiv-compulsivă moderată";
    } else if (score >= 5) {
        return "Tulburare obsesiv-compulsivă ușoară";
    } else {
        return "Fără tulburare obsesiv-compulsivă";
    }
}

function submitTest5() {
    const form = document.getElementById("tocTest");
    const formData = new FormData(form);
    const name = formData.get("name");
    const prename = formData.get("prename");
    const age = formData.get("age");
    const answers = {};

    for (const [key, value] of formData.entries()) {
        if (key !== "name" && key !== "prename" && key !== "age") {
            answers[key] = value;
        }
    }

    const result5 = calculateOCDResult(answers);

    const testResult5 = document.getElementById("testResultOCD");
    testResult5.textContent = "Rezultatul tău este: " + result5;

    saveDataToFirestore(name, prename, age, answers, result5);
}

//#endregion
