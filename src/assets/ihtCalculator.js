Vue.component('ErrorMessage', {
    name: 'error-message',
    props: {
        field: String,
        showErrors: Boolean
    },
    template: '<p v-if="showErrors" class="coop-form__error">{{field}}</p>'
});

Vue.component('ErrorMessageHeader', {
    name: 'error-message-header',
    props: {
        errors: Object,
        showErrors: Boolean
    },
    template: '<div v-if="showErrors" class="coop-c-message coop-c-message--error" role="alert">\
                    <h3 class="error-message-heading">There\'s a problem</h3>\
                    <p>Check the form. You must:</p>\
                    <ul>\
                        <li v-for="(value, name) in errors"><a class="coop-c-message__link" v-bind:href="\'#\' + name">{{ value }}</a></li>\
                    </ul>\
                </div>'
});

var app = new Vue({
    el: '#ihtCalcApp',
    data: {       
        showFormValidation: false,
        currentPage: 1,
        errors: {},

        relationship: null,
        relationshipValidation: "Select the option that describes your relationship",

        assetsHomeValue: null,
        assetsHomeValueValidation: "Enter the amount you and your partner’s main home is worth",

        assetsHomeOtherExists: null,
        assetsHomeOtherExistsValidation: "Select whether or not either of you own any other property in England and Wales",

        assetsHomeOtherValue: null,
        assetsHomeOtherValueValidation: "Enter the amount you and your partner’s property outside of England and Wales is worth",

        assetsInvestmentValue: null,
        assetsInvestmentValueValidation: "Enter the amount of you and your partner’s cash and investments",

        assetsLifeInsuranceExists: null,
        assetsLifeInsuranceExistsValidation: "Select whether or not either of you have life insurance not held in a trust",

        assetsLifeInsuranceValue: null,
        assetsLifeInsuranceValueValidation: "Enter the amount you and your partner’s life insurance policies are worth",

        assetsPossessionValue: null,
        assetsPossessionValueValidation: "Enter the amount you and your partner’s personal possessions are worth in pounds",

        assetFurtherInheritanceExists: null,
        assetFurtherInheritanceExistsValidation: "Select whether or not either of you expect to receive any future inheritance",

        assetFurtherInheritanceValue: null,
        assetFurtherInheritanceValueValidation: "Enter the amount of future inheritance you and your partner expect to receive",

        assetsForeignExists: null,
        assetsForeignExistsValidation: "Select whether or not either of you have any foreign assets",

        assetsForeignValue: null,
        assetsForeignValueValidation: "Enter the amount you and your partner’s foreign assets are worth",

        assetsOtherExists: null,
        assetsOtherExistsValidation: "Select whether or not either of you have any other assets",

        assetsOtherValue: null,
        assetsOtherValueValidation: "Enter the amount you and your partner’s other assets are worth",

        liabMortgageExists: null,
        liabMortgageExistsValidation: "Select whether or not there is a mortgage on your main home",

        liabMortageValue: null,
        liabMortageValueValidation: "Enter the amount remaining on the mortgage for you and your partner’s main home",

        liabMortgageOtherExists: null,
        liabMortgageOtherExistsValidation: "Select whether or not either of you have any other mortgages",

        liabMortgageOtherValue: null,
        liabMortgageOtherValueValidation: "Enter the amount either of you owe on your other mortgages",

        liabOverdraftExists: null,
        liabOverdraftExistsValidation: "Select whether or not either of you have any outstanding bank overdrafts",

        liabOverdraftValue: null,
        liabOverdraftValueValidation: "Enter the amount either of you owe on your overdrafts",

        liabCreditCardExists: null,
        liabCreditCardExistsValidation: "Select whether or not either of you have any credit card debt",

        liabCreditCardValue: null,
        liabCreditCardValueValidation: "Enter the amount either of you owe on your credit cards",

        liabLoanExists: null,
        liabLoanExistsValidation: "Select whether or not either of you have any outstanding loans",

        liabLoanValue: null,
        liabLoanValueValidation: "Enter the amount either of you owe for your loans",

        liabOtherDebtExists: null,
        liabOtherDebtExistsValidation: "Select whether or not either of you have any other debts",

        liabOtherDebtValue: null,
        liabOtherDebtValueValidation: "Enter the amount either of you owe for your other debts",

        giftExists: null,
        giftExistsValidation: "Select whether or not you have given away any money or things worth over £3,000 in the last 7 years",

        personAValue0Validation: "Enter amount",
        personAValue1Validation: "Enter amount",
        personAValue2Validation: "Enter amount",
        personAValue3Validation: "Enter amount",
        personAValue4Validation: "Enter amount",
        personAValue5Validation: "Enter amount",
        personAValue6Validation: "Enter amount",
        personAValue7Validation: "Enter amount",
        personBValue0Validation: "Enter amount",
        personBValue1Validation: "Enter amount",
        personBValue2Validation: "Enter amount",
        personBValue3Validation: "Enter amount",
        personBValue4Validation: "Enter amount",
        personBValue5Validation: "Enter amount",
        personBValue6Validation: "Enter amount",
        personBValue7Validation: "Enter amount",


        gifts: {
            personA: {
                year0: null,
                year1: null,
                year2: null,
                year3: null,
                year4: null,
                year5: null,
                year6: null,
                year7: null,
            },
            personB: {
                year0: null,
                year1: null,
                year2: null,
                year3: null,
                year4: null,
                year5: null,
                year6: null,
                year7: null,
            }
        },

        leaveMainHomeToDecendant: null,
        leaveMainHomeToDecendantValidation: "Select whether or not you will leave your main home to a direct descendant ",

        leaveMainHomeToDecendantPartner: null,
        leaveMainHomeToDecendantPartnerValidation: "Select whether or not you will leave your main home to the married partner of a direct descendant ",

        assetsTotal: 0,
        liabTotal: 0,
        netEstateValue: 0,
        giftsAllowance: 3000,
        giftsTotalPersonA: 0,
        giftsExcessPersonA: 0,
        giftsTotalPersonB: 0,
        giftsExcessPersonB: 0,
        giftsTotal: 0,
        giftsExcessTotal: 0,
        nilRateBand: 0,
        residualNilRateBandAllowance: 0,
        homeValueThreshold: 350000,
        personalNilRateBandThreshold: 325000,
        nilRateBandThreshold: 650000,
        netEstateValueThreshold: 2000000,
        netEstateValueForIHT: 0,
        ihtTotal: 0,

        giftLabelYears: 8,
        giftLabels: {},

        scrollToValidation: false,
    },
    methods: {
        submitPage: function () {
            this.showFormValidation = true;
            this.scrollToValidation = true;
            this.checkForm();

            if (Object.keys(this.errors).length > 0) {
                console.log(this.errors)
                return;
            }
            this.showFormValidation = false;
            var goToResultsPage = false;

            if (this.currentPage == 4) {
                this.assetsTotal = this.calculateAssets(this.assetsHomeValue, this.assetsHomeOtherValue, this.assetsInvestmentValue, this.assetsLifeInsuranceValue, this.assetsPossessionValue, this.assetsForeignValue, this.assetFurtherInheritanceValue, this.assetsOtherValue);
                this.liabTotal = this.calculateLiabilities(this.liabMortageValue, this.liabMortgageOtherValue, this.liabOverdraftValue, this.liabCreditCardValue, this.liabLoanValue, this.liabOtherDebtValue);
                this.netEstateValue = this.calculateNetEstate(this.assetsTotal, this.liabTotal);    
                if (this.netEstateValue > this.netEstateValueThreshold) {
                    goToResultsPage = true;
                }
            } 
            if (this.currentPage == 7 || (this.currentPage == 6 && this.leaveMainHomeToDecendant == '1')) {
                // Calculation
                this.assetsTotal = this.calculateAssets(this.assetsHomeValue, this.assetsHomeOtherValue, this.assetsInvestmentValue, this.assetsLifeInsuranceValue, this.assetsPossessionValue, this.assetsForeignValue, this.assetFurtherInheritanceValue, this.assetsOtherValue);
                this.liabTotal = this.calculateLiabilities(this.liabMortageValue, this.liabMortgageOtherValue, this.liabOverdraftValue, this.liabCreditCardValue, this.liabLoanValue, this.liabOtherDebtValue);
                this.netEstateValue = this.calculateNetEstate(this.assetsTotal, this.liabTotal);
                var giftsCalc = this.calculateGifts()
                this.giftsTotal = giftsCalc.total;
                this.giftsTotalPersonA = giftsCalc.giftsTotalPersonA;
                this.giftsTotalPersonB = giftsCalc.giftsTotalPersonB;
                this.giftsExcessPersonA = giftsCalc.giftsExcessPersonA;
                this.giftsExcessPersonB = giftsCalc.giftsExcessPersonB;
                this.giftsExcessTotal = giftsCalc.giftsExcessTotal;
                this.nilRateBand = this.calculateNRB(this.giftsTotal);
                this.residualNilRateBandAllowance = this.calculateRNRB();
                this.netEstateValueForIHT = this.calculateNetEstateValueForIHT();
                this.ihtTotal = this.calculateIHT();

                goToResultsPage = true;
            }

            // alternate nav pattern for page 4
            if (goToResultsPage) {
                this.currentPage = 8;
            } else {
                this.currentPage = this.currentPage + 1;
            }
            this.scrollToTop();
        },

        checkForm: function () {
            //console.log('checking form');
            this.errors = {};
            var inputs = document.getElementsByTagName('input');
            for (var i = 0; i < inputs.length; i++) {
                var customValidation = [inputs[i].name] + "Validation";
                if (!inputs[i].validity.valid) {
                    if (this[customValidation]) {
                        this.errors[inputs[i].name] = this[customValidation];
                    } else {
                        this.errors[inputs[i].name] = inputs[i].validationMessage;
                    }
                }
                if (inputs[i].validity.valid && inputs[i].type === 'text') {
                    // validation for date inputs that appear as text input in IE
                    for (var j = inputs[i].attributes.length - 1; j >= 0; j--) {
                        if (inputs[i].attributes[j].name === 'type' && inputs[i].attributes[j].value === 'date') {
                            var data = inputs[i].value.split("/");
                            if (!data[2] || data[2].length !== 4 || isNaN(Date.parse(data[2] + "-" + data[1] + "-" + data[0]))) {
                                this.errors[inputs[i].name] = "Invalid format. Please enter a date in the format dd/mm/yyyy";
                            }
                        }
                    }
                }
                if (inputs[i].validity.stepMismatch == true || inputs[i].validity.rangeUnderflow == true) {
                    if (this[customValidation]) {
                        this.errors[inputs[i].name] = this[customValidation] + " in pounds"
                    }
                }
            }
        },

        calculateAssets: function (home, otherHome, investment, life, possessions, foreign, inheritance, otherAsset) {

            home = Number(home) || 0;
            otherHome = this.assetsHomeOtherExists == '1' ? Number(otherHome) || 0 : 0;
            investment = Number(investment) || 0;
            life = this.assetsLifeInsuranceExists == '1' ? Number(life) || 0 : 0;
            possessions = Number(possessions) || 0;
            foreign = this.assetsForeignExists == '1' ? Number(foreign) || 0 : 0;
            inheritance = this.assetFurtherInheritanceExists == '1' ? Number(inheritance) || 0 : 0;
            otherAsset = this.assetsOtherExists == '1' ? Number(otherAsset) || 0 : 0;

            var total = home + otherHome + investment + life + possessions + foreign + inheritance + otherAsset;
            return Math.round(total);
        },

        calculateLiabilities: function (mortgage, mortgageOther, overdraft, creditCard, loan, otherDebt) {

            mortgage = this.liabMortgageExists == '1' ? Number(mortgage) || 0 : 0;
            mortgageOther = this.liabMortgageOtherExists == '1' ? Number(mortgageOther) || 0 : 0;
            overdraft = this.liabOverdraftExists == '1' ? Number(overdraft) || 0 : 0;
            creditCard = this.liabCreditCardExists == '1' ? Number(creditCard) || 0 : 0;
            loan = this.liabLoanExists == '1' ? Number(loan) || 0 : 0;
            otherDebt = this.liabOtherDebtExists == '1' ? Number(otherDebt) || 0 : 0;
            var total = mortgage + overdraft + creditCard + loan + otherDebt;
            return Math.round(total);
        },

        calculateNetEstate: function (assetsTotal, liabilitiesTotal) {
            return Math.round(assetsTotal - liabilitiesTotal);
        },

        calculateGifts: function () {
            var totalGifts = 0;
            var giftsTotalPersonA = 0;
            var giftsTotalPersonB = 0;
            var giftsExcessPersonA = 0
            var giftsExcessPersonB = 0
            var giftsExcessTotal = 0
            // Calculate Taxable Gifts
            if (this.giftExists == '1') {
                var giftsKeys = Object.keys(this.gifts);
                for (var a = 0; a < giftsKeys.length; a++) {
                    var personObject = giftsKeys[a]
                    var person = Object.keys(this.gifts[personObject]);
                    for (var i = 0; i < (person.length - 1); i++) {
                        var taxableGiftAmount = 0;
                        var key = person[i];
                        if (this.gifts[personObject][key] > this.giftsAllowance) {
                            taxableGiftAmount = this.gifts[personObject][key] - this.giftsAllowance
                            // check if we have remaining from last year - only where we have a last year
                            if ((i + 1) < person.length) {
                                var lastYearsTotal = this.gifts[personObject][person[i + 1]] == null ? 0 : this.gifts[personObject][person[i + 1]];
                                var additionalAllowance = this.giftsAllowance - lastYearsTotal;
                                if (additionalAllowance > 0) {
                                    if (this.gifts[personObject][key] > (additionalAllowance + this.giftsAllowance)) {
                                        taxableGiftAmount = this.gifts[personObject][key] - (additionalAllowance + this.giftsAllowance)
                                    } else {
                                        taxableGiftAmount = 0;
                                    }
                                }
                            }
                        }
                        if (giftsKeys[a] == 'personA') {
                            giftsTotalPersonA += taxableGiftAmount;
                        } else if (giftsKeys[a] == 'personB') {
                            giftsTotalPersonB += taxableGiftAmount;
                        }
                        totalGifts += taxableGiftAmount;
                    }
                }
            }
            // Calculate where Exceeded individual allowance
            giftsExcessPersonA = this.calculateExcessGifts(giftsTotalPersonA);
            giftsExcessPersonB = this.calculateExcessGifts(giftsTotalPersonB);
            giftsExcessTotal = giftsExcessPersonA + giftsExcessPersonB;

            totalGifts = Math.round(totalGifts);
            return {
                total: totalGifts,
                giftsTotalPersonA: giftsTotalPersonA,
                giftsTotalPersonB: giftsTotalPersonB,
                giftsExcessPersonA: giftsExcessPersonA,
                giftsExcessPersonB: giftsExcessPersonB,
                giftsExcessTotal: giftsExcessTotal
            }
        },

        calculateExcessGifts: function (giftsTotalPerson) {
            var total = 0
            var excess = giftsTotalPerson - this.personalNilRateBandThreshold;
            if (excess > 0) {
                total = (excess / 100) * 40;
            }
            return Math.round(total);
        },

        calculateNRB: function (giftsTotal) {
            total = this.nilRateBandThreshold - giftsTotal;
            if (total < 0) {
                total = 0
            }
            return Math.round(total);
        },

        calculateRNRB: function () {
            var total = 0;
            if (this.leaveMainHomeToDecendant == '1' || this.leaveMainHomeToDecendantPartner == '1') {
                var homeValue = Number(this.assetsHomeValue) || 0;
                var mortage = this.liabMortgageExists != '3' ? Number(this.liabMortageValue) || 0 : 0;
                total = (homeValue - mortage) > 0 ? homeValue - mortage : 0;
                if (total >= this.homeValueThreshold) {
                    total = this.homeValueThreshold;
                }
            }
            return Math.round(total);
        },

        calculateNetEstateValueForIHT: function () {
            var total = this.netEstateValue - (this.nilRateBand + this.residualNilRateBandAllowance);
            if (total > 0)
                return Math.round(total);
            return 0;
        },

        calculateIHT: function () {
            var ihtTotal = this.netEstateValue - (this.nilRateBand + this.residualNilRateBandAllowance);
            if (ihtTotal > 0)
                return Math.round((ihtTotal / 100) * 40);
            return 0;
        },

        backPage: function (currentPage) {
            if (currentPage == 8 && this.netEstateValue > this.netEstateValueThreshold) {
                this.currentPage = 4;
            }
            this.currentPage = this.currentPage - 1;
            this.showFormValidation = false;
        },

        scrollToError: function () {
            // Scroll to first error
            if (Object.keys(this.errors).length > 0) {

                var formElem = document.getElementById('ihtCalcApp');
                var items = formElem.getElementsByClassName('coop-c-form-error__text');
                if (items.length > 0) {
                    window.scrollTo({
                        top: items[0].offsetTop - 10,
                        behavior: 'smooth'
                    });
                    //scroll parent if in iframe
                    if (window.self !== window.top) {
                        window.parent.postMessage('Scroll', '*');
                    }
                }
                return;
            };
        },

        scrollToTop: function () {
            window.scrollTo({
                top: 10,
                behavior: 'smooth'
            });
            //scroll parent if in iframe
            if (window.self !== window.top) {
                window.parent.postMessage('Scroll', '*');
            }
        },
    },
    updated: function () {
        var v = this;
        var inputs = document.getElementsByTagName('input');

        for (var i = 0; i < inputs.length; i++) {
            if (inputs[i].getAttribute('listener') !== 'true') {
                inputs[i].addEventListener('change', v.checkForm);
                inputs[i].setAttribute('listener', 'true');
            }
        }

        // Could use custom events to trigger this instead but it needs to be componentised first.
        if (this.scrollToValidation) {
            this.scrollToError();
            this.scrollToValidation = false;
        }
    },
    mounted: function () {
        var today = new Date();
        var taxYearEnd = today.getFullYear();
        var taxYearStart = taxYearEnd - 1;
        var month = today.getMonth() + 1;
        var day = today.getDate();
        if (month >= 4 && day >= 6) {
            taxYearStart++
            taxYearEnd++
        };
        //console.log('taxYearStart ' + taxYearStart + ' taxYearEnd ' + taxYearEnd);
        var getTaxYear = function (taxYearStart, taxYearEnd) {
            return taxYearStart + '/' + taxYearEnd;
        }

        for (var i = 0; i < this.giftLabelYears; i++) {
            this.giftLabels[i] = getTaxYear(taxYearStart--, taxYearEnd--);
        }

        var v = this;
        var inputs = document.getElementsByTagName('input');

        for (var i = 0; i < inputs.length; i++) {
            if (inputs[i].getAttribute('listener') !== 'true') {
                inputs[i].addEventListener('change', v.checkForm);
                inputs[i].setAttribute('listener', 'true');
            }
        }
    }
});

