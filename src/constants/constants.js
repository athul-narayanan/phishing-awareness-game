export const videos = [
    {
        "url": "https://www.youtube.com/embed/XBkzBrXlle0",
        "title": "Phishing Explained In 6 Minutes"
    },
    {
        "url": "https://www.youtube.com/embed/Y7zNlEMDmI4",
        "title": "What is phishing? Learn how this attack works"
    },
    {
        "url": "https://www.youtube.com/embed/Yz0PnAkeRiI",
        "title": "How To Recognize and Avoid Phishing Scams"
    },
    {
        "url": "https://www.youtube.com/embed/b_DrAudSo38",
        "title": "What is Phishing: Types, Techniques, and How to Stay Safe"
    }
]

export const questions = [
    {
        id: 1,
        type: 'phishing',
        sender: "PayPaI Support",
        senderEmail: "support@paypal.com",
        subject: "URGENT: Your account requires action",
        emailBody: [
            { text: "Dear Varna,", isSuspicious: false },
            { text: "\n\nWe detected an unusual activity in your account.", isSuspicious: false },
            { text: "To prevent the deletion of your account verify your identity in next 2 hours.", isSuspicious: true },
            { text: "\n\nPlease click the link below to verify your identity.", isSuspicious: false },
            { text: "\n\nhttp://paypal/secure-paypal-login-v2", isSuspicious: true},
            { text: "\n\nRegards,\nPayPaI Team", isSuspicious: false }
        ],
        explanation: "Spoofed sender( Please check the spelling of PayPal, it is PayPaI), urgency and short url indicates Phishing"
    },
    {
        id: 2,
        type: 'legitimate',
        senderName: "Google Community Team",
        senderEmail: "googlecommunityteam-noreply@google.com",
        subject: "Complete the setup of your new gmail account",
        emailBody: [
            { text: "Hi Anitha,", isSuspicious: false },
            { text: "\n\nWelcome to Google. Congrats and you can access our products now", isSuspicious: false },
            { text: "\n\nPlease visit your profile to complete settings", isSuspicious: false },
            { text: "\n\nRegards,\nThe Google Team", isSuspicious: false }
        ],
        explanation: "Legitimate email from a verified Google domain"
    },
    {
        id: 3,
        type: 'phishing',
        senderName: "HR Department",
        senderEmail: "hr-update@company-internal.net",
        subject: "Action Required: Updated company policy",
        emailBody: [
            { text: "All Employees,", isSuspicious: false },
            { text: "\n\nPlease find the updated company policy handbook.", isSuspicious: false },
            { text: "You need to use you email and password to view the document", isSuspicious: true },
            { text: "\n\nClick here to sign in", isSuspicious: true }
        ],
        explanation: "Internal documents does not need to be shared via email. Generic text to sign in is also an indicator of phising"
    },
    {
        id: 4,
        type: 'legitimate',
        senderName: "Netflix",
        senderEmail: "info@mailer.netflix.com",
        subject: "New Sign-In Detected",
        emailBody: [
            { text: "Hi Varna,", isSuspicious: false },
            { text: "\n\nWe detected a new sign-in to your netfix account", isSuspicious: false },
            { text: "\n\nDevice: Windows PC, Location: Sault Ste Marie, ON", isSuspicious: false },
            { text: "\n\nReport if it is not done by you", isSuspicious: false }
        ],
        explanation: "It is a standard security alert for new sign-in from another device"
    },
    {
        id: 5,
        type: 'phishing',
        senderName: "Amazon Orders",
        senderEmail: "orders@amazon-verify.com",
        subject: "Order Confirmation: Iphone 17 Pro Max, 1TB",
        emailBody: [
            { text: "Hi There,", isSuspicious: false },
            { text: "\n\nThanks for your order of Iphone 17 Pro Max, 1TB worth 2499CAD", isSuspicious: false },
            { text: "If purchase is not done by you please call at +1 1800 991111", isSuspicious: true,  },
            { text: "\n\nCancel Order Link", isSuspicious: true },
            { text: "\n\nTeam, Amazon", isSuspicious: true }
        ],
        explanation: "Fake order scam based on creating a panic scenario. Calling to specified number might result in asking for credit card details to refund the amount"
    },
    {
        id: 6,
        type: 'phishing',
        senderName: "Internal Revenue Service",
        senderEmail: "refunds@ca-tax-gov.org",
        subject: "Urgent: Tax Refund",
        emailBody: [
            { text: "You have a tax refund of 4500CAD", isSuspicious: false },
            { text: "\n\nClick the link to claim your refund", isSuspicious: true }
        ],
        explanation: "Income tax department usually deposit refund to your account and communicate via physical mails.Clear Indicator of Phishing"
    },
    {
        id: 7,
        type: 'phishing',
        senderName: "Microsoft Security",
        senderEmail: "security@security-microsoft.net",
        subject: "Action Required: Sign-in from India",
        emailBody: [
            { text: "We detected a Sign-in to your account from India", isSuspicious: false },
            { text: "\n\nIf this is not done by you", isSuspicious: false },
            { text: "Click here to report", isSuspicious: true, }
        ],
        explanation: "Sender email is not legitimate. Microsoft emails ate from microsoft.com"
    },
    {
        id: 8,
        type: 'phishing',
        senderName: "CEO (Anitha Thomas)",
        senderEmail: "anithaedison123@gmail.com",
        subject: "Urgent",
        emailBody: [
            { text: "Hi Rachelle,", isSuspicious: false },
            { text: "\n\nAre you in Office. I am in a meeting and can't talk", isSuspicious: false },
            { text: "I need you to buy 100 metro gift vouchers and send the codes asap", isSuspicious: true },
            { text: "\n\nThanks and regards, Anitha", isSuspicious: false }
        ],
        explanation: "CEO always use company email to send email to employees. Personal email Id and request for gift card via mail are clear indication of Phishing"
    },
    {
        id: 9,
        type: 'legitimate',
        senderName: "LinkedIn",
        senderEmail: "messages-noreply@linkedin.com",
        subject: "Hi Athul, You appeared in 125 searches this month",
        emailBody: [
            { text: "See who's looking for you.", isSuspicious: false },
            { text: "\n\n125 people found you in search results. 5 are from Nokia", isSuspicious: false },
            { text: "\n\nView Search Stats", isSuspicious: false }
        ],
        explanation: "Standard mail from legitimate social media page. Sender email is also verified one"
    }, 
    {
        id: 10,
        type: 'phishing',
        senderName: "Internal Revenue Service",
        senderEmail: "refunds@ca-tax-gov.org",
        subject: "Urgent: Tax Refund",
        emailBody: [
            { text: "You have a tax refund of 4500CAD", isSuspicious: false },
            { text: "\n\nClick the link to claim your refund", isSuspicious: true }
        ],
        explanation: "Income tax department usually deposit refund to your account and communicate via physical mails.Clear Indicator of Phishing"
    },
    {
        id: 11,
        type: 'phishing',
        senderName: "CEO (Anitha Thomas)",
        senderEmail: "anithaedison123@gmail.com",
        subject: "Urgent",
        emailBody: [
            { text: "Hi Rachelle,", isSuspicious: false },
            { text: "\n\nAre you in Office. I am in a meeting and can't talk", isSuspicious: false },
            { text: "I need you to buy 100 metro gift vouchers and send the codes asap", isSuspicious: true },
            { text: "\n\nThanks and regards, Anitha", isSuspicious: false }
        ],
        explanation: "CEO always use company email to send email to employees. Personal email Id and request for gift card via mail are clear indication of Phishing"
    },
    {
        id: 12,
        type: 'phishing',
        sender: "PayPaI Support",
        senderEmail: "support@paypal.com",
        subject: "URGENT: Your account requires action",
        emailBody: [
            { text: "Dear Customer,", isSuspicious: false },
            { text: "\n\nWe detected an unusual activity in your account", isSuspicious: false },
            { text: "To prevent the deletion of your account verify your identity in next 2 ours.", isSuspicious: true },
            { text: "\n\nPlease click the link below to verify your identity", isSuspicious: false },
            { text: "\n\nhttp://bit.ly/secure-paypal-login-v2", isSuspicious: true},
            { text: "\n\nRegards,\nPayPaI Team", isSuspicious: false }
        ],
        explanation: "Spoofed sender( Please check the spelling of PayPal, it is PayPaI), urgency and short url indicates Phishing"
    },
    {
        id: 13,
        type: 'legitimate',
        senderName: "Google Community Team",
        senderEmail: "googlecommunityteam-noreply@google.com",
        subject: "Complete the setup of your new gmail account",
        emailBody: [
            { text: "Hi Alex,", isSuspicious: false },
            { text: "\n\nWelcome to Google. Your new account comes with access to Google products.", isSuspicious: false },
            { text: "\n\nPlease visit your profile to complete settings", isSuspicious: false },
            { text: "\n\nRegards,\nThe Google Team", isSuspicious: false }
        ],
        explanation: "Legitimate email from a verified Google domain"
    },
    {
        id: 14,
        type: 'phishing',
        senderName: "HR Department",
        senderEmail: "hr-update@company-internal.net",
        subject: "Action Required: Updated company policy",
        emailBody: [
            { text: "All Employees,", isSuspicious: false },
            { text: "\n\nPlease find the updated company policy handbook.", isSuspicious: false },
            { text: "You need to use you email and password to view the document", isSuspicious: true },
            { text: "\n\nClick here to sign in", isSuspicious: true }
        ],
        explanation: "Internal documents does not need to be shared via email. Generic text to sign in is also an indicator of phising"
    },
    {
        id: 15,
        type: 'legitimate',
        senderName: "Netflix",
        senderEmail: "info@mailer.netflix.com",
        subject: "New Sign-In Detected",
        emailBody: [
            { text: "Hi Varna,", isSuspicious: false },
            { text: "\n\nWe detected a new sign-in to your netfix account", isSuspicious: false },
            { text: "\n\nDevice: Windows PC, Location: Sault Ste Marie, ON", isSuspicious: false },
            { text: "\n\nReport if it is not done by you", isSuspicious: false }
        ],
        explanation: "It is a standard security alert for new sign-in from another device"
    },
    {
        id: 16,
        type: 'phishing',
        senderName: "Amazon Orders",
        senderEmail: "orders@amazon-verify.com",
        subject: "Order Confirmation: Iphone 17 Pro Max, 1TB",
        emailBody: [
            { text: "Hi There,", isSuspicious: false },
            { text: "\n\nThanks for your order of Iphone 17 Pro Max, 1TB worth 2499CAD", isSuspicious: false },
            { text: "If purchase is not done by you please call at +1 1800 991111", isSuspicious: true,  },
            { text: "\n\nCancel Order Link", isSuspicious: true },
            { text: "\n\nTeam, Amazon", isSuspicious: true }
        ],
        explanation: "Fake order scam based on creating a panic scenario. Calling to specified number might result in asking for credit card details to refund the amount"
    },
    {
        id: 17,
        type: 'phishing',
        senderName: "Microsoft Security",
        senderEmail: "security@security-microsoft.net",
        subject: "Action Required: Sign-in from India",
        avatar: "M",
        emailBody: [
            { text: "We detected a Sign-in to your account from India", isSuspicious: false },
            { text: "\n\nIf this is not done by you", isSuspicious: false },
            { text: "Click here to report", isSuspicious: true, }
        ],
        explanation: "Sender email is not legitimate. Microsoft emails ate from microsoft.com"
    },
    {
        id: 18,
        type: 'phishing',
        senderName: "CEO (Anitha Thomas)",
        senderEmail: "anithaedison123@gmail.com",
        subject: "Urgent",
        emailBody: [
            { text: "Hi Rachelle,", isSuspicious: false },
            { text: "\n\nAre you in Office. I am in a meeting and can't talk", isSuspicious: false },
            { text: "I need you to buy 100 metro gift vouchers and send the codes asap", isSuspicious: true },
            { text: "\n\nThanks and regards, Anitha", isSuspicious: false }
        ],
        explanation: "CEO always use company email to send email to employees. Personal email Id and request for gift card via mail are clear indication of Phishing"
    },
    {
        id: 19,
        type: 'legitimate',
        senderName: "LinkedIn",
        senderEmail: "messages-noreply@linkedin.com",
        subject: "Hi Athul, You appeared in 125 searches this month",
        emailBody: [
            { text: "See who's looking for you.", isSuspicious: false },
            { text: "\n\n125 people found you in search results. 5 are from Nokia", isSuspicious: false },
            { text: "\n\nView Search Stats", isSuspicious: false }
        ],
        explanation: "Standard mail from legitimate social media page. Sender email is also verified one"
    },
    {
        id: 20,
        type: 'phishing',
        senderName: "Internal Revenue Service",
        senderEmail: "refunds@ca-tax-gov.org",
        subject: "Urgent: Tax Refund",
        emailBody: [
            { text: "You have a tax refund of 4500CAD", isSuspicious: false },
            { text: "\n\nClick the link to claim your refund", isSuspicious: true }
        ],
        explanation: "Income tax department usually deposit refund to your account and communicate via physical mails.Clear Indicator of Phishing"
    },
];

export const game_levels = [
    {
        id: 1,
        type: 'phishing',
        sender: "PayPaI Support",
        senderEmail: "support@paypal.com",
        subject: "URGENT: Your account requires action",
        emailBody: [
            { text: "Dear Varna,", isSuspicious: false },
            { text: "\n\nWe detected an unusual activity in your account.", isSuspicious: false },
            { text: "To prevent the deletion of your account verify your identity in next 2 hours.", isSuspicious: true },
            { text: "\n\nPlease click the link below to verify your identity.", isSuspicious: false },
            { text: "\n\nhttp://paypal/secure-paypal-login-v2", isSuspicious: true, type:"link"},
            { text: "\n\nRegards,\nPayPaI Team", isSuspicious: false }
        ],
        count:2,
        chances: 3,
        explanation: "Spoofed sender( Please check the spelling of PayPal, it is PayPaI), urgency and short url indicates Phishing"
    },
    {
        id: 2,
        type: 'phishing',
        senderName: "HR Department",
        senderEmail: "hr-update@company-internal.net",
        subject: "Action Required: Updated company policy",
        emailBody: [
            { text: "All Employees,", isSuspicious: false },
            { text: "\n\nPlease find the updated company policy handbook.", isSuspicious: false },
            { text: "You need to use you email and password to view the document", isSuspicious: true },
            { text: "\n\nClick here to sign in", isSuspicious: true , type:"link" }
        ],
        count: 2,
        chances: 3,
        explanation: "Internal documents does not need to be shared via email. Generic text to sign in is also an indicator of phising"
    },
     {
        id: 3,
        type: 'phishing',
        senderName: "Amazon Orders",
        senderEmail: "orders@amazon-verify.com",
        subject: "Order Confirmation: Iphone 17 Pro Max, 1TB",
        emailBody: [
            { text: "Hi There,", isSuspicious: false },
            { text: "\n\nThanks for your order of Iphone 17 Pro Max, 1TB worth 2499CAD", isSuspicious: false },
            { text: "If purchase is not done by you please call at +1 1800 991111", isSuspicious: true,  },
            { text: "\n\nCancel Order Link", isSuspicious: true, type:"link" },
            { text: "\n\nTeam, Amazone", isSuspicious: true }
        ],
        count:3,
        chances: 4,
        explanation: "Fake order scam based on creating a panic scenario. Calling to specified number might result in asking for credit card details to refund the amount"
    },
    {
        id: 4,
        type: 'phishing',
        senderName: "Internal Revenue Service",
        senderEmail: "refunds@ca-tax-gov.org",
        subject: "Urgent: Tax Refund",
        emailBody: [
            { text: "You have a tax refund of 4500CAD", isSuspicious: false },
            { text: "\n\nClick the link to claim your refund", isSuspicious: true, type:"link" }
        ],
        count:1,
        chances:1,
        explanation: "Income tax department usually deposit refund to your account and communicate via physical mails.Clear Indicator of Phishing"
    },
    {
        id: 5,
        type: 'phishing',
        senderName: "Microsoft Security",
        senderEmail: "security@security-microsoft.net",
        subject: "Action Required: Sign-in from India",
        emailBody: [
            { text: "We detected a Sign-in to your account from India", isSuspicious: false },
            { text: "\n\nIf this is not done by you", isSuspicious: false },
            { text: "Click here to report", isSuspicious: true, type:"link" }
        ],
        count:1,
        chances:1,
        explanation: "Sender email is not legitimate. Microsoft emails ate from microsoft.com"
    },
]