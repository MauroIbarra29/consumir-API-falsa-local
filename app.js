const d = document
let table = d.querySelector('.crud-table')
let form = d.querySelector('.crud-form')
let title = d.querySelector('.crud-title')
let template = d.querySelector('.crud-template').content
let fragment = d.createDocumentFragment()

function ajax(options){
        let {url, method, success, error, data} = options;  
        let req = new XMLHttpRequest();

        req.addEventListener('readystatechange', (e)=>{
            if(req.readyState !=4){ // 4 == Done
                return 
            }
            if(req.status >= 200 && req.status < 300){
                let json = JSON.parse(req.responseText);
                success(json)
            }else{
                let message = req.statusText || "Ocurrio un error"
                error(message)
            }
        });

        req.open(method || "GET",url);
        req.setRequestHeader("Content-Type", "application/json;charset=utf-8")
        req.send(JSON.stringify(data));

}
function getAll(){
    ajax({
            method: "GET",
            url: "http://localhost:3000/santos",
            success: (res)=>{
                res.forEach((elem)=>{
                    template.querySelector('.template-name').textContent = elem.nombre 
                    template.querySelector('.template-constellation').textContent = elem.constelacion
                    template.querySelector('.template-edit')

                    template.querySelector('.template-edit').dataset.id = elem.id
                    template.querySelector('.template-edit').dataset.name = elem.nombre
                    template.querySelector('.template-edit').dataset.constellation = elem.constelacion

                    template.querySelector('.template-delete').dataset.id = elem.id

                    let clone = d.importNode(template,true)
                    fragment.appendChild(clone)
                })
                table.querySelector('tbody').appendChild(fragment)
            },
            error: (err)=>{
                table.insertAdjacentHTML("afterend", `<p>${err}</p>`)
                },
            data: null
    });

}
d.addEventListener('DOMContentLoaded',getAll);
d.addEventListener('submit', e=> {
    if(e.target === form){
        e.preventDefault();

        if(!e.target.id.value){
            //POST
            ajax({
                url: "http://localhost:3000/santos",
                method: "POST",
                success: (res)=>{
                    location.reload();
                },
                error: ()=>{
                    form.insertAdjacentHTML("afterend", `<p>${err}</p>`) 
                },
                data: {
                    nombre: e.target.name.value,
                    constelacion: e.target.constellation.value
                }
            })
        }else{
            //PUT
        }
    }
})
d.addEventListener('click', e =>{
    if(e.target.matches('.template-edit')){
        form.name.value = e.target.dataset.name
        form.constellation.value = e.target.dataset.constellation
        form.id.value = e.target.dataset.id
    }
    if(e.target.matches('.template-delete')){
        console.log('Presionaste el eliminar');
    }
})
