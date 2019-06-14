export default function (helmetData) {
    return `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8"> 
                ${ helmetData.title.toString()} 
                ${ helmetData.meta.toString()}
                <title>Lucky Booking For All :)</title>
                <link href="https://fonts.googleapis.com/css?family=PT+Sans+Narrow" rel="stylesheet">
                <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"/>
                <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
                <link rel="icon" href="/favicon.ico" type="image/x-icon">
                <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" name="viewport">
            </head>
            <body>
                <div id='mount-point'></div>
                <script type="text/javascript" src="/app.bundle.js"></script>
                <script type="text/javascript" src="/runtime.bundle.js"></script>
                <script type="text/javascript" src="/vendors.bundle.js"></script>
            </body>
        </html>
    `;
}
