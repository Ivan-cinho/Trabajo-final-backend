var pool=require('./bd');

async function getAgenda(){
        var query='select * from agenda';
        var rows=await pool.query(query);
        return rows;
}

/* agregar evento */

async function insertEvento(abj){
    try{
        var query='insert into agenda set ?';
        var rows=await pool.query(query, [abj]);
        return rows;
    } catch(error){
        console.log(error);
        throw error;
    }
}

/* eliminar evento */

async function deleteAgenda(id){
    var query='delete from agenda where id = ?';
    var rows=await pool.query(query, [id]);
    return rows;
}

/* editar evento */

async function getAgendaById(id){
    var query='select * from agenda where id = ?';
    var rows=await pool.query(query, [id]);
    return rows[0];
}

async function editarAgendaById(obj, id){
    try{
        var query='update agenda set ? where id=?';
        var rows=await pool.query(query, [obj, id]);
        return rows;
    } catch(error){
        throw error;
    }
}



module.exports={getAgenda, insertEvento, deleteAgenda, getAgendaById, editarAgendaById}