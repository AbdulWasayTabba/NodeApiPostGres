const Link ="https://reimagined-carnival-pj947jqj6rjx26xrp-5005.app.github.dev/job"

fetch(Link).then(response=>{
    if(!response.ok){
        throw new Error("Failed to Fetch Data");
    }
    return response.json();
}).then(data=>{
    const tbody = document.querySelector("#jobtable tbody");

    data.forEach(j=>{
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${j.job_id}</td>
        <td>${j.job_title}</td>
        <td>${j.min_salary}</td>
        <td>${jh.max_salary}</td>
      
      
     
    `;
        tbody.appendChild(row);
    })
}).catch(err=>{
    console.log(err.message);
})