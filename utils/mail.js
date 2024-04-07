import { transporter } from "../config/mail.js";

export const sendmail=async(to,subject,content)=>{
    try {
       await transporter.sendMail({
            from:'shaktimandal045@gmail.com',
            to:to,
            subject:subject,
            html:content
        })
    } catch (error) {
        throw new Error("Something went wrong while sending mail,please try changing your network or try again later");
    }
}