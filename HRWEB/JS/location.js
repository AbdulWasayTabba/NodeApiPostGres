const locLink ="https://reimagined-carnival-pj947jqj6rjx26xrp-5005.app.github.dev/location"

fetch(locLink).then(response=>{
    if(!response.ok){
        throw new Error("Failed to Fetch Data");
    }
    return response.json();
}).then(data=>{
    const tbody = document.querySelector("#locationtable tbody");

    data.forEach(l=>{
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${l.location_id}</td>
        <td>${l.street_address}</td>
        <td>${l.postal_code}</td>
        <td>${l.city}</td>
         <td>${l.state_province}</td>
          <td>${l.country_id}</td>
     
    `;
        tbody.appendChild(row);
    })
}).catch(err=>{
    console.log(err.message);
})