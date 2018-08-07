
var tabelEl = document.getElementById("table");


function getData(){
fetch("https://api.github.com/users/izaanjahangir/followers")
.then((res)=>{
    return res.json()
})
.then((myRes)=>{
    if(myRes.length === 0){
        renderDataOnDom("No Followers" , "No Followers")
        return false
    }
    console.log("Data from Api = " , myRes);
    tabelEl.innerHTML = ""
    for(var i =0 ; i < myRes.length; i++){
        renderDataOnDom(myRes[i].login , myRes[i].id)
    }   
})



caches.match('https://api.github.com/users/izaanjahangir/followers')
.then((res)=>{
    if(!res){
        console.log("data Not Found")
    }    
    return res.json()  
    })
    .then((myData)=>{
        if(myData.length === 0){
            renderDataOnDom("No Followers" , "No Followers")
            return false
        }    
        console.log("Data From Cache = " , myData);
        tabelEl.innerHTML = ""
        for(var i =0 ; i < myData.length; i++){
            renderDataOnDom(myData[i].login , myData[i].id)
        }   
})
    .catch(()=>{
        console.log("error");
        
    })
}


function renderDataOnDom(loginName , id){
    tabelEl.innerHTML += `
        <tr>
            <td>${loginName}</td>
            <td>${id}</td>
        </tr>
    `

}

if("serviceWorker" in navigator){
    navigator.serviceWorker
    .register("/sw.js")
    .then(()=>{
        console.log("/Service Worker Registered Successfully");        
    })
    
}