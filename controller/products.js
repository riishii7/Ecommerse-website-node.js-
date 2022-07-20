const products = [];

const db = require('../database'); 

exports.getAddProduct = (req, res, next) => {
  res.render('add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    isAuthenticated:  req.session.isLoggedIn
  });
};

exports.getCart = (req, res, next) => {
            var prodid=3;
            if (req.session.pid){
               prodid = req.session.pid;  
               db.execute('SELECT * FROM products WHERE id = ?',[prodid])
             .then(([rows,fieldData]) => {
                 res.render('cart',{
                 prods:rows,
                 pageTitle:'Your Cart',
                 path:'/cart',
                 isAuthenticated:  req.session.isLoggedIn
                });
             })
             .catch(err => console.log(err));
            }
            else{
                 const prods = [];
                 res.render('cart',{
                 prods:prods,
                 pageTitle:'Your Cart',
                 path:'/cart',
                 isAuthenticated:  req.session.isLoggedIn
                });
            }
           
};

exports.getLogin = (req,res,next) => {
  res.render('login',{
     pageTitle : 'Login',
     path: '/login',
     isAuthenticated: false,
     errorMessage: req.flash('error')
  });
};



exports.getSignup = (req,res,next) => {
  //console.log(req.session.isLoggedIn);
  res.render('signup',{
     pageTitle : 'Sign Up',
     path: '/signup',
     isAuthenticated:  req.session.isLoggedIn,
     errorMessage: req.flash('error')
  });
};


exports.getAdmin = (req, res, next) => {

  db.execute('SELECT * FROM products')
     .then(([rows,fieldData]) => {
         res.render('adminp',{
         prods:rows,
         pageTitle:'AdminPanel',
         path:'/admin/AdminPanel',
         isAuthenticated:  req.session.isLoggedIn
        });
     })
     .catch(err => console.log(err));
};


exports.postAddProduct =  (req, res, next) => {
  db.execute('INSERT INTO products (title,url,price,description) VALUES (?,?,?,?)', 
    [req.body.title,req.body.imageUrl,req.body.price,req.body.description]);
  //products.push({ title: req.body.title });
  res.redirect('/');
};

exports.postDelete =  (req, res, next) => {
  //console.log(req.body);
  const prodid = req.body.productId;
  db.execute('DELETE FROM products WHERE id = ? ',[prodid]);
  res.redirect('/admin/AdminPanel');
};

exports.postSubmit =  (req, res, next) => {
  //console.log(req.body);
  const prodid = req.body.productId;
  db.execute('UPDATE products SET title = ?, url = ? , price = ?, description = ? WHERE id = ?',
    [req.body.title,req.body.imageUrl,req.body.price,req.body.description,prodid]);
  res.redirect('/admin/AdminPanel');
};

exports.postCart = (req,res,next) => {
  req.session.pid = req.body.productId;
  const prodid = req.body.productId;
  const email = req.session.cemail;
  db.execute('UPDATE users SET cart = ? WHERE email = ?',[prodid,email]);
  db.execute('SELECT * FROM products WHERE id = ? ',[prodid])
    .then(([rows,fieldData]) => {
         res.render('cart',{
         prods:rows,
         pageTitle:'Cart',
         path:'/cart',
         isAuthenticated:  req.session.isLoggedIn
        });
     })
     .catch(err => console.log(err));
};

exports.postSignup = (req,res,next) => {
   const name     = req.body.name;
   const email    = req.body.email;
   const password = req.body.password;
   if(password.length > 8 ) {
     db.execute('SELECT * FROM users WHERE email = ? ',[email])
       .then(([rows,fieldData]) => {
          if(rows.length === 0){
             //console.log('kar sakte hai insert');
             db.execute('INSERT INTO users (name,email,password) VALUES (?,?,?)', [name,email,password]);
             res.redirect('/login');
          }
          else{
            // console.log('nahi kar sakte hai insert');
             req.flash('error','email already exist.');
             res.redirect('/signup');
          } 
       })
       .catch(err => console.log(err));
   }  
   else{
      req.flash('error','password should be greater than 8 characters.');
      res.redirect('/signup');
   }
};

exports.postLogin = (req,res,next) => {
  req.session.cemail = req.body.email;
  const email    = req.body.email;
  const password = req.body.password;
  db.execute('SELECT * FROM users WHERE email = ? AND password = ?',[email,password])
    .then(([rows,fieldData]) => {
      if(rows.length==0){
        //console.log('nahi ho sakte hai login');
        req.flash('error','Invalid email or password.');
        res.redirect('/login');
      }
      else{
         req.session.isLoggedIn = true;
         res.redirect('/');
      }
    })
     .catch(err => console.log(err));
};

exports.postLogout = (req,res,next) => {
   //console.log( req.session.isLoggedIn);
   req.session.destroy(err => {
       //console.log(err);
       res.redirect('/');
   });
};

exports.postEdit = (req, res, next) => {
   //console.log(req.body);
   const pid = req.body.editId;
  db.execute('SELECT * FROM products WHERE id = ? ',[pid])
     .then(([rows,fieldData]) => {
         res.render('edit',{
         prods:rows,
         pageTitle:'Edit details',
         path:'/admin/edit-product',
         isAuthenticated:  req.session.isLoggedIn
        });
     })
     .catch(err => console.log(err));
};

exports.getProducts = (req, res, next) => {
  db.execute('SELECT * FROM products')
     .then(([rows,fieldData]) => {
         res.render('shop',{
         prods:rows,
         pageTitle:'Shop',
         path:'/' ,
         isAuthenticated:  req.session.isLoggedIn
        });
     })
     .catch(err => console.log(err));
};

exports.postPayment = (req,res,next) => {
    res.render('pmnt', {
    pageTitle: 'Payment',
    path: 'pmnt',
    isAuthenticated:  req.session.isLoggedIn
  });
};