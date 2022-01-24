const objPlanPricesMonthly = {
    basic: '$19.99',
    professional: '$24.99 ',
    master: '$39.99',
}

const objPlanPricesAnnually = {
    basic: '$199.99',
    professional: '$249.99',
    master: '$399.99',
}

const sliderTimePlanSelector = document.querySelector('input[type=checkbox]')

sliderTimePlanSelector.addEventListener('click', () => {
    const typePlan = sliderTimePlanSelector.checked ? objPlanPricesMonthly : objPlanPricesAnnually;
    changePrices(typePlan);
})

function changePrices(typePlan){
    const allPlanPrices = document.querySelectorAll('.cardPlan h1')

    let allPlanCategories = [...Object.keys(typePlan)];
    
    allPlanPrices.forEach((price, i)=> {
        price.textContent= typePlan[allPlanCategories[i]]
    })
}

let cardActive = document.querySelector('.cardPlan.active')
console.log(cardActive);

const cards = document.querySelectorAll('.cardPlan')
console.log(cards);

cards.forEach((card, i) => {
    card.addEventListener('click', () => {
        /* card.classList.toggle('active') */
        cardActive.classList.toggle('active')
        cardActive= card
        cardActive.classList.toggle('active')
        
    })
})