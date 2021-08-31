const URL = 'https://jsonplaceholder.typicode.com/users';
class Proveedor {
    constructor(datos){
        this.nombre = datos.name;
        this.email = datos.email;
        this.direccion = datos.address.street;
        this.telefono = datos.phone;
        this.empresa = datos.company.name;
        this.website = datos.website;
    }
}

function crearFilaProveedor(proveedor){
    return $(`
        <tr>
            <td>
                ${proveedor.nombre}
            </td>
            <td>
                ${proveedor.empresa}
            </td>
            <td>
                ${proveedor.email}
            </td>
            <td>
                ${proveedor.telefono}
            </td>
            <td>
                ${proveedor.direccion}
            </td>
            <td>
                <a href="${proveedor.website}" target="_blank">${proveedor.website}</a>
            </td>
        </tr>
    `)
}

$( document ).ready(function() {
    const tabla_body = $('#body-tabla-proveedores');
    $.get(URL, (res) => {
        res.forEach(item => {
            const proveedor = new Proveedor(item);
            tabla_body.append(
                crearFilaProveedor(proveedor)
            )
        })
    });
});

