function toTitleCase(str) {
      return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase();
      });
    }

    function cleanOptionText(text) {
      return text
        .replace(/,?\s*would you rather\s*/gi, '')
        .replace(/would you rather,?\s*/gi, '')
        .trim();
    }

    async function loadQuestion() {
      try {
        const response = await fetch("https://api.truthordarebot.xyz/api/wyr");
        const data = await response.json();

        let questionText = data.question.replace(/^Would you rather\s*/i, '');
        let options = questionText.split(/\s+or\s+/i);

        if (options.length < 2) {
          options = [questionText, "Can't decide"];
        }

        options = options.map(opt => cleanOptionText(opt));

        document.getElementById("option1").textContent = toTitleCase(options[0].trim());
        document.getElementById("option2").textContent = toTitleCase(options[1].trim().replace(/\?$/, ''));

      } catch (error) {
        document.getElementById("option1").textContent = "Error Loading Option 1";
        document.getElementById("option2").textContent = "Error Loading Option 2";
        console.error("API load error:", error);
      }
    }

    document.getElementById("option1").addEventListener("click", loadQuestion);
    document.getElementById("option2").addEventListener("click", loadQuestion);

    window.onload = loadQuestion;