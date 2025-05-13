const regionLink ="https://reimagined-carnival-pj947jqj6rjx26xrp-5005.app.github.dev/region"

fetch(regionLink).then(response=>{
    if(!response.ok){
        throw new Error("Failed to Fetch Data");
    }
    return response.json();
}).then(data=>{
    const tbody = document.querySelector("#regiontable tbody");

    data.forEach(r=>{
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${r.region_id}</td>
        <td>${r.region_name}</td>
  
    `;
        tbody.appendChild(row);
    })
}).catch(err=>{
    console.log(err.message);
})