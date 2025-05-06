window.addEventListener("load", () => {
    const setupMultiplicand = document.querySelector("select#setup--multiplicand");
    const previousSection = document.querySelector("section#previous");
    const challengeSection = document.querySelector("section#challenge");
    const challengeMultiplicand = document.querySelector("span#challenge--multiplicand");
    const challengeMultiplier = document.querySelector("span#challenge--multiplier");
    const challengeProduct = document.querySelector("input#challenge--product");

    const createSetupMultiplicandSelectOptions = () => {
        Array(10).fill(null).forEach((_, idx) => {
            const option = document.createElement("option");
            option.value = option.text = idx + 1;
            setupMultiplicand.append(option);
        });
    };

    const addSetupMultiplicandChangeListener = () => {
        setupMultiplicand.addEventListener("change", event => {
            challengeSection.classList.remove("hidden");
            challengeMultiplicand.textContent = event.target.value;
            createChallenge();
        });
    };

    const createChallenge = () => {
        challengeMultiplier.textContent = Math.floor(Math.random() * 11);
        challengeProduct.value = "";
        challengeProduct.focus();
    };

    const addChallengeSubmitListener = () => {
        challengeProduct.addEventListener("keydown", event => {
            alert(event.code);
            previousSection.textContent = event.code;
            if (event.code === "Enter") {
                submitChallenge();
            }
        });
    };

    const submitChallenge = () => {
        if (challengeProduct.value === "") {
            return;
        }

        const multiplicand = +challengeMultiplicand.textContent;
        const multiplier = +challengeMultiplier.textContent;
        const product = +challengeProduct.value;

        const isCorrect = multiplicand * multiplier === product;

        const previous = document.createElement("article");
        previous.textContent = `${multiplicand} * ${multiplier} = ${product}`;
        previous.className = isCorrect ? "right" : "wrong";

        previousSection.append(previous);
        createChallenge();
    };

    createSetupMultiplicandSelectOptions();
    addSetupMultiplicandChangeListener();
    addChallengeSubmitListener();
});
