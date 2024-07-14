const generateEmailTemplate = (Email) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                color: #333;
                line-height: 1.6;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #fff;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .header {
                text-align: center;
                padding-bottom: 20px;
            }
            .header img {
                width: 100px;
            }
            .content {
                text-align: left;
            }
            .content h1 {
                color: #333;
            }
            .content p {
                margin: 20px 0;
            }
            .footer {
                text-align: center;
                padding-top: 20px;
                border-top: 1px solid #e4e4e4;
                color: #777;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
            </div>
            <div class="content">
                <h1>Hello, ${Email}!</h1>
                <p>Congratulations! You have successfully logged into your account.</p>
                <p>If you did not perform this login, please contact our support team immediately.</p>
            </div>
            <div class="footer">
            </div>
        </div>
    </body>
    </html>
    `;
};

module.exports = generateEmailTemplate;
