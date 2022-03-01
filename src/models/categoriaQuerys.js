module.exports = {
    getCat: `SELECT * FROM categoria`,
    insertCat: 'INSERT INTO categoria (descripcion_categoria) VALUES (?)',
    updateCat: 'UPDATE categoria SET descripcion_categoria=? WHERE idcategoria = ?',
    borrarCat: 'DELETE FROM categoria WHERE idcategoria = ?'
}