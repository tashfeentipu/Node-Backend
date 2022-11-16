const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env["SENDGRID_API_KEY"]);

export const sendVerificationEmail = () => {
    const msg = {
        to: 'testtipu@mailinator.com',
        from: 'nodetesting@mailinator.com',
        // templateId: 'd-fdbbc40b1f264be2bcf872a13ba32a4b',
        // dynamicTemplateData: {
        //     subject: 'Testing Templates',
        //     name: 'Tipu',
        //     city: 'Denver',
        // },
        subject: 'Sending with Twilio SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };
    try {
        sgMail.send(msg);
    } catch (error) {
        console.log(error);
    }
}