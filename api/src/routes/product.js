const server = require('express').Router();
const { Product } = require('../db.js');
const { Categories }= require('../db.js');


server.get('/', (req, res, next) => {
	Product.findAll({includes: [{model: Categories }]})
		.then(products => {
			res.send(products);
		})
		.catch(next);
})
//-------------------------------------------------------------------------//


//POST /products

// Controla que estén todos los campos requeridos, 
// si no retorna un status 400.
// Si pudo crear el producto retorna el status 201 y 
// retorna la información del producto.

server.post('/', (req, res ,next) => {	
	const {idCategory,name,description,stock,price,img}=req.body;
		Product.create({
			name: name,
			description: description,
			stock: stock,
			price: price,
			img: img,
		}).then(newProduct => {
			console.log(newProduct.__proto__)
			Categories.findById(idCategory)
			.then(category => {
				newProduct.addCategory(category)
			})
			return newProduct
		}) 	
		.then(productNew => {
			return res.send(productNew)
		})
		.catch(err => res.status(400).send(err))
});

//--------------------------------------------------------------------------//

//PUT /products/:id

// Modifica el producto con id: id. 
// Retorna 400 si los campos enviados no son correctos.
// Retorna 200 si se modificó con exito, 
// y retorna los datos del producto modificado.

server.put('/:id', (req, res, next) => {
	const id = req.params.id
	Product.update({
		name: req.body.name,
		description: req.body.description,
		category: req.body.category,
		stock: req.body.stock,
		price: req.body.price,
		img: req.body.img,
	},
	{
		where: {
			idProduct: id,
		},
		returning: true,
	},
	)
	.then(response => {
		res.status(200).json(response)
	}).catch(error => res.status(400).send('Ocurrio un error'));
});


//---------------------------------------------------------------------------//

// DELETE /products/:id

// Retorna 200 si se elimino con exito.

server.delete('/:id', (req, res, next ) => {
	const id = req.param.id;

	Product.remove(id)  
		.then(removed => {
			if (removed) {
			  res.status(200).end();
			} else {
			  res.status(404).json({message: "Not found"})
			}
	})
})

 
// DELETE /products/category/:id
// Elimina una categoria

server.delete('/category/:id', (req,res ) => {
	const id= req.params.id;
	Categories.destroy({
		where: {
			id:id
		}
		.then(deleteCategory => {
			res.json(deleteCategory);
		}).catch(res.send())
	});


})

//--------------------------------------------------------------------------//







module.exports = server;
