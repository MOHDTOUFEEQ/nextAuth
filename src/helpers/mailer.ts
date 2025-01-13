import User from '@/models/userModel';
import nodemailer from 'nodemailer'
import bcryptjs from "bcryptjs";

export const sendEmail = async({email,emailType,userId}:any)=>{
    try {
      const hashedToken = await bcryptjs.hash(userId.toString(), 10)

      if (emailType === "VERIFY") {
          await User.findByIdAndUpdate(
              userId,
              {
                  $set: {
                      verifyToken: hashedToken,
                      verifyTokenExpiry: Date.now() + 3600000
                  }
              },
              { new: true }
          );
      } else if (emailType === "RESET") {
          await User.findByIdAndUpdate(
              userId,
              {
                  $set: {
                      forgotPasswordToken: hashedToken,
                      forgotPasswordTokenExpiry: Date.now() + 3600000
                  }
              },
              { new: true }
          );
      }
        // Looking to send emails in production? Check out our Email API/SMTP product!
          var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "c75b9e75951e3f",
              pass: "dcdd3a73dfc631"
            }
          });
        const mailOptions = {
            from: 'mohdtoufeeq1448@gmail.com', // sender address
            to: email, // list of receivers
            subject:  emailType === "VERIFY" ? "Verify your email" : "Reset your password", // Subject line
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`


          }

        const mailresponse = await transport.sendMail(mailOptions);
        return mailresponse;

    } catch (error:any) {
        throw new Error(error.message);
        
    }
}