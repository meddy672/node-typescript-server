import express, { Router, Request, Response } from 'express';

import { Car, cars as cars_list } from './cars';

(async () => {
  let cars:Car[]  = cars_list;

  const app = express(); 
  const port = 8082; 
  
  //use middleware so post bodies 
  //are accessable as req.body.{{variable}}
  app.use(express.json()); 

  // Root URI call
  app.get( "/", ( req: Request, res: Response ) => {
    res.status(200).send("Welcome to the Cloud!");
  } );

  app.get( "/persons/:name", 
    ( req: Request, res: Response ) => {
      let { name } = req.params;

      if ( !name ) {
        return res.status(400)
                  .send(`name is required`);
      }

      return res.status(200)
                .send(`Welcome to the Cloud, ${name}!`);
  } );


  app.get( "/persons/", ( req: Request, res: Response ) => {
    let { name } = req.query;

    if ( !name ) {
      return res.status(400)
                .send(`name is required`);
    }

    return res.status(200)
              .send(`Welcome to the Cloud, ${name}!`);
  } );


  app.post( "/persons", 
    async ( req: Request, res: Response ) => {

      const { name } = req.body;

      if ( !name ) {
        return res.status(400)
                  .send(`name is required`);
      }

      return res.status(200)
                .send(`Welcome to the Cloud, ${name}!`);
  } );

  app.get('/cars',  (req: Request, res: Response) => {
    res.status(200).json({ cars: cars });
  })

  app.get('/cars/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const car = cars.find(car => car.id === id);
    if (car) {
      res.status(200).json({ car: car });
    } else {
      res.status(404).json({message: 'Car not found'})
    }
  })

  app.post('/newcar', async (req: Request, res: Response) => {
    const { make, type, cost, model } = req.body;
    if (!make || !type || !cost || !model) {
      res.status(400).json({ message: 'Invaild request' });
    } else {
      const id = cars_list.length + 1;
      cars  = cars.concat(
        {
          make: make,
          model: model,
          type: type,
          cost: cost,
          id: id
        });
      res.status(201).json(
        {
          message: 'New car added!',
          cars: cars
        }
      );
    }
  })

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();