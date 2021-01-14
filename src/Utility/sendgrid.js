import dotenv from "dotenv";
import sendMail from "@sendgrid/mail";

dotenv.config();

sendMail.setApiKey(process.env.SENDGRID_API_KEY);
let hostURL = "https://shopify-imagify.herokuapp.com"

// let hostURL =`http://localhost:${process.env.PORT || 3000}`;

const msg = {
  from: `Image Catalogue <${process.env.SENDGRID_EMAIL}>`,
  mail_settings: {
    sandbox_mode: {
      enable: false
    }
  }
};

/**

 */
export default class {
  // eslint-disable-next-line valid-jsdoc
  /**
   *
   */
  static sandboxMode() {
    msg.mail_settings.sandbox_mode.enable = true;
  }

  /**
   * @param {string} email - The user"s email
   * @param {string} User - The User"s username
   * @param {string} route - Specifies route for verification
   * @returns {object} Verification message
   */
  static async verifyUser(email, User) {
    const link = `${hostURL}/user/signup/verify-user/${email}`;
    msg.to = email;
    msg.subject = "Email Verification";
    msg.html = `<p>Dear <strong>${User}</strong>, welcome to Image Catalogue! Please click the button below to verify your email address</p> <br>  </div></td></tr><tr><td style="word-break:break-word;font-size:0px;padding:10px 25px;" align="center"><table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:separate;" align="center" border="0"><tbody><tr><td style="border:none;border-radius:3px;color:white;cursor:auto;padding:15px 19px;" align="center" valign="middle" bgcolor="#5146D9"><a href="${link}" style="text-decoration:none;line-height:100%;background:#5146D9;color:white;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:15px;font-weight:normal;text-transform:none;margin:0px;" target="_blank">
    Verify Email
  </a></td></tr></tbody></table></td></tr></tbody></table></div>`;
    try {
      await sendMail.send(msg);
      console.log("email sent")
    } catch (err) {
      return err;
    }
  }
};
