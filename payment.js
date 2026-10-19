(function () {
    "use strict";

    var config = window.WFC_CONFIG || {};
    var fees = config.membershipFees || { adult: 200, junior: 100, family: 350 };
    var typeLabels = { adult: "Adult", junior: "Junior", family: "Family" };
    var methodLabels = {
        "payfast-card": "Card (PayFast)",
        "payfast-eft": "Instant EFT (PayFast)",
        yoco: "Card (Yoco)",
        bank: "Bank transfer"
    };

    function $(selector) {
        return document.querySelector(selector);
    }

    function $all(selector) {
        return Array.prototype.slice.call(document.querySelectorAll(selector));
    }

    function formatRand(value) {
        var number = Number(value) || 0;
        return "R" + (number % 1 === 0 ? number.toFixed(0) : number.toFixed(2));
    }

    function setStatus(message, tone) {
        var status = $("#form-status");
        if (!status) {
            return;
        }
        status.textContent = message || "";
        status.className = "notice" + (tone ? " is-" + tone : "");
        status.hidden = !message;
    }

    /* ---------------------------------------------- membership fee preview */

    var feeLink = $("#fee-pay");
    if (feeLink) {
        var feeSelect = $("#type");
        var feeType = $("#fee-type");
        var feeAmount = $("#fee-amount");

        var updateFee = function () {
            var key = feeSelect ? feeSelect.value : "adult";
            var amount = fees[key] || 0;
            if (feeType) {
                feeType.textContent = typeLabels[key] || key;
            }
            if (feeAmount) {
                feeAmount.textContent = "R" + amount;
            }
            feeLink.href = "donate.html?purpose=membership&type=" +
                encodeURIComponent(key) + "&amount=" + amount;
        };

        if (feeSelect) {
            feeSelect.addEventListener("change", updateFee);
        }
        updateFee();
    }

    /* ------------------------------------------------------------ checkout */

    var form = $("#payment-form");
    if (!form) {
        return;
    }

    var amountInput = $("#amount");
    var amountButtons = $all("[data-amount]");
    var summaryAmount = $("#sum-amount");
    var summaryFrequency = $("#sum-frequency");
    var summaryMethod = $("#sum-method");
    var summaryPurpose = $("#sum-purpose");
    var summaryNote = $("#summary-note");
    var payButton = $("#pay-button");
    var eftPanel = $("#eft-panel");
    var eftFields = $("#eft-fields");
    var eftReference = $("#eft-reference");
    var membershipNote = $("#membership-note");
    var amountFixed = $("#amount-fixed");
    var frequencyFieldset = $("#frequency-fieldset");

    var params = new URLSearchParams(window.location.search);
    var purpose = params.get("purpose") === "membership" ? "membership" : "donation";
    var membershipType = params.get("type") || "adult";
    var queryAmount = Number(params.get("amount"));

    if (purpose === "membership") {
        var fee = fees[membershipType] || fees.adult;
        if (amountInput) {
            amountInput.value = String(queryAmount > 0 ? queryAmount : fee);
            amountInput.readOnly = true;
        }
        $all(".amount-grid").forEach(function (node) {
            node.hidden = true;
        });
        var customField = $(".amount-custom");
        if (customField) {
            customField.hidden = true;
        }
        if (membershipNote) {
            membershipNote.hidden = false;
            membershipNote.textContent = "Paying the " +
                (typeLabels[membershipType] || membershipType) +
                " membership fee for the 2026 season. Change the type on the membership page.";
        }
        if (amountFixed) {
            amountFixed.hidden = false;
            amountFixed.textContent = (typeLabels[membershipType] || membershipType) +
                " membership fee: " + formatRand(Number(amountInput.value)) + " per year";
        }
        if (frequencyFieldset) {
            frequencyFieldset.hidden = true;
        }
        var onceRadio = form.querySelector('input[name="frequency"][value="once"]');
        if (onceRadio) {
            onceRadio.checked = true;
        }
        if (summaryPurpose) {
            summaryPurpose.textContent = (typeLabels[membershipType] || membershipType) + " membership";
        }
    }

    function selectedMethod() {
        var checked = form.querySelector('input[name="method"]:checked');
        return checked ? checked.value : "payfast-card";
    }

    function selectedFrequency() {
        var checked = form.querySelector('input[name="frequency"]:checked');
        return checked ? checked.value : "once";
    }

    function renderSummary() {
        var amount = Number(amountInput.value) || 0;
        if (summaryAmount) {
            summaryAmount.textContent = formatRand(amount);
        }
        if (summaryFrequency) {
            summaryFrequency.textContent = purpose === "membership"
                ? "Per year"
                : (selectedFrequency() === "monthly" ? "Monthly" : "One-off");
        }
        if (summaryMethod) {
            summaryMethod.textContent = methodLabels[selectedMethod()] || "Card";
        }
        if (payButton) {
            payButton.textContent = (selectedFrequency() === "monthly" ? "Give " : "Pay ") + formatRand(amount) +
                (selectedFrequency() === "monthly" ? " a month" : "");
        }
        amountButtons.forEach(function (button) {
            var isActive = Number(button.getAttribute("data-amount")) === amount;
            button.setAttribute("aria-pressed", isActive ? "true" : "false");
        });
        $all(".method").forEach(function (label) {
            var input = label.querySelector("input");
            label.classList.toggle("is-selected", input && input.checked);
        });
        if (eftPanel) {
            eftPanel.hidden = selectedMethod() !== "bank";
        }
        if (summaryNote) {
            summaryNote.hidden = selectedMethod() === "bank";
        }
    }

    amountButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            amountInput.value = button.getAttribute("data-amount");
            amountInput.setCustomValidity("");
            renderSummary();
        });
    });

    if (amountInput) {
        amountInput.addEventListener("input", function () {
            amountInput.setCustomValidity("");
            renderSummary();
        });
    }

    $all('input[name="frequency"], input[name="method"]').forEach(function (input) {
        input.addEventListener("change", renderSummary);
    });

    var bank = config.bank || {};
    if (eftFields) {
        var rows = [
            ["Bank", bank.bankName],
            ["Account name", bank.accountName],
            ["Account number", bank.accountNumber],
            ["Branch code", bank.branchCode]
        ].filter(function (row) {
            return row[1];
        });

        if (rows.length) {
            eftFields.innerHTML = rows.map(function (row) {
                return "<div><span>" + row[0] + "</span><strong>" + row[1] + "</strong></div>";
            }).join("");
        } else {
            eftFields.innerHTML =
                "<p>Bank transfer details will be published once the club treasurer confirms them. " +
                "Please contact the club committee in the meantime.</p>";
        }
    }

    if (params.get("cancelled") === "1") {
        setStatus("Payment was cancelled. You can try again whenever you are ready.", "error");
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        var amount = Number(amountInput.value);
        if (!amountInput.value || amount < 10) {
            amountInput.setCustomValidity("Please enter an amount of at least R10.");
        } else if (amount > 50000) {
            amountInput.setCustomValidity("Please enter an amount of R50,000 or less.");
        } else {
            amountInput.setCustomValidity("");
        }

        if (!form.checkValidity()) {
            form.reportValidity();
            setStatus("Please check the highlighted fields before continuing.", "error");
            return;
        }

        var method = selectedMethod();
        var reference = (bank.referencePrefix || "WFC") + "-" +
            new Date().toISOString().slice(0, 10).replace(/-/g, "");

        if (method === "bank") {
            if (eftReference) {
                eftReference.textContent = reference;
            }
            if (eftPanel) {
                eftPanel.hidden = false;
                eftPanel.scrollIntoView({ behavior: "smooth", block: "start" });
            }
            setStatus(
                "Use the bank details below and quote the reference " + reference +
                ". The club will confirm your payment by email.",
                "ok"
            );
            return;
        }

        var endpoint = (config.payment || {}).checkoutEndpoint;
        if (!endpoint) {
            if (eftPanel) {
                eftPanel.hidden = false;
            }
            setStatus(
                "Online card payments are not switched on for this build yet, so no payment has been taken. " +
                "Please use the bank transfer details below, or contact the club committee.",
                "error"
            );
            return;
        }

        var payload = {
            amount: amount,
            frequency: selectedFrequency(),
            method: method,
            purpose: purpose,
            membershipType: purpose === "membership" ? membershipType : null,
            reference: reference,
            donor: {
                firstName: form.elements.firstName.value.trim(),
                lastName: form.elements.lastName.value.trim(),
                email: form.elements.email.value.trim(),
                phone: form.elements.phone.value.trim(),
                anonymous: form.elements.anonymous.checked,
                message: form.elements.message.value.trim()
            }
        };

        payButton.disabled = true;
        payButton.textContent = "Connecting to the payment provider...";
        setStatus("", "");

        fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        })
            .then(function (response) {
                if (!response.ok) {
                    throw new Error("Payment service returned " + response.status);
                }
                return response.json();
            })
            .then(function (data) {
                if (data && data.redirectUrl) {
                    window.location.assign(data.redirectUrl);
                    return;
                }
                throw new Error("Payment service did not return a redirect URL");
            })
            .catch(function () {
                payButton.disabled = false;
                renderSummary();
                setStatus(
                    "We could not reach the payment provider. No payment has been taken. " +
                    "Please try again, or use the bank transfer details below.",
                    "error"
                );
            });
    });

    renderSummary();
})();
