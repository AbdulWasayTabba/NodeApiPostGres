const Link ="https://reimagined-carnival-pj947jqj6rjx26xrp-5005.app.github.dev/job_history"

fetch(Link).then(response=>{
    if(!response.ok){
        throw new Error("Failed to Fetch Data");
    }
    return response.json();
}).then(data=>{
    const tbody = document.querySelector("#job_historytable tbody");

    data.forEach(jh=>{
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${jh.employee_id}</td>
        <td>${jh.start_date}</td>
        <td>${jh.end_date}</td>
        <td>${jh.job_id}</td>
         <td>${jh.department_id}</td>
      
     
    `;
        tbody.appendChild(row);
    })
}).catch(err=>{
    console.log(err.message);
})