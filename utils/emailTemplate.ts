export const passwordResetTemplate = ({ url }: { url: string }) => {
  return `
    <!doctype html>
    <html>
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      </head>
      <body style="font-family: sans-serif;">
        <div style="display: block; margin: auto; max-width: 600px;" class="main">
          <h1 style="font-size: 18px; font-weight: bold; margin-top: 20px">Password reset</h1>
      
    <p>Please Follow the link below to reset your password <p/> 
    <p> ${url}<p/> 

    
    <p>Warm regards <p/>

    <p>Kindly ignore this message if you did not request for password reset <p/> 
    
    <style>
      .main { background-color: white; }
      a:hover { border-left-width: 1em; min-height: 2em; }
    </style>
  </body>
</html>`
}