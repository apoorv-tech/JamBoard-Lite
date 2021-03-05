const dashboard = document.querySelector("#dashboard-form")
console.log(dashboard)
dashboard.addEventListener("submit",async(e)=>{
    e.preventDefault()
    const name = dashboard.name.value
    console.log(name)
    location.assign('/dashboard/new?name='+name)
})