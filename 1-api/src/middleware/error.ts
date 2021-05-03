
export const errorHandler = (err, req, res, next) => {  
  if (err.response) {
    return res.status(err.response.status).json({      
      status: err.response.status,
      message: 'Sorry, something went wrong'
    })
  }
  
  return res.status(400).json({      
    status: 400,
    message: err.message
  }) 
}
