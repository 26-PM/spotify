async  function main(){
    let a=await fetch("https://fantastic-space-trout-9v5prj447r527w69-5500.app.github.dev/songs ")
    let response= await a.text();
    console.log(response)
}
main();