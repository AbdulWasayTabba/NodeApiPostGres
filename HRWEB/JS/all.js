  const allLink = "https://reimagined-carnival-pj947jqj6rjx26xrp-5005.app.github.dev/assign1";

    fetch(allLink)
      .then(response => response.json())
      .then(data => {
        const container = document.getElementById("Count");
        const counts = data[0];

        for (let key in counts) {
          const Box = document.createElement("div");
          Box.className = "box";
          Box.innerHTML = key + "<br><strong>" + counts[key] + "</strong>";
          container.appendChild(Box);
        }
      })
      .catch(error => {
        console.log("Error:", error.message);
      });