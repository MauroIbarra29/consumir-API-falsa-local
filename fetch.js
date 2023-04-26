const d = document
let table = d.querySelector('.crud-table')
let form = d.querySelector('.crud-form')
let title = d.querySelector('.crud-title')
let template = d.querySelector('.crud-template').content
let fragment = d.createDocumentFragment()

d.addEventListener('DOMContentLoaded',getAll);

async function getAll(){
    try {
        let response = await fetch('http://localhost:3000/santos');
        let json = await response.json();
        if(!response.ok) throw {status: response.status, statusText: response.statusText};
        json.forEach((elem =>{
            //Cargo los objetos
            template.querySelector('.template-name').textContent = elem.nombre 
            template.querySelector('.template-constellation').textContent = elem.constelacion
            template.querySelector('.template-edit');
            //DataAtributtes
            template.querySelector('.template-edit').dataset.id = elem.id
            template.querySelector('.template-edit').dataset.name = elem.nombre
            template.querySelector('.template-edit').dataset.constellation = elem.constelacion
            template.querySelector('.template-delete').dataset.id = elem.id

            let clone = d.importNode(template, true);
            fragment.appendChild(clone)
        }));

        table.querySelector('tbody').appendChild(fragment)

    } catch (err) {
        let message = err.statusText || "Ocurrió un error";
        table.insertAdjacentHTML('afterend',`<p><b>Error: ${err.status}: ${err.message}</b></p>`)
    }
}

d.addEventListener('submit', async e=> {
    if(e.target === form){
        e.preventDefault();
        //Metodo POST
        if(!e.target.id.value){
            try {
                let options = {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json; charset=utf-8"
                    },
                    body: JSON.stringify({
                        nombre: e.target.name.value,
                        constelacion: e.target.constellation.value 
                    })};
                let response = await fetch(`http://localhost:3000/santos/`,options);
                let json = await response.json();
                if(!response.ok) throw {status: response.status, statusText: response.statusText};
                location.reload()

            } catch (err) {
                let message = err.statusText || "Ocurrió un error";
                form.insertAdjacentHTML('afterend',`<p><b>Error: ${err.status}: ${err.message}</b></p>`)
            }
         //Update - PUT
        }else{
            try {
                let options = {
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json; charset=utf-8"
                    },
                    body: JSON.stringify({
                        nombre: e.target.name.value,
                        constelacion: e.target.constellation.value 
                    })};
                let response = await fetch(`http://localhost:3000/santos/${e.target.id.value}`,options);
                let json = await response.json();
                if(!response.ok) throw {status: response.status, statusText: response.statusText};

            } catch (err) {
                let message = err.statusText || "Ocurrió un error";
                form.insertAdjacentHTML('afterend',`<p><b>Error: ${err.status}: ${err.message}</b></p>`)
            }
        }
    }
})

d.addEventListener('click', async e =>{
    //Boton Editar
    if(e.target.matches('.template-edit')){
        form.name.value = e.target.dataset.name
        form.constellation.value = e.target.dataset.constellation
        form.id.value = e.target.dataset.id
    }
    //Boton Delete
    if(e.target.matches('.template-delete')){
        let isDelete = confirm(`Estas seguro que deseas eliminar el id ${e.target.dataset.id}? `);

        if(isDelete){
            console.log(e.target.dataset.id);
            try {
                let options = {
                    method: 'DELETE',
                    headers: {"Content-Type": "application/json; charset=utf-8"}
                }
                let response = await fetch(`http://localhost:3000/santos/${e.target.dataset.id}`,options);
                let json = await response.json();
                if(!response.ok) throw {status: response.status, statusText: response.statusText};

            } catch (err) {
                let message = err.statusText || "Ocurrió un error";
                form.insertAdjacentHTML('afterend',`<p><b>Error: ${err.status}: ${err.message}</b></p>`)
            }
        }
    }
});