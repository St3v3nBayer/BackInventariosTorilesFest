module.exports = {
    getProveedores: `SELECT * FROM proveedor`,
    insertProveedor: 'INSERT INTO proveedor (nombre_proveedor, marca_proveedor) VALUES (?, ?)',
    updateProveedor: 'UPDATE proveedor SET nombre_proveedor=?, marca_proveedor=? WHERE idproveedor = ?',
    borrarProveedor: 'DELETE FROM proveedor WHERE idproveedor = ?'
}