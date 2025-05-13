const Link ="https://reimagined-carnival-pj947jqj6rjx26xrp-5005.app.github.dev/department"

fetch(Link).then(response=>{
    if(!response.ok){
        throw new Error("Failed to Fetch Data");
    }
    return response.json();
}).then(data=>{
    const tbody = document.querySelector("#departmenttable tbody");

    data.forEach(d=>{
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${d.department_id}</td>
        <td>${d.department_name}</td>
        <td>${d.manager_id  }</td>
        <td>${d.location_id}</td>
     
    `;
        tbody.appendChild(row);
    })
}).catch(err=>{
    console.log(err.message);
})