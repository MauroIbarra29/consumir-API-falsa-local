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
                    template.querySelector('.template-constelation').textContent = elem.constelacion 
                    template.querySelector('.template-edit')

                    template.querySelector('.template-edit').dataset.id = elem.id
                    template.querySelector('.template-edit').dataset.name = elem.name
                    template.querySelector('.template-edit').dataset.constelation = elem.constelation

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

