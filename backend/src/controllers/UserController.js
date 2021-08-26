const connection = require('../database/connection');
module.exports = {
  async index(request, response) {
    const user_id = request.headers.authorization;
    const cases = await connection('users')
      .where('id', parseInt(user_id))
      .select(
        'users.name', 
        'users.email', 
        'users.whatsapp', 
        'users.login', 
        'users.password', 
        );
      //.select('*');

    return response.json(cases);
  },

  async create(request, response) {

    try{
      const { name, login, password, email, whatsapp, city, uf, type } =
      request.body;

      const user = await connection('users').insert({
        name,
        login,
        password,
        email,
        whatsapp,
        city,
        uf,
        type,
      });
      
    return response.json({ login });
    //return response.status(200).send('Successfully registered user');
    }catch(e){
      return response.status(500).send(error);
    }
    
  },

  async update(request, response){
    try {
      const {name, login, password, email, whatsapp, city, uf} = request.body;
      const { id } = request.params;
      const user_id = request.headers.authorization;

       if (id != user_id) {
         return response.status(401).json({ error: 'Operation not permitted' });
       }


      await connection('users').where({id}).update({name, email, whatsapp, password})
      return response.status(204).send();

      // const user = await connection('users')
      //   .update({name, login, password, email, whatsapp, city, uf})
      //   .where({ id })
        
       // console.log(user)
      if(user > 0){
        return response.status(204).send();
      }
      return response.status(401).json({ error: 'Operation not permitted' });
      
    } catch (error) {
      return response.status(500).send(error);
    }
  },

  async delete(request, response) {
    try {
      const { id } = request.params;
      const user = await connection('users')
        .where({ id })
        .delete();
        
        //console.log(user)
      if(user > 0){
        return response.status(204).send();
      }
      return response.status(401).json({ error: 'Operation not permitted' });
      
    } catch (error) {
      return response.status(500).send(error);
    }
  },
};
