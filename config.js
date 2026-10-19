/*
 * Warriaga Park FC - site configuration
 *
 * Values that change between deployments belong here.
 * Never put passwords, API keys or bank details in this file.
 */
window.WFC_CONFIG = {
    site: {
        name: "Warriaga Park FC",
        contactEmail: ""
    },

    membershipFees: {
        adult: 200,
        junior: 100,
        family: 350
    },

    payment: {
        // The site is static, so the payment provider signature has to be created
        // by a small serverless function. Leave this empty until that function is
        // deployed; the page then shows the bank transfer option instead.
        checkoutEndpoint: "",
        provider: "payfast",
        mode: "sandbox",
        returnUrl: "thank-you.html",
        cancelUrl: "donate.html?cancelled=1"
    },

    bank: {
        // Publish these only after the club treasurer confirms them.
        bankName: "",
        accountName: "",
        accountNumber: "",
        branchCode: "",
        referencePrefix: "WFC"
    }
};
