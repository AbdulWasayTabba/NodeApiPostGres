const CountdepLink ="https://reimagined-carnival-pj947jqj6rjx26xrp-5005.app.github.dev/totaldepartment"

fetch(CountdepLink).then(response=>{
    if(!response.ok){
        throw new Error("Failed to Fetch Data");
    }
    return response.json();
}).then(data=>{
    const tbody = document.querySelector("#departmenttable tbody");

    data.forEach(c=>{
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${c.count}</td>
        `;
        tbody.appendChild(row);
    })
}).catch(err=>{
    console.log(err.message);
})