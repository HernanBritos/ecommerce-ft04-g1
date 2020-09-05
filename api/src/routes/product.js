const server = require('express').Router();
const { Product } = require('../db.js');
const { Categories }= require('../db.js');



//--------------------------------------------------------------------------//
// GET Muestra todos los productos

server.get('/', (req, res, next) => {
	
	Product.findAll({includes: [{model: Categories }]})
		.then(products => {
			res.send(products); 
		})
		.catch(next);
})

//-------------------------------------------------------------------------//

// POST /products 
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
			//console.log(newProduct.__proto__)
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

// PUT /products/:id
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
	}).catch(err => res.status(400).send(err,' WARNING! -> You can´t modificate the product'));
});


//---------------------------------------------------------------------------//

// DELETE /products/:id
// Retorna 200 si se elimino con exito.

server.delete('/:id', (req, res, next ) => {
	const id = req.param.id;

	Product.destroy({
		where: { id:id }
	})
	.then(removed => {
		if (removed) {
			res.status(200).end();
		} else {
		res.status(404).json({message: "Not found"})
		}
	})
})

//-----------------------------------------------------------------------------------------//

// PUT /product/category/:id 
// Crea ruta para modificar categoria

server.put('/category/:id', (req,res) => {
	const id= req.params.id;

	Categories.update({			//update({includes: [{model: Categories }]})
		name: req.body.name,     
	},
	{
		where: {
			idProduct: id,
		},
		returning: true,
	},
	).then(response => {
		res.json(response)
	}).catch(error => res.send(error))

})

//-------------------------------------------------------------------------------------//

// DELETE /products/category/:id
// Elimina una categoria

server.delete('/category/:id', (req,res ) => {
	const id= req.params.id;
	//console.log(req.body);
	Categories.destroy({      //update({includes: [{model: Categories }]})
		where: {
			id:id
		}
		.then(deleteCategory => {
			res.json(deleteCategory);
		}).catch(err => res.send(err))
	});
})

//--------------------------------------------------------------------------//

// POST /products/:idProducto/category/:idCategoria
// Agrega la categoria al producto.

	server.post('/:idProducto/category/:idCategoria', (req,res) => {
	const idProduct = req.params.idProduct;
	const idCategoria = req.params.idCategoria;

	Categories.update({               //{include: [{models:Product}]} Creo que en este caso no iria, pero si agregaria el 
		name: req.params.name         //                                       {include: [{models: Categories}]}
	},{
		where: {
			id:idCategoria
		}
	}) .then(category =>{
		Product.addCategory(category)
	}).catch(err => res.send(err))

	// En producto no tengo atributo categoria 
	// Productxcategories tiene el id de categoria, lo agregaria ahí?
	})



	// DELETE /products/:idProducto/category/:idCategoria
	// Elimina la categoria al producto.
	server.delete('/:idProducto/category/:idCategoria', (req, res) => {
		const idProd = req.params.idProducto;
		const idCate = req.params.idCategoria;

		Product.findById(idProd)
		.then(product => {
			Categories.destroy(idCate)               //{includes: [{models: category}]} ?????????????????
			.then(category => {
				res.send('Deleted Categorie succesfull')
			})
		})
	})





//-------------------------------------------------------------------------------------------------//

// GET /products/categoria/:nombreCat                         //Esto deberia ir en categoria.js ? e incluir {Products}
// Retorna todos los productos de {nombreCat} Categoría.

server.get('/categoria/:nombreCat', (req, res, next ) => {
	const nameCat=req.params.nombreCat;

	Product.findAll({
		where: { name: nameCat}
	}).then(function (products) {
		 res.send(products)
	})
	.catch(next)
})

//-----------------------------------------------------------------------------------------------------------//

// GET /search?query={valor}
// Retorna todos los productos que tengan {valor} en su nombre o descripcion.

Product.findAll()
server.get('/search?query={valor}', (req,res) => {        
	const valor=req.query;
	
	Product.findAll({
		where: Sequelize.and({name: valor},
			Sequelize.or({description:valor}))
	}).then(products => {
		res.send(products)
	}).catch(err => res.send(err))
})


//----------------------------------------------------------------------------------------------------//  

// GET /products/:id
// Retorna un objeto de tipo producto con todos sus datos. (Incluidas las categorías e imagenes).

server.get('/:id', (req, res) => {
	const id=req.params.id;
	Product.findOne({
		where: { id:id }		
	}).then (newProduct => {
		res.send(newProduct)
	}).catch(err => res.send(err))
})


//------------------------------------------------------------------------------------------------------------//











module.exports = server;
